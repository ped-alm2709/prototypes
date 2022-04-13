const model = require("../models/app.model");

const create = async (data) => {
  const existsEmail = await model.findOne({ email: data.email });
  if (existsEmail) {
    return false;
  }
  const newEmployee = {
    name: data.name,
    email: data.email,
    password: data.password,
    department: data.department,
    salary: data.salary,
    birth_date: data.birth_date,
  };
  const user = await model.create({
    ...newEmployee
  });
  return user;
}

const findOne = async (id) => {
  const user = await model.findById({ _id: id });
  return user;
}

const findMany = async () => {
  try {
    const users = await model.find({}).exec();
    return users;
  } catch (err) {
    console.log(err);
  }
}

const update = async (id, data) => {
  const updated = await model.updateOne(
    { _id: id },
    { ...data },
  );
  return updated;
}

const deleteOne = async (id) => {
  const user = await model.deleteOne({ _id: id });
  return user;
}

module.exports = {
  create,
  findOne,
  findMany,
  update,
  deleteOne,
}