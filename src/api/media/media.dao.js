const Media = require("./media.model");

const buildAndCreateMediaJSON = (props) => {
  const json = {};
  json.file_name = props.file_name;
  json.mimetype = props.mimetype;
  json.size = props.size;
  json.height = props.height;
  json.width = props.width;
  return json;
};

module.exports.addMedia = async (body) => {
  try {
    const media = new Media(buildAndCreateMediaJSON(body));
    const result = await media.save();
    const response = await Media.findOne({ _id: result._id });
    return response;
  } catch (error) {
    throw error;
  }
};
