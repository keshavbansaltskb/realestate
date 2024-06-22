import { NextResponse } from "next/server";
import { MongoClient, ObjectId } from "mongodb";
import mongoose from "mongoose";

export async function PUT(request){
    let {cpass,npass,rpass,id} = await request.json();
    const objectId = new ObjectId(id);
    let MongoClient =require("mongodb").MongoClient;
    let client =await MongoClient.connect("mongodb://localhost:27017/realestate");
    const db= client.db();
    const collection = db.collection("login");
    const stud = await collection.findOne({ _id: objectId });
    if(cpass==stud.pass){
        if(npass===rpass){
            await collection.updateOne({_id:objectId},{$set:{pass:npass}});
            client.close();
            return NextResponse.json({result:"success"});
        }
        else{
            client.close();
            return NextResponse.json({result:"mismatch"});
        }
    }
    else{
        client.close();
        return NextResponse.json({result:"incorrect"});
    }
}
