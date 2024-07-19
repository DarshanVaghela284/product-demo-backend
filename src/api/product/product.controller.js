const productService = require("./product.service");

module.exports.addProduct = async (req, res, next) => {
  try {
    const body = req.body;
    const result = await productService.addProduct(body);

    return res.status(result.code).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports.getProducts = async (req, res, next) => {
  try {
    const query = req.query;
    const result = await productService.getProducts(query);
    return res.status(result.code).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports.editProduct = async (req, res, next) => {
  try {
    const productId = req.params.product_id;
    const body = req.body;
    const result = await productService.editProduct(productId, body);
    return res.status(result.code).json(result);
  } catch (error) {
    next(error);
  }
};
