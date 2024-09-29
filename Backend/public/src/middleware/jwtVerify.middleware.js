import jwt from 'jsonwebtoken'
export const verifyJwt = (req,res,next)=>{
    const token = req.cookies.token;

    if(!token){
        return res.status(400).json("unauthorized token not found");
    }

    try {
        const data = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET );
        req.user = data;
        next();
    } catch (err){
        return res.status(400).josn("Invalid token or expire token")
    }

}