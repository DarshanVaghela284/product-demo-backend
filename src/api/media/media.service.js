const { uploadFileHandler } = require("../../utils/aws");
const mediaDao = require("./media.dao");
const { Format } = require("../../config/format");
const sizeOf = require("buffer-image-size");

module.exports.addMedia = async (file, body) => {
  try {
    const uploadFilePayload = {
      name: file.name,
      data: file.data,
    };
    const dimensions = sizeOf(file.data);
    body.width = dimensions.width;
    body.height = dimensions.height;
    body.file_name = file.name;
    body.mimetype = file.mimetype;

    body.size = file.size;

    const saveMedia = await mediaDao.addMedia(body);
    if (saveMedia && saveMedia._id) {
      const directory = `${saveMedia._id}`;
      const response = await uploadFileHandler(directory, uploadFilePayload);
      if (response.status === 500) {
        return Format.response(response.status, response.message);
      }
    } else {
      return Format.response(500, "Error while uploading image!");
    }
    return Format.success({ _id: saveMedia._id }, "Image Uploaded!");
  } catch (error) {
    throw error;
  }
};
