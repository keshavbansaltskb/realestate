import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";

export async function GET(request) {
    let client = await MongoClient.connect("mongodb://localhost:27017/realestate");
    const db = client.db();
    const collection = db.collection("property");

    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get("page")) || 1;
    const limit = 4;
    const skip = (page - 1) * limit;

    const properties = await collection.find().skip(skip).limit(limit).toArray();
    const totalProperties = await collection.countDocuments();

    const response = {
        result: properties,
        hasMore: skip + properties.length < totalProperties,
    };

    return NextResponse.json(response);
}