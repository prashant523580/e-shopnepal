// import mongoose from "mongoose";
import { MongoClient } from "mongodb";

const MONGODB_URI : any = process.env.MONGO_URI;
const DB_NAME : any =  process.env.DB_NAME;

if(!MONGODB_URI){
    throw new Error("Define the mongodb environmental variables")
}
if(!DB_NAME){
    throw new Error("Define the mmongodb name environmental variables.")
}

let cachedClient : any = null;
let cachedDb : any = null;

export async function connectToDatabase(){
    //check the cache
    if(cachedClient & cachedDb){
            return{
                client : cachedClient,
                db : cachedDb
            }
    }
    //connection option
    const options : any = {
        useNewUrlParser : true,
        useUnifiedTopology : true
    }
    //connect to cluster
    let client = new MongoClient(MONGODB_URI,options);
    await client.connect()
    let db = client.db(DB_NAME);
    //set cache
    cachedClient = client;
    cachedDb  = db;

    return{
        client : cachedClient,
        db: cachedDb
    }
}
// const connectDb = handler =>  (req,res)  => {
//     if(mongoose.connections[0].readyState){
//         return handler(req,res)
//     }
//     mongoose.set("strictQuery", true);
//     mongoose.connect(process.env.MONGO_URI,{
//         useNewUrlParser : true, useUnifiedTopology: true,
//     })
//     return handler(req,res);
// }
// export default connectDb;