// import { NextResponse } from "next/server";
import { redirect } from "next/navigation";
import urlmodel from "@/models/url";
import mongoose from "mongoose";

export async function GET(request, { params }) { // ist para is always request
    const id = await params.id;
    // return NextResponse.json({ id: "id is " + id });
    await mongoose.connect(process.env.MONGODB_URI);
    const response = await urlmodel.findOne({shortUrl: id});
    console.log(response);
    if(response.originalUrl) {
        redirect(response.originalUrl);
    } else {
        redirect("/404");
    }
}
