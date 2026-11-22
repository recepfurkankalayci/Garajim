const{z}= require("zod");

exports.careEkleSchema = z.object({
    header: z.string().min(3, "Bakım başlığı en az 3 karakter olmalıdır."),
    hkm: z.number().int().nonnegative("Bakım kilometresi eksi bir değer olamaz."),
    cost: z.number().int().nonnegative("Maliyet eksi bir değer olamaz. (Ücretsiz işlemse 0 girebilirsiniz)"),
    transaction_date: z.coerce.date({
    error: "Lütfen geçerli bir tarih formatı giriniz.",
  }),
    carID: z.number().int().positive("Geçerli bir araç ID'si belirtilmelidir.")
});

exports.careGuncelleSchema = exports.careEkleSchema.partial();

exports.careIdSchema = z.object({
  id: z.coerce.number().int().positive("Geçersiz bir bakım kaydı ID'si gönderildi.")
});

exports.careFiltreSchema = z.object({
    header: z.string().min(3, "Bakım başlığı en az 3 karakter olmalıdır.").optional(),
    hkm: z.coerce.number().int().nonnegative("Bakım kilometresi eksi bir değer olamaz.").optional(),
    cost: z.coerce.number().int().nonnegative("Maliyet eksi bir değer olamaz. (Ücretsiz işlemse 0 girebilirsiniz)").optional(),
    transaction_date: z.coerce.date({
        error: "Lütfen geçerli bir tarih formatı giriniz.",
    }).optional(),
    carID: z.coerce.number().int().positive("Geçerli bir araç ID'si belirtilmelidir.").optional()
});