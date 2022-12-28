import type { NextApiRequest, NextApiResponse} from 'next';
import {connectToDatabase} from "../../../lib/mongodb";

const handler =  async(req:NextApiRequest,res:NextApiResponse<any>) => {
 
    switch(req.method){
        case "GET" :
            return getProductBySlug(req,res);
    }
}
const getProductBySlug = async (req:NextApiRequest,res:NextApiResponse) => {

    try{
        let {db} = await connectToDatabase();
        let product = await db.collection("Products").findOne({slug:req.query.slug});
   
            let varients = await db.collection("Products").find({title: product.title}).toArray();
            // console.log(varients)
                let colorSizeSlug : any = {};  //{ color:{size: {slug : #}}}
                for(let item of varients){
                       if( Object.keys(colorSizeSlug).includes(item.color)){
                            colorSizeSlug[item.color][item.size] = {slug:item.slug}
                        }else{
                            colorSizeSlug[item.color] = {}
                            colorSizeSlug[item.color][item.size] = {slug:item.slug}
                        }
                    }
       return res.status(200).json({product,varients: colorSizeSlug});
    }catch(error:any){
       return res.status(422).json(error)
    }
}

export default handler;