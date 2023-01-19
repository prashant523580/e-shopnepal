// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { connectToDatabase } from '../../lib/mongodb';

const ObjectId  = require("mongodb").ObjectId;

type Data = {
  orders?: any,
  error?:any
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    try{
        let {db} = await connectToDatabase();
        console.log(req.query.id)
        // let orders :any = await db.collection("Orders").findById( new ObjectId(req.query.id ));
        // console.log(orders)
        res.status(200).json({
            // orders
        })
    }catch(error:any){
        res.status(422).json({error})
    }
}
