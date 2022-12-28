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
        // console.log(req.query.slug)
        let {db} = await connectToDatabase();
        let product = await db.collection("Products").findOne({slug:req.query.slug});
        // let tshirts : any = {};
        // for(let item of products){
        //     if(item.title in tshirts){
        //         if(!tshirts[item.title].color.includes(item.color) && item.availableQuantity > 0){
        //             tshirts[item.title].color.push(item.color)
        //         }
        //         if(!tshirts[item.title].size.includes(item.size) && item.availableQuantity > 0){
        //             tshirts[item.title].size.push(item.size)
        //         }
        //     }else{
        //         tshirts[item.title] =  item
        //         if(item.availableQuantity > 0){
        //             tshirts[item.title].size = [item.size];
        //             tshirts[item.title].color = [item.color]
        //         }
        //     }

        // }
        // let product : any = [] ;
        //  Object.keys(tshirts).map((key:any) => {
        //     if(tshirts[key].slug == req.query.slug){
        //         product = tshirts[key]
        //     }
            
        // })
        // console.log(product)
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