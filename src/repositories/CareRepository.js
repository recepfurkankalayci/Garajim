const prisma = require('../database');

exports.create = async (data) => {
  return await prisma.care.create({ data });
};

exports.findAll = async (userId) => {
  return await prisma.care.findMany({
    where: {
      car: { userID: userId },
    },
  });
};

exports.delete = async (id) => {
  return await prisma.care.delete({ where: { id } });
};

exports.update = async (id, data) => {
  return await prisma.care.update({
    where: { id },
    data,
  });
};

exports.findById = async (id) => {
  return await prisma.care.findUnique({
    where: { id },
    include: { car: true },
  });
};

exports.findByFilters = async (filters) => {
  return await prisma.care.findMany({ where: filters });
};