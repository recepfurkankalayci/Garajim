const request = require('supertest');
const app = require('../../server');
const prisma = require('../../database');

describe('bakım entegrasyon testi', () => {
  let token;
  let testUserId;
  let createdCarId;
  let createdCareId;

  beforeAll(async () => {
    const testEmail = `test_care_${Date.now()}@test.com`;

    const registerRes = await request(app)
      .post('/auth/register')
      .send({
        name: 'Bakım Test Kullanıcısı',
        email: testEmail,
        password: 'Test123!',
        telephone: '5550505050',
      });
    expect(registerRes.status).toBe(201);

    const loginRes = await request(app)
      .post('/auth/login')
      .send({ email: testEmail, password: 'Test123!' });
    expect(loginRes.status).toBe(200);
    token = loginRes.body.token;

    const user = await prisma.user.findUnique({ where: { email: testEmail } });
    expect(user).not.toBeNull();
    testUserId = user.id;

    const car = await prisma.cars.create({
      data: {
        brand: 'Fiat',
        model: 'Linea',
        license_plate: `CARE${Date.now().toString().slice(-6)}`,
        year: 2012,
        gkm: 120000,
        userID: testUserId,
      },
    });
    createdCarId = car.id;
  });

  it('token olmadan bakım eklenmemeli', async () => {
    const res = await request(app)
      .post('/bakimlar/olustur')
      .send({
        header: 'Yağ değişimi',
        hkm: 120000,
        cost: 1000,
        transaction_date: '2026-11-21',
        carID: createdCarId,
      });

    expect(res.status).toBe(401);
  });

  it('geçersiz bakım verileri Zod 400 hatası dönmeli', async () => {
    const res = await request(app)
      .post('/bakimlar/olustur')
      .set('Authorization', `Bearer ${token}`)
      .send({
        header: 'ya',
        hkm: -1,
        cost: -5,
        transaction_date: 'gecersiz-tarih',
        bakimTuru: 'MOTOR_YAGI',
        carID: 0,
      });

    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
  });

  it('geçerli veriyle bakım başarıyla eklenmeli', async () => {
    const res = await request(app)
      .post('/bakimlar/olustur')
      .set('Authorization', `Bearer ${token}`)
      .send({
        header: 'Yağ değişimi',
        hkm: 120000,
        cost: 1000,
        transaction_date: '2026-11-21',
        bakimTuru: 'MOTOR_YAGI',
        carID: createdCarId,
      });
    expect(res.status).toBe(200);
    expect(res.body.yeniBakim).toHaveProperty('id');
    createdCareId = res.body.yeniBakim.id;
  });

  it('eklenen bakım ID ile getirilmeli', async () => {
    const res = await request(app)
      .get(`/bakimlar/${createdCareId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.bakim.id).toBe(createdCareId);
  });

  it('olmayan bakım ID istendiğinde 404 dönmeli', async () => {
    const res = await request(app)
      .get('/bakimlar/999999')
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(404);
  });

  it('eklenen bakım silinebilmeli', async () => {
    const res = await request(app)
      .delete(`/bakimlar/${createdCareId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
  });

  afterAll(async () => {
    if (testUserId) {
      await prisma.care.deleteMany({
        where: { car: { userID: testUserId } },
      });
      await prisma.cars.deleteMany({ where: { userID: testUserId } });
      await prisma.user.deleteMany({ where: { id: testUserId } });
    }
  });
});
