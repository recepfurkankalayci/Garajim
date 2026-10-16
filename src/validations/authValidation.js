const { z } = require('zod');

const registerSchema = z.object({
    isim : z.string().min(2,"İsim en az 2 karakter olmalıdır"),
    email: z.string().email("Lütfen Gecerli bir e-posta adresi giriniz"),
    sifre:z.string().min(8,"sifreniz en az 8 karakter uzunlugunda olmalıdır")
        .regex(/[a-z]/, "Şifreniz en az bir küçük harf içermelidir")
        .regex(/[A-Z]/, "Şifreniz en az bir büyük harf içermelidir")
        .regex(/[^a-zA-Z0-9]/, "Şifreniz en az bir özel karakter (örn: @, !, ?) içermelidir"),
    telefon: z.string().optional()
});

module.exports={registerSchema};
