const {z} = require("zod");

exports.profilGuncelleSchema = z.object({
  isim: z.string().min(2, "İsim en az 2 karakter olmalıdır").optional(),
  email : z.string().email("lütfen gecerli bir e-posta adresi giriniz").optional(),
  telefon: z.string().min(10, "Lütfen geçerli bir telefon numarası giriniz").optional()
});
exports.kullaniciIdSchema = z.object({
  id: z.coerce.number().int().positive("Geçersiz bir kullanıcı ID'si gönderildi.")
});