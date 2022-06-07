const { sequelize, Sequelize } = require(".");

module.exports = (sequelize, Sequelize) => {
  const Product = sequelize.define("product", {
    name: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.STRING,
    },
    available: {
      type: Sequelize.BOOLEAN,
    },
  });
  return Product;
};
