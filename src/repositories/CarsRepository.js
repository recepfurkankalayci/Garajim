const prisma = require('../database');

exports.creat = async(data)=>{
   return await prisma.cars.create({data});
};

exports.findAll = async() =>{
    return await prisma.cars.findMany();
};

exports.delete = async(id) =>{
    return await prisma.cars.delete({
        where : {id}
    });
};

exports.update = async(id,data) =>{
    return await prisma.cars.update({
        where : {id},
        data
    });
}

exports.findById = async (id) => {
    return await prisma.cars.findUnique({ 
        where: { id } 
    });
};

exports.findByFilters = async (filters) => {
    return await prisma.cars.findMany({ 
        where: filters 
    });
}