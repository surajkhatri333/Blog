import jwt from 'jsonwebtoken';

export const verifyJwt = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: "Unauthorized: Token not found" });
    }
    try {
        const data = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = data;
        next();
    } catch (err) {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
};
