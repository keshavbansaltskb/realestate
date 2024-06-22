import { NextResponse } from "next/server";
import mongoose from "mongoose";
import {MongoClient, ObjectId} from "mongodb";


export async function GET(request,content){
    let id = content.params.id;
    let MongoClient =require("mongodb").MongoClient;
    let client=await MongoClient.connect("mongodb://localhost:27017/realestate");
    const db=client.db();
    const collection = db.collection("property");
    const stud = await collection.findOne({code:id});
    client.close();
    return NextResponse.json({result:stud});
}

export async function DELETE(request,content){
    let id = content.params.id;
    let MongoClient =require("mongodb").MongoClient;
    let client=await MongoClient.connect("mongodb://localhost:27017/realestate");
    const db=client.db();
    const collection = db.collection("property");
    const stud = await collection.deleteOne({code:id});
    client.close();
    return NextResponse.json({result:"Delete"});
}