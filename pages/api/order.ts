import type { NextApiRequest, NextApiResponse} from 'next';
import {connectToDatabase} from "../../lib/mongodb";
const Cryptojs = require("crypto-js");
const jwt = require("jsonwebtoken");
const handler =  async(req:NextApiRequest,res:NextApiResponse<any>) => {
 
    switch(req.method){
        case "POST" :
            return addOrder(req,res);
        case "GET":
            return getOrders(req,res);
    }
}
const addOrder = async (req:NextApiRequest,res:NextApiResponse) => {

    try{
        let {db} = await connectToDatabase();
        let {userId,products,address,amount} = req.body;
        // console.log(req.body)
        // console.log(userId,products,address,amount)
        let status = [
            {
                type: "ordered",
                date: new Date(),
                isCompleted : true
            },
            {
                type: "packed",
                isCompleted: false
            },
            {
                type: "shipped",
                isCompleted:false
            },
            {
                type:"delivered",
                isCompleted: false
            }
        ]
        // let user = await db.collection("Users").find();
            await db.collection("Orders").insertOne({userId,products,address,amount,status});
            return res.status(201).json({
                success: 'successfully created order',
            
            })
        
    }catch(error:any){
       return res.status(400).json({
        error : "Something went wrong."
       })
    }
}

const getOrders = async(req:NextApiRequest,res:NextApiResponse) => {
    try{
        let token = req.headers.authorization;
        // console.log(token)
        let decoded = jwt.decode(token,"secretkey");
        let {db} = await connectToDatabase();
        // console.log(decoded._id)
        let orders = await db.collection("Orders").find({userId: decoded._id}).toArray();
        // console.log(orders)
        res.status(200).json({
            orders
        })
    }catch(error:any){
        res.status(422).json({error})
    }
}
export default handler;