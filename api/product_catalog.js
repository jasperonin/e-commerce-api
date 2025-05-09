import { models } from "../models/index.js";

const { Product } = models;

// retrieve all products
export const getProducts = async (_req, res) => {
  try {
    const products = await Product.findAll({
      attributes: ["id", "name", "description", "price"],
    });

    if (!products) {
      res.status(400).json({ message: `Unable to find prodcts!` });
    }
    res
      .status(200)
      .json({ message: `Products successfully retrieved!`, products });
  } catch (err) {
    res.status(500).json({ message: `Something went wrong ${err}` });
  }
};

// retrieve product by Id
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id, {
      attributes: ["id", "name", "description", "price"],
    });
    if (!product) {
      res.status(400).json({ message: `Unable to find product 😭` });
    }

    res
      .status(200)
      .json({ message: `Successfully retrieved product`, product });
  } catch (err) {
    res.status(500).json({ message: `Something went wrong ${err}` });
  }
};

// delete product by Id
export const deleteProductById = async (req, res) => {
  try {
    // find all product where id = req.paramaters
    const product = await Product.findOne({ where: { id: req.params.id } });

    // check if product is found or not
    if (!product) {
      res.status(404).json({ message: `Product not found!` });
    } else {
      await product.destroy();
      return res.status(200).json({ message: `Product Successfully Deleted!` });
    }
  } catch (err) {
    return res.status(500).json({ message: `Something went wrong ${err}` });
  }
};

// create new product
export const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      stock,
      image_url,
      category_id,
      CategoryId,
    } = req.body;

    const product = await Product.create({
      name,
      description,
      price,
      stock,
      image_url,
      category_id,
      CategoryId,
    });

    return res.status(201).json({ message: `Product successfully created!`, product });
  } catch (err) {
    return res.status(500).json({ message: `Something went wrong ${err}` });
  }
};

// update product by Id
export const updateProduct = async (req, res) => {
  const { name, description, price, stock, image_url } = req.body;
  try {
    const product = await Product.findOne({
      where: { id: req.params.id },
    });

    if (!product) {
      res.status(404).json({ message: `Unable to find product!` });
    } else {
      await product.update({
        name,
        description,
        price,
        stock,
        image_url,
      });
    }
    return res.status(200).json({ message: `Successfully Updated!`, product });
  } catch (err) {
    res.status(500).json({ message: `Something went wrong ${err.message}` });
  }
};
