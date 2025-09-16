import rateLimit from "../config/upstash.js";
const ratelimiter = async (req,res,next)=>{
    try{
        const {success} = await rateLimit.limit("my-limit-key");
        if(!success){
            res.status(429).json({message:"Too many requests"});
        }
        next();
    }
    catch(error){
        console.error(error);
        res.status(500).json({message:"Error in rate limiting"});
    }
}
export default ratelimiter;