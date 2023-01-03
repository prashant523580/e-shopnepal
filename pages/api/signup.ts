import type { NextApiRequest, NextApiResponse} from 'next';
import {connectToDatabase} from "../../lib/mongodb";
import Cryptojs from "crypto-js";
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
        if(!existedUser){
            let user = await db.collection("Users").insertOne({
                name,email ,password : Cryptojs.AES.encrypt(password,"secretkey").toString()
            });

            await user.save();
            
            // console.log(req.body)
           return res.status(201).json({success : "Successfully Created."});
           
        }else{
            
            return res.status(422).json({error : "User Already Exists"});
        }
    }catch(error:any){
       return res.status(422).json(error)
    }
}

export default handler;