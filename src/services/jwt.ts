import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

export const generateToken = (payload: object, expiresIn: string = '1h'): string => {
    return jwt.sign(payload, JWT_SECRET, { expiresIn });
};
