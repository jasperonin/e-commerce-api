import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();


export const generateAPiKey = (role) => {
    const payload = { role };
    const secret = 'ecommerce-secret-key-code';
    const options = { expiresIn: '1h' , algorithm: 'HS256'};
    const token = jwt.sign(payload, secret, options);
    return token;
}

