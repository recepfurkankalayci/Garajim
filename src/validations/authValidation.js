const { z } = require('zod');

const registerSchema = z.object({
    isim : z.string().min(2,"İsim en az 2 karakter olmalıdır"),
    email: z.string().email("Lütfen Gecerli bir e-posta adresi giriniz"),
    sifre:z.string().min(8,"sifreniz en az 8 karakter uzunlugunda olmalıdır"),
    telefon: z.string().optinal()
});

module.exports={registerSchema};

