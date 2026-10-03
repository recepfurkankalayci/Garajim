const carRepository = require('./repositories/userRepository');

exports.aracEkle = async (data) => {

    return await carRepository.create(data);
};

exports.aracListele = async () => {
    return await carRepository.FindAll();
};

exports.aracGetir = async (id) => {
    const aracID = Number.parseInt(id, 10);
    
    if (!Number.isInteger(aracID)) {
        throw new Error("Geçersiz araç ID."); 
    }

    const arac = await carRepository.findById(aracID);
    
    if (!arac) {
        throw new Error("Araç bulunamadı."); 
    }
    
    return arac;
}

exports.aracGuncelle = async (id,data) => {
    const aracID = Number.parseInt(id, 10);

    if(!Number.isInteger(aracID)){
        throw new Error("Geçersiz araç ID.")
    }

    return await carRepository.update(aracID, data);
}

exports.aracSil = async (id) => {
    const aracID = Number.parseInt(id, 10);

    if (!Number.isInteger(aracID)) {
        throw new Error("Geçersiz araç ID.");
    }

    return await carRepository.delet(aracID);
}

exports.aracBul = async (query) => {
   
    const filters = {
        brand: query.brand,
        model: query.model,
        license_plate: query.license_plate,
        year: query.year ? parseInt(query.year, 10) : undefined
    };
    
    return await carRepository.findByFilters(filters);
};