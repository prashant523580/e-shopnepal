import type { NextApiRequest, NextApiResponse} from 'next';
import {connectToDatabase} from "../../lib/mongodb";

const handler =  async(req:NextApiRequest,res:NextApiResponse<any>) => {
 
    switch(req.method){
        case "GET" :
            return getProductBySlug(req,res);
    }
}
const getProductBySlug = async (req:NextApiRequest,res:NextApiResponse) => {

    try{
        // console.log(req.body)
        let {db} = await connectToDatabase();
        let products = await db.collection("Products").find({_id:req.body})
        .toArray();
        // console.log(products)
       return res.status(200).json({products});
    }catch(error:any){
       return res.status(422).json(error)
    }
}

export default handler;