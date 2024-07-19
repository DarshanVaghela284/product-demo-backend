const productDao = require("./product.dao");
const { Format } = require("../../config/format");
const { bucket } = require("../../config/env-vars");

getImageUrl = (id, filename) => {
  return `https://${bucket}.s3.ap-south-1.amazonaws.com/${id}/${filename}`;
};

module.exports.addProduct = async (body) => {
  try {
    await productDao.addProduct(body);

    return Format.success(null, "Product Added Successfully!");
  } catch (error) {
    throw error;
  }
};

module.exports.getProducts = async (params) => {
  try {
    const { page = 1, page_size = 10 } = params;
    const { products, total } = await productDao.getProducts(params);

    const response = (products || []).map((data) => {
      return {
        ...data,
        image: getImageUrl(data.image_link._id, data.image_link.file_name),
      };
    });
    const totalPages = Math.ceil(Number(total / page_size));

    return Format.success(
      {
        products: response,
        current_page: Number(page),
        totalPages: totalPages,
        total: total,
      },
      "Success!"
    );
  } catch (error) {
    throw error;
  }
};

module.exports.editProduct = async (productId, body) => {
  try {
    const product = await productDao.editProduct(productId, body);

    return Format.success(product, "Product Edited Successfully!");
  } catch (error) {
    throw error;
  }
};
