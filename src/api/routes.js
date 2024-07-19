const router = require("express").Router();

const mediaRoute = require("./media/media.routes");
const productRoute = require("./product/product.routes");

router.get("/", (req, res) => {
  return res.status(200).json({ message: "Server is up and running" });
});

router.use("/media", mediaRoute);
router.use("/product", productRoute);

module.exports = router;
