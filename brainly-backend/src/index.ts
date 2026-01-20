import express from "express"
import mongoose from "mongoose"
import jwt from "jsonwebtoken"
import { ContentModel, LinkModel, UserModel } from "./db.js"
import { JWT_PASSWORD } from "./config.js"
import { userMiddleware } from "./middleware.js"
import { Random } from "./utils.js"
import cors from "cors"
const app=express()
app.use(cors())
app.use(express.json());
app.post("/api/v1/signup",async(req,res)=>{
    const username=req.body.username;
    const password=req.body.password;
    await UserModel.create({
        username:username,
        password:password
    })
    res.json({
        message:"User signed up"
    })
})
app.post("/api/v1/signin",async (req,res)=>{
    const username=req.body.username;
    const password=req.body.password;
    const existingUser=await UserModel.findOne({
         username,password
    })
    if(existingUser){
        const token =jwt.sign({
            id:existingUser._id
        },JWT_PASSWORD)
        res.json({
            token
        })
    }
    else{
        res.status(403).json({
            message:"Invalid Credentials"
        })
    }
})
app.post("/api/v1/content",userMiddleware,async(req,res)=>{
    const link=req.body.link
    const type=req.body.type
    const title=req.body.title
    await ContentModel.create({
        link,
        type,
        title,
        //@ts-ignore
        userId:req.userId,
       
        tags:[]
    })
    res.json({
        message:"content added"
    })
})
app.get("/api/v1/content",userMiddleware,async(req,res)=>{
    //@ts-ignore
    const userId=req.userId
    const Content=await ContentModel.find({
         userId:userId
    }).populate("userId","username")
    res.json({
        content: Content
    })
})
app.delete("/api/v1/content",userMiddleware,async(req,res)=>{
    
    const contentId=req.body.contentId
    const content=await ContentModel.deleteMany({
           contentId,
           //@ts-ignore
           userId:req.userId
    })
    res.json({
        message:"deleted"
    })
    
})
app.post("/api/v1/brain/share",userMiddleware,async (req,res)=>{
    const share=req.body.share;
    const existingLink=await LinkModel.findOne({
          //@ts-ignore
            userId:req.userId, 
    })
    if(existingLink){
         res.json({
            hash:existingLink.hash
         })
         return
    }
    if(share){
        const hash=Random(10)
        await LinkModel.create({
            //@ts-ignore
            userId:req.userId,
            hash:hash
        })
        res.json({
            hash
        })
    }else{
        await LinkModel.deleteOne({
            //@ts-ignore
            userId:req.userId,
        })
        res.json({
            message:"removed Link"
        })
    }
    res.json({
        message:"Updated shareable link"
    })
})
app.get("/api/v1/brain/:shareLink",async(req,res)=>{
    const hash=req.params.shareLink
    const link=await LinkModel.findOne({
        hash
    })
    if(!link){
        res.status(411).json({
            message:"link not found!"
        })
        return;
    }
    const content=await ContentModel.find({
        //@ts-ignore
        userId:link.userId
    })
    const user=await UserModel.findOne({
         //@ts-ignore
        _id:link.userId
    })
    if(!user){
        res.status(404).json({
            message:"user not exist"
        })
        return
    }
    res.json({
        username:user.username,
        content:content
    })
})
app.listen (3002) 