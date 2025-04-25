import { models } from "../models/index.js";

const { Order, User } = models;

// get product by Id with authentication

export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findOne({
      where: { id: req.params.id },
      attributes: ["id", "user_id", "total_amount", "status"],
    });

    if (!order) {
      return res.status(400).json({ message: `Order not found!` });
    }

    return res
      .status(200)
      .json({ message: `Order retrieved successfully!`, order });
  } catch (err) {
    return res
      .status(500)
      .json({ error_message: `Something went wrong ${err.message}` });
  }
};

// create order
export const createOrder = async (req, res) => {
  try {
    const { total_amount, status, userId } = req.body;
    const parsedUserId = parseInt(userId);
    // locate user using userId
    const findUser = await User.findOne({
      where: { id: parsedUserId },
      attributes: ["id"],
    });

    // return when none is retrieved
    if (!findUser) {
      return res.status(400).json({ message: "User not found!" });
    }

    // create orders
    await Order.create({
      user_id: parsedUserId,
      total_amount,
      status,
    });
    // if order is completed
    return res.status(201).json({ message: "Order created successfully!" });
  } catch (err) {
    return res
      .status(500)
      .json({ error_message: `Something went wrong: ${err.message}` });
  }
};

// retrieved orders with limit and pagination
export const getOrders = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const currentPage = parseInt(req.query.page) || 1;
    const offSet = (currentPage - 1) * limit;

    const order = await Order.findAll();
    const countTotalDoc = await Order.findAndCountAll();
    // return total number of rows in the order table
    const totalPages = Math.ceil(countTotalDoc.count / limit);

    // generate order with pagination
    const orderPaginated = {
      order,
      currentPage,
      totalPages,
      offSet,
      limit,
    };

    return res.status(200).json({
      message: `Successfully retrieved orders!`,
      orderPaginated,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ error_message: `Something went wrong ${err.message}` });
  }
};

export const updateProductById = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findOne({
      where: { id: req.params.id },
      attributes: ["id", "status"],
    });

    if (!order) {
      return res.status(400).json({ message: `Order not found!` });
    } else {
      await order.update({
        status,
      });
      return res.json({ message: `Status successfully updated!`, order });
    }
  } catch (err) {
    return res
      .status(500)
      .json({ error_message: `Something went wrong ${err.message}` });
  }
};
