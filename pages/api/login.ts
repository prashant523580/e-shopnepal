import type { NextApiRequest, NextApiResponse} from 'next';
import {connectToDatabase} from "../../lib/mongodb";
import Cryptojs from "crypto-js";
const handler =  async(req:NextApiRequest,res:NextApiResponse<any>) => {
 
    
    
    try{
        let {db} = await connectToDatabase();
        let user = await db.collection("Users").findOne({email: req.body.email})
        if(user != null){
            if(user.password == Cryptojs.AES.decrypt(req.body.password,"secretkey").toString(Cryptojs.enc.Utf8)){
                return res.status(200).json({
                     success : "Login Success",
                     user
                 });

            }else{
                return res.status(400).json({
                    error: "Login error"
                });
            }
        }else{
            
            return res.status(400).json({
                error: "Invalid Credential"
            });
        }
        // console.log(req.body)
    }catch(error:any){
       return res.status(422).json(error)
    }
}

export default handler;