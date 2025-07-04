import jwt from 'jsonwebtoken';

export const verifyJwt = (req, res, next) => {
    console.log("Token from cookies:", token); // Debugging line to check the token
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
