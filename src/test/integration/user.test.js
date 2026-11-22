const request = require('supertest');
const app = require('../../server');
const prisma = require('../../database');

describe('kullanıcı entegrasyon testi', () => {
  let adminToken;
  let adminId;
  let createdUserId;

  beforeAll(async () => {
    const adminEmail = `test_admin_${Date.now()}@test.com`;

    const registerRes = await request(app)
      .post('/auth/register')
      .send({
        name: 'Test Admin',
        email: adminEmail,
        password: 'Test123!',
        telephone: '5550606060',
      });
    expect(registerRes.status).toBe(201);

    const admin = await prisma.user.findUnique({ where: { email: adminEmail } });
    expect(admin).not.toBeNull();
    adminId = admin.id;
    await prisma.user.update({
      where: { id: adminId },
      data: { role: 'ADMIN' },
    });

    const loginRes = await request(app)
      .post('/auth/login')
      .send({ email: adminEmail, password: 'Test123!' });
    expect(loginRes.status).toBe(200);
    adminToken = loginRes.body.token;
  });

  it('admin kullanıcı oluşturabilmeli', async () => {
    const res = await request(app)
      .post('/kullanicilar/olustur')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        name: 'Yeni Kullanıcı',
        email: `test_user_${Date.now()}@test.com`,
        password: 'Created123!',
        telephone: '5550707070',
      });

    expect(res.status).toBe(201);
    expect(res.body.yeniKullanici).toHaveProperty('id');
    createdUserId = res.body.yeniKullanici.id;
  });

  it('admin kullanıcı listesini görebilmeli', async () => {
    const res = await request(app)
      .get('/kullanicilar/listele')
      .set('Authorization', `Bearer ${adminToken}`);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.kullanicilar)).toBe(true);
  });

  it('admin kullanıcıyı ID ile getirebilmeli', async () => {
    const res = await request(app)
      .get(`/kullanicilar/${createdUserId}`)
      .set('Authorization', `Bearer ${adminToken}`);

    expect(res.status).toBe(200);
    expect(res.body.kullanici.id).toBe(createdUserId);
  });

  it('admin kullanıcı bilgisini güncelleyebilmeli', async () => {
    const res = await request(app)
      .put(`/kullanicilar/${createdUserId}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ name: 'Güncel Kullanıcı', telephone: '5550808080' });

    expect(res.status).toBe(200);
    expect(res.body.guncellenenKullanici.name).toBe('Güncel Kullanıcı');
  });

  it('admin kullanıcıyı silebilmeli', async () => {
    const res = await request(app)
      .delete(`/kullanicilar/${createdUserId}`)
      .set('Authorization', `Bearer ${adminToken}`);

    expect(res.status).toBe(200);
  });

  afterAll(async () => {
    if (createdUserId) {
      await prisma.user.deleteMany({ where: { id: createdUserId } });
    }
    if (adminId) {
      await prisma.user.deleteMany({ where: { id: adminId } });
    }
  });
});
