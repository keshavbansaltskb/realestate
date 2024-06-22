import { NextResponse } from "next/server";
import { MongoClient, ObjectId } from "mongodb";
import mongoose from "mongoose";
import { cookies } from "next/headers";
export async function GET(request,content){
    const id = content.params.id;
    let MongoClient =require("mongodb").MongoClient;
    let client =await MongoClient.connect("mongodb://localhost:27017/realestate");
    const db= client.db();
    const collection = db.collection("admin");
    const objectId = new ObjectId(id);
    const stud = await collection.findOne({ _id: objectId });
    let login = cookies().get(id).value;
    if(login){
        if(login==stud.email){
            client.close();
            return NextResponse.json({result:stud});
        }
        else{
            client.close();
            return NextResponse.json({result:"Email Id Not Match"});
        }
    }
    else{
        client.close();
        return NextResponse.json({result:"Not Login"});
    }
    client.close();
    return NextResponse.json({result:false});
}

