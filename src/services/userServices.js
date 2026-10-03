const userRepository = require('./repositories/UserRepository');

exports.userEkle = async (data) => {

    return await userRepository.create(data);
};

exports.userListele = async () => {
    return await userRepository.FindAll();
};

exports.userGetir = async (id) => {
    const userID = Number.parseInt(id, 10);
    
    if (!Number.isInteger(userID)) {
        throw new Error("Geçersiz user ID."); 
    }

    const user = await userRepository.findById(userID);
    
    if (!user) {
        throw new Error("Kullanıcı bulunamadı."); 
    }
    
    return user;
}

exports.userGuncelle = async (id,data) => {
    const userID = Number.parseInt(id, 10);

    if(!Number.isInteger(userID)){
        throw new Error("Geçersiz user ID.")
    }

    return await userRepository.update(userID, data);
}

exports.userSil = async (id) => {
    const userID = Number.parseInt(id, 10);

    if (!Number.isInteger(userID)) {
        throw new Error("Geçersiz user ID.");
    }

    return await userRepository.delet(userID);
}

exports.userBul = async (query) => {
   
    const filters = {
       email : query.email,
       name : query.name
    };
    
    return await userRepository.findByFilters(filters);
};