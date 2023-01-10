import type { NextApiRequest, NextApiResponse} from 'next';
import {connectToDatabase} from "../../lib/mongodb";
const Cryptojs = require("crypto-js");
const jwt = require("jsonwebtoken")
const handler =  async(req:NextApiRequest,res:NextApiResponse<any>) => {
 
    switch(req.method){
        case "POST" :
            return addUser(req,res);
    }
}
const addUser = async (req:NextApiRequest,res:NextApiResponse) => {

    try{
        let {db} = await connectToDatabase();
        let {name,email,password} = req.body;
        let existedUser = await db.collection("Users").findOne({email});
        
        if(existedUser == null){
            let user = await db.collection("Users").insertOne({
                name,email ,password : Cryptojs.AES.encrypt(password,process.env.NEXT_PUBLIC_AES_SECRET_KEY).toString()
            });
            let token = jwt.sign(user,process.env.NEXT_PUBLIC_JWT_SECRET_KEY);
            // await user.save();
            
            // console.log(req.body)
           return res.status(201).json({success : "Successfully Created.",user,token});
           
        }else{
            
            return res.status(400).json({error : "User Already Exists"});
        }
    }catch(error:any){
       return res.status(400).json({
        error : "Something went wrong."
       })
    }
}

export default handler;