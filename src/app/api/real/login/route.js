import { NextResponse } from "next/server";
import mongoose from "mongoose";
import {MongoClient} from "mongodb";
import { cookies } from "next/headers";
import { getCookie, setCookie } from "cookies-next";

export async function POST(request){
    let {email,pass} = await request.json();
    let MongoClient =require("mongodb").MongoClient;
    let client =await MongoClient.connect("mongodb://localhost:27017/realestate");
    const db= client.db();
    const collection = db.collection("login");
    const stud = await collection.findOne({email:email});
    if(stud!= null){
        if (stud.pass == pass) {
            const id=""+stud._id;
            cookies().set(id,stud.email);
            client.close();
            return NextResponse.json({
                result: "success",
                userId: id,
            });
        } else {
            client.close();
            return NextResponse.json({ result: "Mismatch" });
        }
    }
    else{
        client.close();
        return NextResponse.json({ result: "Invalid" });
    }
   
}

