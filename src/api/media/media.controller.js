const mediaService = require("./media.service");
const { validationResult } = require("express-validator");

module.exports.addMedia = async (req, res, next) => {
  try {
    const file = req.files.file_upload;
    const body = req.body;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const result = await mediaService.addMedia(file, body);
    return res.status(result.code).json(result);
  } catch (error) {
    next(error);
  }
};
