const service = require("../services/app.service");

// Register and Save a new Employee
const create = async (req, res) => {
  const newEmployee = await service.create(req.body);
  if (!newEmployee) {
    return res.status(400).json({ message: "Employee already exists" });
  }
  return res.status(201).json({ message: "Employee registered!", result: newEmployee });
};

// Retrieve all employees from the database.
const findMany = async (_req, res) => {
  const allEmployees = await service.findMany();
  return res.status(200).json({ message: "Employees list", result: allEmployees });
};

// Find a single employee with the key "id"
const findOne = async (req, res) => {
  const oneEmployee = await service.findOne(req.params.id)
  return res.status(200).json({ message: "Employee found successfully!", result: oneEmployee });
}

// Update an employee identified by the id in the request
const update = async (req, res) => {
  const updateEmployee = await service.update(req.param.id, req.body);
  return res.status(201).json({ message: "Employee data updated!", result: updateEmployee });
};

// Delete a message with the specified id in the request
const deleteEmployee = async (req, res) => {
  await service.deleteOne(req.params.id);
  return res.status(200).json({ message: "Employee deleted successfully" });
};

module.exports = {
  create,
  findMany,
  findOne,
  update,
  deleteEmployee,
}