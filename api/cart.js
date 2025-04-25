import { models } from "../models/index.js";
import bcrypt from "bcrypt";

const { User } = models;

export const login = async(req, res) => {

    const { email, password } = req.body;

    try {
        const user = await User.findOne({ where: {email}})

        if(!user) {
            res.status(400).json({message: `${user} cannot be found!`});
        }
        const isPasswordMatch = await bcrypt.compare(password,user.password_hash);
        if(!isPasswordMatch) {
            res.status(400).json({message: `${user} and ${password} mismatch`});
        }
        res.json({
            message: `Login success!`,
            user:{
                id: user.id,
                name: user.name,
                email: user.email
            }
        })
    } catch(err) {
        res.status(500).json({ message: `Error during login ${err}`});
    }

};