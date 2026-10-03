const prisma = require('../database');

exports.creat = async(data)=>{
   return await prisma.care.create({data});
};

exports.findAll = async() =>{
    return await prisma.care.findMany();
};

exports.delete = async(id) =>{
    return await prisma.care.delete({
        where : {id}
    });
};

exports.update = async(id,data) =>{
    return await prisma.care.update({
        where : {id},
        data
    });
}

exports.findById = async (id) => {
    return await prisma.care.findUnique({ 
        where: { id } 
    });
};

exports.findByFilters = async (filters) => {
    return await prisma.care.findMany({ 
        where: filters 
    });
}