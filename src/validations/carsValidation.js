const {z} = require("zod");

exports.aracEkleSchema = z.object({
    year : z.number().min(1600).max(new Date().getFullYear()),
    brand: z.string().min(2, "Marka en az 2 karakter olmalıdır."),
    model: z.string().min(1, "Model boş bırakılamaz."),
    license_plate: z
    .string()
    .transform((val) => val.replace(/\s+/g, "").toUpperCase())
    .pipe(
    z
      .string()
      .min(5, "Lütfen geçerli bir plaka giriniz.")
      .max(15, "Plaka en fazla 15 karakter olabilir.")
      .regex(/^[A-Z0-9]+$/, "Plaka sadece harf ve rakamlardan oluşmalıdır.")
  ),
    gkm: z.number().nonnegative("Güncel kilometre eksi bir değer olamaz."),
    fuelType: z.enum(['BENZIN', 'DIZEL', 'BENZIN_LPG', 'HIBRIT', 'ELEKTRIK'])
});

exports.aracGuncelleSchema = z.object({
    year : z.number().min(1600).max(new Date().getFullYear()),
    brand: z.string().min(2, "Marka en az 2 karakter olmalıdır."),
    model: z.string().min(1, "Model boş bırakılamaz."),
    license_plate: z.string().min(5, "Lütfen geçerli bir plaka giriniz."),
    gkm: z.number().nonnegative("Güncel kilometre eksi bir değer olamaz."),
    fuelType: z.enum(['BENZIN', 'DIZEL', 'BENZIN_LPG', 'HIBRIT', 'ELEKTRIK']).optional()
});

exports.aracIdSchema = z.object({
  id: z.coerce.number().int().positive("Geçersiz bir araç ID'si gönderildi.")
});

exports.aracFiltreSchema = z.object({
    brand : z.string().min(2,"arama için en az ik karakter giriniz").optional(),
    model : z.string().optional(),
    year : z.coerce.number().int().min(1600).optional(),
    gkm: z.number().nonnegative("Güncel kilometre eksi bir değer olamaz."),
    fuelType: z.enum(['BENZIN', 'DIZEL', 'BENZIN_LPG', 'HIBRIT', 'ELEKTRIK']).optional()
});

