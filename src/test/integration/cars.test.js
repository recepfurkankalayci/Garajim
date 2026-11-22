const request = require('supertest');
const app = require('../../server');
const prisma = require('../../database');

describe('araç entegrasyon testi',()=>{
    let token;
    let testUserId;
    let createdCarId;

    beforeAll(async()=>{
      const testEmail = `test_car_${Date.now()}@test.com`;

    const registerRes = await request(app)
      .post('/auth/register')
      .send({
        name: 'Test kullanici',
        email: testEmail,
        password: 'Test123!',
        telephone: '5550404040',
      })
    expect(registerRes.status).toBe(201);

      const loginRes = await request(app)
        .post('/auth/login')
        .send({
          email:testEmail,
          password:'Test123!'
        })
      expect(loginRes.status).toBe(200);
      token = loginRes.body.token;

      const user = await prisma.user.findUnique({where:{email:testEmail}});
      expect(user).not.toBeNull();
      testUserId = user.id;
    });
  
    it('token olmadan araç eklemey calışıldıgında 401 dönmeli', async()=>{
      const res = await request(app)
      .post('/araclar/ekle')
      .send({
        brand:"fiat",
        model: 'Linea',
        license_plate: '06TEST01',
        year: 2010,
        gkm: 0
      });
      expect(res.status).toBe(401);
    })

    it('Geçersiz veri gönderildiğinde Zod 400 hatası dönmeli', async () => {
    const res = await request(app)
      .post('/araclar/ekle')
      .set('Authorization', `Bearer ${token}`)
      .send({
        brand: '',
        year: 'ikibinon',
        gkm: 0
      });

    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
  });


  it('Geçerli token ve verilerle araç başarıyla eklenmeli', async () => {
    const res = await request(app)
      .post('/araclar/ekle')
      .set('Authorization', `Bearer ${token}`)
      .send({
        brand: 'Fiat',
        model: 'Linea',
        license_plate: `06TST${Math.floor(Math.random() * 900 + 100)}`,
        year: 2010,
        gkm: 0
      });

    expect(res.status).toBe(201);
    expect(res.body.arac).toHaveProperty('id');
    
    createdCarId = res.body.arac.id; 
  });

  it('Eklenen araç ID ile başarıyla getirilmeli', async () => {
    const res = await request(app)
      .get(`/araclar/${createdCarId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.arananArac.id).toBe(createdCarId);
  });

  it('Veritabanında olmayan bir araç ID istendiğinde 404 dönmeli', async () => {
    const res = await request(app)
      .get('/araclar/999999')
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(404);
  });

  it('Kullanıcı kendi eklediği aracı silebilmeli', async () => {
    const res = await request(app)
      .delete(`/araclar/${createdCarId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
  });

  afterAll(async () => {
    if (testUserId) {
      await prisma.cars.deleteMany({ where: { userID: testUserId } });
      await prisma.user.delete({ where: { id: testUserId } });
    }
    await prisma.$disconnect();
  });
});


    
