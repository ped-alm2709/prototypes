// mongo accumulator:
// https://stackoverflow.com/questions/54440636/the-field-name-must-be-an-accumulator-object

// Date sort:
// https://stackoverflow.com/questions/49324000/sort-data-from-mongodb-by-month-and-year

const model = require("../models/app.model");
const moment = require("moment");

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
    const users = await model.find({});
    const dateMoment = await users.map((data) => {
      const employee = {
        _id: data.id,
        name: data.name,
        email: data.email,
        department: data.department,
        salary: data.salary,
        birth_date: moment(data.birth_date).format('MM-DD-YYYY'),
      };
      return employee;
    });
    return dateMoment;
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

const salaryReport = async () => {
  const maxSalary = await model.find().sort({ salary: -1 }).limit(1);
  const minSalary = await model.find().sort({ salary: 1 }).limit(1);
  const salaryReport = {
    lowest: minSalary[0],
    highest: maxSalary[0],
    avarage: (minSalary[0].salary + maxSalary[0].salary) / 2
  }
  return salaryReport;
}

const ageReport = async () => {
  model.aggregate([
    {
      $match: { message: "Employees list" }
    },
    {
      $project: {
        younger: {
          $first: {
            $filter: {
              input: "$result",
              as: "r",
              cond: { $eq: [ "$$r.birth_date", { $max: "$result.birth_date" } ] }
            }
          }
        },
        older: {
          $first: {
            $filter: {
              input: "$result",
              as: "r",
              cond: { $eq: [ "$$r.birth_date", { $min: "$result.birth_date" } ] }
            }
          }
        },
        avg: {
          $subtract: [
            { $year: "$$NOW" },
            {
              $year: {
                $toDate: {
                  $avg: {
                    $map: {
                      input: "$result",
                      as: "r",
                      in: { $toLong: { $toDate: "$$r.birth_date" } }
                    }
                  }
                }
              }
            }
          ]
        }
      }
    }
  ]);
}

module.exports = {
  create,
  findOne,
  findMany,
  update,
  deleteOne,
  salaryReport,
  ageReport,
}