const router = require("express").Router();

const productController = require("./product.controller");

router.post("/add-product", productController.addProduct);

router.get("/get-products", productController.getProducts);

router.put("/edit-product/:product_id", productController.editProduct);

module.exports = router;
