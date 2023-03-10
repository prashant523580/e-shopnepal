
import type { NextApiRequest, NextApiResponse} from 'next';
import {connectToDatabase} from "../../lib/mongodb";
const jwt = require("jsonwebtoken");

const ObjectId  = require("mongodb").ObjectId;
const handler =  async(req:NextApiRequest,res:NextApiResponse<any>) => {
 
    switch(req.method){
        case "POST" :
            return addOrder(req,res);
        case "GET":
            return getOrders(req,res);
        case "PUT":
            return cancleOrders(req,res);
    }
}
const addOrder = async (req:NextApiRequest,res:NextApiResponse) => {

    try{
        let {db} = await connectToDatabase();
        let {userID,products,address,amount,orderId} = req.body;
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
            let product;
            let sumTotal = 0;
            for(let key in products){
                // console.log(products[key])
                sumTotal += products[key].qty * products[key].price
                product = await db.collection("Products").find({slug : key}).toArray();
                
                if(product[0].availableQuantity  < products[key].qty){
                    return res.status(400).json({
                        
                        error: 'Some items in your cart went out of stock. please try again.',
                    })
                }else{

                }
                if(product[0].price != products[key].price){
                    return res.status(400).json({
                        error: 'The price of some items in your cart have changed. Please try again.',
                    })
                }
            }
            if(amount != sumTotal){
                return res.status(400).json({
                    error: 'The price of some items in your cart have changed. Please try again.',
                })
            }
            await db.collection("Orders").insertOne({userID,orderId,orderStatus:"pending",products,address,amount,status,paymentStatus: "pending",paymentMethod:"COD"});
            for(let key in products){
                console.log(key)
                //   let prod =  await db.collection("Products").fineOneAndUpdate({slug:key} , {$inc :{availableQuantity : -products[key].qty}}).toArray();
                //     console.log(prod)
            }
            // res.redirect("/orders", 200 )
            return res.status(200).json({
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
        let decoded = jwt.decode(token,process.env.NEXT_PUBLIC_JWT_SECRET_KEY);
        let {db} = await connectToDatabase();
        console.log(decoded.userID)
        let orders = await db.collection("Orders").find({userID: decoded.userID.toString()}).toArray();
        // console.log(orders)
        res.status(200).json({
            orders
        })
    }catch(error:any){
        res.status(422).json({error})
    }
}
const cancleOrders = async(req:NextApiRequest,res:NextApiResponse) => {
    try{
        let order = req.body;
        console.log(order.orderStatus)

        let {db} = await connectToDatabase();
        // console.log(decoded._id)
        let orders = await db.collection("Orders").findOneAndUpdate(
            {_id : new ObjectId(order._id)},
             {$set:{"orderStatus" : "cancelled"}}
        );
        // await orders.save();
        // console.log(JSON.stringify(orders))

        res.status(200).json({success:"successfully cancelled order.",orders})
      
    }catch(error:any){
        res.status(422).json(error)
    }
}
export default handler;