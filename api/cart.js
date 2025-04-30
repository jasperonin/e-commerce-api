import { models } from "../models/index.js";

const { Cart } = models;

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
