const request = require('supertest');
const app = require('../../server');

describe('Kimlik Doğrulama (Auth) testleri', ()=>{
    it("gecersiz bir e-posta hatası girildiginde Zod bizi 400 hatası ile reddetmeli",async() =>{

        const response = await request(app)
        .post('/auth/register')
        .send({
            isim : "furkan",
            email: "hatali",
            sifre:"12341"
        })
    expect(response.status).toBe(400);

    expect(response.body.success).toBe(false);
    })
        it('Şifre 6 karakterden kısaysa sistem kabul etmemeli', async () => {
        const response = await request(app)
            .post('/auth/register')
            .send({
                isim: "Furkan",
                email: "furkan@test.com",
                sifre: "123" 
            });

        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });

})