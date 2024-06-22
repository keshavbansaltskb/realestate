import { NextResponse } from "next/server";
import mongoose from "mongoose";
import {MongoClient} from "mongodb";

export async function POST(request){
    let {property,category,area,unit,amount,amounttype,propertyfor,description,bhk,state,city,code,uploader,phone,address} = await request.json();
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const mm = monthNames[today.getMonth()];
    const yyyy = today.getFullYear();
    const myDateString = `${yyyy}-${mm}-${dd}`;
    let MongoClient =require("mongodb").MongoClient;
    let client=await MongoClient.connect("mongodb://localhost:27017/realestate");
    const db=client.db();
    const collection = db.collection("property");
    await collection.insertOne({
        property : property,
        category : category,
        area : area,
        unit: unit,
        amount: amount,
        amounttype : amounttype,
        propertyfor : propertyfor,
        description : description,
        bhk : bhk,
        state: state,
        city: city,
        code :code,
        dt:myDateString,
        uploader:uploader,
        phone:phone,
        address:address
    });
    client.close();
    return NextResponse.json({result:"Post"});
}

export async function GET(request){
    let MongoClient =require("mongodb").MongoClient;
    let client=await MongoClient.connect("mongodb://localhost:27017/realestate");
    const db=client.db();
    const collection = db.collection("property");
    const stud = await collection.find().toArray();
    client.close();
    return NextResponse.json({result:stud});
}


export async function PUT(request){
    let {id,property,category,area,unit,amount,amounttype,propertyfor,description,bhk,state,city} = await request.json();    
    let MongoClient =require("mongodb").MongoClient;
    let client=await MongoClient.connect("mongodb://localhost:27017/realestate");
    const db=client.db();
    const collection = db.collection("property");
    await collection.updateOne({code:id},{$set:{
        property : property,
        category : category,
        area : area,
        unit: unit,
        amount: amount,
        amounttype : amounttype,
        propertyfor : propertyfor,
        description : description,
        bhk : bhk,
        state: state,
        city: city
    }});
    client.close();
    return NextResponse.json({result:"Post"});
}
