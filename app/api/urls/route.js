import { NextResponse } from "next/server";
import shortId from "shortid";
import urlmodel from "@/models/url";
import mongoose from "mongoose";

export async function GET() {
    await mongoose.connect(process.env.MONGODB_URI);
    const urls = await urlmodel.find({});
    return NextResponse.json({urls})
}

export async function POST(request) {
    await mongoose.connect(process.env.MONGODB_URI);
    const {originalUrl} = await request.json();
    const shortUrl = shortId();
    // console.log(originalUrl, shortUrl)
    await urlmodel.create({originalUrl, shortUrl});
    return NextResponse.json({message: shortUrl}, {status: 201})
}

export async function DELETE(request) {
    await mongoose.connect(process.env.MONGODB_URI);
    const {id} = await request.json();
    await urlmodel.findByIdAndDelete(id);
    return NextResponse.json({message: "data deleted"});
}