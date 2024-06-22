import { NextResponse } from "next/server";
import mongoose from "mongoose";
import {MongoClient, ObjectId} from "mongodb";

export async function GET(request){
    let MongoClient = require("mongodb").MongoClient;
    let Client =await MongoClient.connect("mongodb://localhost:27017/realestate");
    const db= Client.db();
    const collection = db.collection("message");
    var stud = await  collection.find().toArray();
    
    return NextResponse.json({ result: stud});
}
