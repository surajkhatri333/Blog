import jwt from 'jsonwebtoken'
export const verifyJwt = (req,res,next)=>{
    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({message :"unauthorized token not found"});
    }

    try {
        const data = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET );
        req.user = data;
        console.log("User authenticated:", req.user);
        next();
    } catch (err){
        return res.status(401).json({message :"Invalid token or expire token"})
    }

}