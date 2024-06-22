import { NextResponse } from "next/server";
import {writeFile} from 'fs/promises';

export async function POST(request){
    const data = await request.formData();
    const file = data.get("file");
    if(!file){
        console.log("File Not Found");
        return NextResponse.json({result:"File Not Found"});
    }
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const path = `./public/${file.name}`;
    writeFile(path,buffer);
    return NextResponse.json({result:"FileUploaded"});
}