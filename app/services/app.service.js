const model = require("../models/app.model");

const create = async (data) => {
  const existsEmail = await model.findOne({ email: data.email });
  if (existsEmail) {
    return false;
  }
  const newEmployee = {
    name: data.name,
    email: data.email,
    department: data.department,
    salary: data.salary,
    birth_date: data.birth_date,
  };
  const user = await model.User.create({
    ...newEmployee
  });
  return user;
}

const findOne = async (id) => {
  const user = await model.User.findById({ id });
  return user;
}

const findMany = async () => {
  const users = await model.User.find({});
  return users;
}

const update = async (id, data) => {
  const updated = await model.User.updateOne(
    { id },
    { ...data },
  );
  return updated;
}

const deleteOne = async (id) => {
  const user = await model.User.deleteOne({ id });
  return user;
}

module.exports = {
  create,
  findOne,
  findMany,
  update,
  deleteOne,
}