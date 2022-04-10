const express = require("express");
router = express.Router();

const controller = require("../controllers/app.controller.js");

router.post("/", controller.create);

router.get("/", controller.findMany);

router.get("/:id", controller.findOne);

router.put("/:id", controller.update);

router.delete("/:id", controller.deleteEmployee);

module.exports = router;
