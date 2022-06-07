module.exports = (app) => {
  const products = require("../controllers/product.controller");
  let router = require("express").Router();

  //Create new Product
  router.post("/", products.create);

  //Retrieve all Products
  router.get("/", products.findAll);

  //Retrieve all available Products
  router.get("/available", products.finAllAvailable);

  //Retrieve a single Product with id
  router.get("/:id", products.findOne);

  //Update a single Product with id
  router.put("/:id", products.update);

  //Delete a single Product with id
  router.delete("/:id", products.delete);

  //Delete all Products
  router.delete("/", products.delete);

  app.use("/api/products", router);
};
