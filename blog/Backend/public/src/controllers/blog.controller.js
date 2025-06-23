import blog from '../models/blog.model'
import {useAuth0} from "@auth0/auth0-react"

export const createBlog = async()=>{
    const [isAuthnticate,user] = useAuth0();
    try{
        let [owner,image , title , short_headline , description] = req.body;
        console.log(req.body);
    }
    catch(err){
        console.log("something went wrong");
    }

}