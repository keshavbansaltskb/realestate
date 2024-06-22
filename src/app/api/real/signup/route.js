import { NextResponse } from "next/server";
import mongoose from "mongoose";
import {MongoClient, ObjectId} from "mongodb";

export async function POST(request){
    let {fname,lname,email,pass,phone} = await request.json();
    let MongoClient =require("mongodb").MongoClient;
    let client=await MongoClient.connect("mongodb://localhost:27017/realestate");
    const db=client.db();
    const collection = db.collection("login");
    await collection.insertOne({
        fname : fname,
        lname : lname,
        email : email,
        phone:phone,
        pass: pass
    });
    client.close();
    return NextResponse.json({result:"submit"});
}

export async function PUT(request){
    let {fname,lname,phone,code} = await request.json();
    let objectId = new ObjectId(code);
    let MongoClient =require("mongodb").MongoClient;
    let client=await MongoClient.connect("mongodb://localhost:27017/realestate");
    const db=client.db();
    const collection = db.collection("login");
    await collection.updateOne({_id:objectId},{$set:{
        fname:fname,
        lname:lname,
        phone:phone
    }});
    client.close();
    return NextResponse.json({result:"submit"});
}