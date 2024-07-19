const router = require("express").Router();

const mediaController = require("./media.controller");

router.post("/upload-image", mediaController.addMedia);

module.exports = router;
