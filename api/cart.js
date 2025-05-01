import { models } from "../models/index.js";

const { Cart, User, Product } = models;

export const getCart = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const currentPage = parseInt(req.query.page) || 1;
    const offset = (currentPage - 1) * limit;
    const cart = await Cart.findAndCountAll();
    const totalCart = Math.ceil(cart.count / limit);

    const cartPaginated = {
      cart,
      limit,
      currentPage,
      offset,
      totalCart,
    };
    return res
      .status(200)
      .json({ message: `Cart successfully retrieved!`, cartPaginated });
  } catch (err) {
    return res
      .status(500)
      .json({ error_message: `Something went wrong ${err.message}` });
  }
};

//create itemOnCart based on active user and product on DB
export const createItemOnCart = async (req, res) => {
  try {
    const { productId, userId, quantity } = req.body;
    const parsedUserId = parseInt(userId);
    const parsedProductId = parseInt(productId);
    const findUser = await User.findOne({
      where: { id: parsedUserId },
      attributes: ["id"],
    });
    const findProduct = await Product.findOne({
      where: { id: parsedProductId },
      attributes: ["id"],
    });

    if (!findUser || !findProduct) {
      return res
        .status(400)
        .json({ message: `Unable to find user and product!` });
    }

    await Cart.create({
      user_id: parsedUserId,
      product_id: parsedProductId,
      quantity: quantity,
    });

    return res.status(201).json({ message: `Item succesfully added to cart!` });
  } catch (err) {
    return res
      .status(500)
      .json({ error_message: `Something went wrong ${err.message}` });
  }
};

//update cart base cartId

export const updateOnCart = async (req, res) => {
  try {
    const { quantity } = req.body;
    const findCart = await Cart.findOne({
      where: { id: req.params.id },
      attributes: ["id", "product_id", "quantity", "updated_at"],
    });

    if (!findCart) {
      return res.status(400).json({ message: `Unable to locate Cart!` });
    } else {
      await findCart.update({
        quantity,
      });
      return res
        .status(200)
        .json({ message: `Updated cart successfully!`, findCart });
    }
  } catch (err) {
    return res
      .status(500)
      .json({ error_message: `Something went wrong ${err.message}` });
  }
};

//soft delete
export const deleteOncart = async (req, res) => {
  try {
    const findCart = await Cart.findOne({
      where: { id: req.params.id },
    });

    if (!findCart) {
      return res.status(400).json({ message: `Unable to find cart!` });
    } else {
      await findCart.destroy({
        where: { id: req.params.id },
      });
      return res.status(200).json({ message: `Deleted Successfully!` });
    }
  } catch (err) {
    return res
      .status(500)
      .json({ error_message: `Something went wrong ${err.message}` });
  }
};
