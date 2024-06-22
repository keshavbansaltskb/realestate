import { NextResponse } from "next/server";
import mongoose from "mongoose";
import {MongoClient} from "mongodb";

export async function POST(request){
    let {property,propertyfor,bhk,state,city} = await request.json();
    let MongoClient =require("mongodb").MongoClient;
    let client =await MongoClient.connect("mongodb://localhost:27017/realestate");
    const db= client.db();
    const collection = db.collection("property");
    console.log(property+" "+propertyfor+" "+bhk+" "+state+" "+city);
    const stud = await collection.find({property: property,propertyfor:propertyfor,bhk: bhk,state: state,city: city}).toArray();
    client.close();
    return NextResponse.json({ result: stud});
}
