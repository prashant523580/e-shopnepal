import mongoose from 'mongoose';
import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from "../../lib/mongodb";
const Cryptojs = require("crypto-js");
const handler = async (req: NextApiRequest, res: NextApiResponse<any>) => {

    switch (req.method) {
        case "POST":
            return addCart(req, res);
    }
}
const addCart = async (req: NextApiRequest, res: NextApiResponse) => {

    try {
        let { db } = await connectToDatabase();
        let { userId, carts,_id } = req.body;

        let cart = await db.collection("Carts").findOne({ "userId": req.body.userId});
        // console.log(Object.keys(cart.carts).includes(carts.slug))
        console.log(cart.carts)
        if (cart) {
            let keys = Object.keys(cart.carts);
            // for (let i = 0; i < keys.length; i++) {
            //     console.log(cart.carts)
            // }
            console.log(keys)
            
        } else {
            await db.collection("Carts").insertOne({ userId, carts });
            return res.status(201).json({
                success: 'successfully created order',
    
            })
        }

    } catch (error: any) {
        return res.status(400).json({
            error: "Something went wrong."
        })
    }
}

export default handler;