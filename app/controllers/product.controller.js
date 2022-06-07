const db = require("../models");
const Product = db.products;
const Op = db.Sequelize.Op;

/**
 *
 * @param {name, description, available} req
 * @param {new product} res
 * @returns new products;
 */
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
    available: req.body.available ? req.body.available : false,
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

/**
 *
 * @param {name} req
 * @param {similar products} res
 * @returns similar products;
 */
exports.findAll = (req, res) => {
  const name = req.query.name;
  let condition = name ? { name: { [Op.iLike]: `%{name}` } } : null;

  /**
   * Retrieves all matching products
   */
  Product.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving products.",
      });
    });
};

/**
 *
 * @param {product id} req
 * @param {product wuth id} res
 * @returns product with id;
 */
exports.findOne = (req, res) => {
  const id = req.params.id;

  /**
   * Retrieve matching product
   */
  Product.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Product with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Product with id=" + id,
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;
  /**
   * Update specific product
   */
  Product.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Product was deleted successfully",
        });
      } else {
        res.send({
          message: `Cannot delete Product with id=${id}. Maybe Product was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error update Product with id=" + id,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  /**
   * Update specific product
   */
  Product.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Product was deleted successfully",
        });
      } else {
        res.send({
          message: `Cannot update Product with id=${id}. Maybe Product was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Product with id=" + id,
      });
    });
};

/**
 *
 * @param {} req
 * @param {*} res
 * @returns delete all products;
 */
exports.deleteAll = (req, res) => {
  Tutorial.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Products were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all tutorals.",
      });
    });
};

/**
 *
 * @param {} req
 * @param {*} res
 * @returns Find all available products;
 */
exports.finAllAvailable = (req, res) => {
  Product.findAll({ where: { available: true } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorals.",
      });
    });
};
