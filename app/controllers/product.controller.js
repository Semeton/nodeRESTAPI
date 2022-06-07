const db = require("../models");
const Product = db.products;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  if (!req.body.description) {
    res.status(400).send({
      message: "Content cannot be empty!",
    });
    return;
  }
  /**
   * create a product by accepting the data from from the body of the request
   */
  const product = {
    name: req.body.name,
    description: req.body.description,
    published: req.body.available ? req.body.available : false,
  };
  /**
   * Save product in the database
   */
  Product.create(product)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occured while creating the Product",
      });
    });
};
exports.findAll = (req, res) => {};
exports.findOne = (req, res) => {};
exports.update = (req, res) => {};
exports.delete = (req, res) => {};
exports.deleteAll = (req, res) => {};
exports.finAllAvailable = (req, res) => {};
