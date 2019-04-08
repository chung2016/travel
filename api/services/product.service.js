const db = require('../_helpers/db');
const Product = db.Product;

module.exports = {
  getAll,
  getById,
  create,
  update,
  delete: _delete
};

async function getAll() {
  return await Product.find();
}
async function getById(id) {
  return await Product.findById(id);
}
async function create(param) {
  const product = new Product(param);
  await product.save();
  return product;
}
async function update(id, param) {
  const product = await Product.findById(id);
  if (!product) throw 'Product not found';
  Object.assign(product, param);
  await product.save();
  return product;
}
async function _delete(id) {
  await Product.findOneAndDelete(id);
}
