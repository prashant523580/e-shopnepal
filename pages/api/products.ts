import type { NextApiRequest, NextApiResponse} from 'next';
import slugify from 'slugify';
const ObjectId = require("mongodb").ObjectId
import {connectToDatabase} from "../../lib/mongodb";

const handler =  async(req:NextApiRequest,res:NextApiResponse<any>) => {
 
    switch(req.method){
        case "GET" :
            return getProducts(req,res);
        case "POST":
            return addProducts(req,res);
        case "PUT":
            return updateProduct(req,res);
    }
}
const getProducts = async (req:NextApiRequest,res:NextApiResponse) => {

    try{
        let {db} = await connectToDatabase();
        let products = await db.collection("Products").find({})
        .toArray();
        // console.log(typeof products)
        let tshirts : any = {};
        for(let item of products){
            // console.log(item.title)
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
        // console.log(tshirts)
       return res.status(200).json({products : tshirts});
    }catch(error:any){
       return res.status(422).json(error)
    }
}
const addProducts = async  (req:NextApiRequest,res:NextApiResponse) => {
    try{

        let {db} = await connectToDatabase();
        // console.log(req.body)
         await db.collection("Products").insertOne({
            title:req.body.title,
            imgSrc:req.body.imgSrc,
            slug:slugify(req.body.title + " "+ req.body.size + " "+req.body.color),
            category: req.body.category,
            desc: req.body.desc,
            price: req.body.price,
            size: req.body.size,
            color: req.body.color,
            availableQuantity: req.body.availableQuantity
         })
        // await addedProduct.save();
        return res.status(201).json({
            message: "Product has been created Successfully",
        })
    }catch(error:any){
       return res.status(422).json({
        message:"Failed to create."
       })
    }
}
const updateProduct =  async (req:NextApiRequest,res:NextApiResponse) => {
    try{
        let {db} = await connectToDatabase();
        var query = { _id: new ObjectId(req.body._id.toString())};
    const options = {upsert: true }
    const updateTodo = {
         $set: {
            "title": req.body.title,
             "imgSrc":req.body.imgSrc,
             "slug":req.body.slug,
             "desc":req.body.desc,
             "category": req.body.category,
             "price":req.body.price,
             "aviableQuantity": req.body.aviableQuantity,
             "size":req.body.size,
             "color": req.body.color
         }
      };
        await db.collection("Products").updateOne(query,updateTodo,options)
        return res.status(200).json({
            message:"Product has been updated successfully."
        })
    }catch(error){
        return res.status(422).json(error)
    }
}
export default handler;