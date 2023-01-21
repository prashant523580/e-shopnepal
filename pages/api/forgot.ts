// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const Cryptojs =  require('crypto-js');
const ObjectId =  require('mongodb').ObjectID;
import type { NextApiRequest, NextApiResponse } from 'next'
import { connectToDatabase } from '../../lib/mongodb'

type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {

    try{
        let token = "tokennusjjksdf"
        let email = `
        Hi [name],
        
        There was a request to change your password!
        
        If you did not make this request then please ignore this email.
        
        Otherwise, please click this link to change your password:<a href="http://localhost:3000/forgot?token=${token}"> Reset Password. </a>`
        let {db} = await connectToDatabase();
        if(req.method == "POST"){

            await db.collection("Forgot").insertOne({
                email:req.body.email,
                token: token
            });
        } else if(req.method == "PUT"){
            console.log(req.body);
            let user  =   await db.collection("Forgot").findOne({token: req.body.token});
            if(user){
                console.log(user.email)
                let dbUser =    await db.collection("Users").findOne({email:user.email});
                // console.log(dbUser);
                let changedpass = await db.collection("Users").updateOne({_id: new ObjectId(dbUser._id)}, {$set:{password: Cryptojs.AES.encrypt(req.body.password,process.env.NEXT_PUBLIC_AES_SECRET_KEY).toString()}})
                // console.log(forgot)
                res.status(200).json({ message: 'successfully reset',user : changedpass })
            }

        }
    }catch(error: any){
        res.status(422).json(error)

    }
}
