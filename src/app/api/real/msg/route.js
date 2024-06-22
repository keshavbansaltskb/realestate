import { NextResponse } from "next/server";
import mongoose from "mongoose";
import {MongoClient, ObjectId} from "mongodb";

export async function POST(request){
    let {message,email,property,category,area,amount,city,state,propertyfor,code} = await request.json();
    let MongoClient =require("mongodb").MongoClient;
    let client=await MongoClient.connect("mongodb://localhost:27017/realestate");
    const db=client.db();
    const data = db.collection("login");
    const detailsuser = db.collection("property");
    const objectId = new ObjectId(email);
    const stud = await data.findOne({_id:objectId});
    const details = await detailsuser.findOne({code:code});
    const collection = db.collection("message");
    await collection.insertOne({
        name : stud.fname+" "+stud.lname,
        email : stud.email,
        phone:stud.phone,
        message : message,
        property:property,
        category:category,
        area:area,
        amount:amount,
        city:city,
        state,state,
        propertyfor:propertyfor,
        propertycode:code,
        username:details.uploader,
        userphone:details.phone,
        useraddress:details.address
    });
    client.close();
    return NextResponse.json({result:"submit"});
}