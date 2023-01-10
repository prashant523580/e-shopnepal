import type { NextApiRequest, NextApiResponse} from 'next';
import {connectToDatabase} from "../../lib/mongodb";
const CryptoJs = require("crypto-js");
const jwt = require("jsonwebtoken");
const handler =  async(req:NextApiRequest,res:NextApiResponse<any>) => {
    try{
        const {email,password} = req.body;
        let {db} = await connectToDatabase();
        let user = await db.collection("Users").findOne({email: email})
        // console.log(password == CryptoJs.AES.decrypt(user.password,"secretkey").toString(CryptoJs.enc.Utf8))
        if(user != undefined ){
            if(password == CryptoJs.AES.decrypt(user.password,process.env.NEXT_PUBLIC_AES_SECRET_KEY).toString(CryptoJs.enc.Utf8)){
                let token = jwt.sign({...user,suc:true},process.env.NEXT_PUBLIC_JWT_SECRET_KEY);
                let logeduser = jwt.decode(token,process.env.NEXT_PUBLIC_JWT_SECRET_KEY)
                return res.status(200).json({
                     success : "Login Success",
                     token,
                     user : logeduser
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
       return res.status(422).json({error:"Somethings went wrong.."})
    }
}

export default handler;