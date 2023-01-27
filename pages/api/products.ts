import type { NextApiRequest, NextApiResponse} from 'next';
import slugify from 'slugify';
const ObjectId = require("mongodb").ObjectId
import {connectToDatabase} from "../../lib/mongodb";
import formidable from "formidable";
import IncomingForm from 'formidable/Formidable';
import path from 'path';
export const config = {
    api:{

        bodyParser :false
    }
}
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
                }else{
                    tshirts[item.title].size = [];
                    tshirts[item.title].color = []

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
    const readFiles = async (req :NextApiRequest, saveLocally : boolean) : Promise<{fields:formidable.Fields,files: formidable.Files}> => {
        const options : formidable.Options = {}
        if(saveLocally){
            options.uploadDir = path.join(process.cwd(),"/public/images")
            options.filename = (name,ext,path,form) => {
                return Date.now().toString() + "_" + path.originalFilename;
            }
        }
        const form = await formidable(options);
        return new Promise((resolve,reject) => {
           form.parse(req,(err,fields,files) =>{
                    if(err) reject(err)
                    // return {fields,files}
                    resolve({fields,files});
                })
        })
    }
    try{

        let {db} = await connectToDatabase();
        const options : formidable.Options = {
            uploadDir : path.join(process.cwd(),"/public/images"),
            filename : (name,ext,path,form) => {
                        return Date.now().toString() + "_" + path.originalFilename;
            }
        }

        // console.log(req.body)
        // if(req.files.length > 0) {
        //     console.log(req.files)
        // }
        // console.log(req)
        // console.log(readFiles(req,true))
        const form : IncomingForm = formidable(options);
    
        let formres = form.parse(req , async (err,fields,files) => {
            // console.log({files,fields})
            if(err){
                res.status(422).json({error:"failed to upload image."})
            }
            let data : any ={imgSrc:files.imgSrc, ...fields }
            // console.log(data.imgSrc.newFilename)
            // return JSON.stringify(data)
            // console.log({files: files.imgSrc.newFilename, ...fields})
            await db.collection("Products").insertOne({
               title:data.title,
               imgSrc:data.imgSrc.newFilename,
               slug:slugify(data.title + " "+ data.size + " "+data.color),
               category: data.category,
               description: data.description,
               price: Number(data.price),
               size: data.size,
               color: data.color,
               availableQuantity: Number(data.availableQuantity),
               brand : data.brand
            })
            return res.status(200).json({
                message: "Product has been created Successfully",
            })
        }) 
       
        // const formres = await form.parse(req);
        
        // await addedProduct.save();
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
             "description":req.body.description,
             "category": req.body.category,
             "price":Number(req.body.price),
             "aviableQuantity": Number(req.body.aviableQuantity),
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