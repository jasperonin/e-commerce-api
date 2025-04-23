import { models } from "../models/index.js";
import bcrypt from "bcrypt";

const { User } = models;

export const createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password,salt);
    const user = await User.create({ name, email, password_hash, role});
    res.status(201).json({message: `User created Successfully!`,user: { name, email } });
  } catch (error) {
    res.status(500).json({ message: `Error in creating user ${error}` });
  }
};

export const getUser = async (_req, res) => {
  try {
    const users = await User.findAll({
      attributes: {
        exclude: ["password_hash", "role", "created_at", "updated_at"],
      },
    });
    res.status(200).json({ message: `Users Succesfully retrieve`, users });
  } catch (err) {
    res.status(500).json({ message: `Failed during fetch ${err}` });
  }
};

export const getSpecificUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: ["id", "name", "email"],
    });

    if (!user) {
      res.status(400).json({ message: `Unable to find user!` });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: `Failed during fetch ${err}` });
  }
};
