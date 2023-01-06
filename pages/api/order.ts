import mongoose from 'mongoose';
import type { NextApiRequest, NextApiResponse} from 'next';
import {connectToDatabase} from "../../lib/mongodb";
const Cryptojs = require("crypto-js");
const handler =  async(req:NextApiRequest,res:NextApiResponse<any>) => {
 
    switch(req.method){
        case "POST" :
            return addOrder(req,res);
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

export default handler;