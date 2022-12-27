import type { NextApiRequest, NextApiResponse} from 'next';
const ObjectId = require("mongodb").ObjectId
import {connectToDatabase} from "../../../lib/db";

const handler =  async(req:NextApiRequest,res:NextApiResponse<any>) => {
 
    switch(req.method){
        case "GET" :
            return getProductBySlug(req,res);
    }
}
const getProductBySlug = async (req:NextApiRequest,res:NextApiResponse) => {

    try{
        // console.log(req.query.slug)
        let {db} = await connectToDatabase();
        let products = await db.collection("Products").find({}).toArray();
   
        let tshirts : any = {};
        for(let item of products){
            if(item.title in tshirts){
                if(!tshirts[item.title].color.includes(item.color) && item.availableQuantity > 0){
                    tshirts[item.title].color.push(item.color)
                }
                if(!tshirts[item.title].size.includes(item.size) && item.availableQuantity > 0){
                    tshirts[item.title].size.push(item.size)
                }
            }else{
                tshirts[item.title] =  item
                if(item.availableQuantity > 0){
                    tshirts[item.title].size = [item.size];
                    tshirts[item.title].color = [item.color]
                }
            }

        }
        let product ;
         Object.keys(tshirts).map((key:any) => {
            if(tshirts[key].slug == req.query.slug){
                product = tshirts[key]
            }
            
        })
       return res.status(200).json({products : product});
    }catch(error:any){
       return res.status(422).json(error)
    }
}

export default handler;