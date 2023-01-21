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
        let {name,userID, picture} = req.body;
        // console.log(req.body.picture.data.url)
        let existedUser = await db.collection("Users").findOne({userID : userID});
       
        if(existedUser == null){
            let user = await db.collection("Users").insertOne({name,userID,imgSrc:picture.data.url});
            let token = jwt.sign(user,process.env.NEXT_PUBLIC_JWT_SECRET_KEY);
            // await user.save();
            
            // console.log(user)
           return res.status(201).json({success : "Successfully Created.",user :{name,userID,imgSrc: picture.data.url},token});
           
        }else{
            let user =  await db.collection("Users").findOne({userID : userID});
            if(user){

                let token = jwt.sign(user,process.env.NEXT_PUBLIC_JWT_SECRET_KEY);
                return res.status(200).json({user,token, success : "user Login Success"});
            }
        }
    }catch(error:any){
       return res.status(400).json({
        error : "Something went wrong."
       })
    }
}

export default handler;