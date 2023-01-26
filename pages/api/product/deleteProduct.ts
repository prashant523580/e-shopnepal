import type { NextApiRequest, NextApiResponse} from 'next';
import {connectToDatabase} from "../../../lib/mongodb";
const ObjectId = require("mongodb").ObjectId
const handler =  async(req:NextApiRequest,res:NextApiResponse<any>) => {
 
    try{
        let {db} = await connectToDatabase();
        console.log(req.body)
         await db.collection("Products").deleteOne({_id: ObjectId(req.body)});
        res.status(200).json({success:"product deleted successfully."})
    }catch(error:any){
       return res.status(422).json(error)
    }
}
const getProductBySlug = async (req:NextApiRequest,res:NextApiResponse) => {

   
}

export default handler;