import { NextResponse } from "next/server";
import mongoose from "mongoose";
import {MongoClient} from "mongodb";

export async function POST(request){
    let {property} = await request.json();
    let MongoClient =require("mongodb").MongoClient;
    let client =await MongoClient.connect("mongodb://localhost:27017/realestate");
    const db= client.db();
    const collection = db.collection("property");
    const stud = await collection.find({property: property}).toArray();
    client.close();
    return NextResponse.json({ result: stud});
      
}
