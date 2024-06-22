import { NextResponse } from "next/server";
import mongoose from "mongoose";
import {MongoClient, ObjectId} from "mongodb";
import { getCookie, setCookie } from "cookies-next";

export async function GET(request,content){
    let id = content.params.id;
    let objectId = new ObjectId(id);
    let MongoClient =require("mongodb").MongoClient;
    let client =await MongoClient.connect("mongodb://localhost:27017/realestate");
    const db= client.db();
    const collection = db.collection("login");
    const stud = await collection.findOne({_id:objectId});
    client.close();
    return NextResponse.json({ result: stud });
}