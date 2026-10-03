const prisma = require('../database');

exports.creat = async(data)=>{
   return await prisma.user.create({data});
};

exports.findAll = async() =>{
    return await prisma.user.findMany();
};

exports.delete = async(id) =>{
    return await prisma.user.delete({
        where : {id}
    });
};

exports.update = async(id,data) =>{
    return await prisma.user.update({
        where : {id},
        data
    });
}

exports.findById = async (id) => {
    return await prisma.user.findUnique({ 
        where: { id } 
    });
};

exports.findByFilters = async (filters) => {
    return await prisma.user.findMany({ 
        where: filters 
    });
}