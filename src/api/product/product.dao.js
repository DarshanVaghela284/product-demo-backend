const Product = require("./product.model");

const buildAndCreateProductJSON = (props) => {
  const json = {};
  json.name = props.name;
  json.price = props.price;
  json.image_link = props.image_link;
  json.created_by = props.created_by;
  return json;
};

module.exports.addProduct = async (body) => {
  try {
    const product = new Product(buildAndCreateProductJSON(body));
    await product.save();
  } catch (error) {
    throw error;
  }
};

module.exports.getProducts = async (params) => {
  try {
    const {
      page = 1,
      page_size = 10,
      search = "",
      sort = "newest",
      startDate,
      endDate,
    } = params;
    let commonFilter = {};

    const searchPattern =
      search
        .split("")
        .map((char) => `.*${char}`)
        .join("") + ".*";

    if (search && search !== "") {
      commonFilter["$and"] = [
        {
          $or: [{ name: { $regex: searchPattern, $options: "i" } }],
        },
      ];
    }

    if (startDate || endDate) {
      commonFilter.created_at = {};
      if (startDate) {
        commonFilter.created_at.$gte = new Date(startDate);
      }
      if (endDate) {
        commonFilter.created_at.$lte = new Date(endDate);
      }
    }

    const sortOrder = sort === "newest" ? -1 : 1;

    const result = await Product.find(commonFilter)
      .sort({ created_at: sortOrder })
      .skip((Number(page) - 1) * Number(page_size))
      .limit(Number(page_size))
      .populate({
        path: "image_link",
        select: "_id file_name",
        options: { lean: true },
      })
      .lean({ virtuals: true })
      .exec();

    const total = await Product.countDocuments(commonFilter);
    return { products: result, total };
  } catch (error) {
    throw error;
  }
};

module.exports.editProduct = async (_id, body) => {
  try {
    const result = await Product.findByIdAndUpdate({ _id }, body, {
      new: true,
    });
    return result;
  } catch (error) {
    throw error;
  }
};
