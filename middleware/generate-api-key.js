import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();


export const generateAPiKey = (role) => {
    const payload = { role };
    const secret =env.process.JWT_SECRET_CODE;
    const options = { expiresIn: '1h' , algorithm: 'HS256'};
    const token = jwt.sign(payload, secret, options);
    return token;
}

