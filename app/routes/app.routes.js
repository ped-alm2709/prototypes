const express = require("express");
router = express.Router();

const controller = require("../controllers/app.controller.js");

router.post("/employees", controller.create);

router.get("/employees", controller.findMany);

router.get("/employees/:id", controller.findOne);

router.put("/employees/:id", controller.update);

router.delete("/employees/:id", controller.deleteEmployee);

router.get("/reports/employees/salary", controller.salaryReport);

router.get("/reports/employees/age/", controller.ageReport);

module.exports = router;
