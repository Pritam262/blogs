import { getDataFromToken } from "@/helper/getDataFromToken";
import { MONGO_URI } from "@/lib/db";
import { Blog } from "@/lib/model/blogModel";
import { HttpStatusCode } from "axios";
import { error } from "console";
import mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

// export async function GET() {
//     try {

//         await mongoose.connect(MONGO_URI);

//         const data = await Blog.find();

//         return NextResponse.json({ success: data })
//     } catch (error) {
//         return NextResponse.json({ error })
//     }
// }

interface RequestBody {
    title: string;
    description: string;
    content:string;

}

function validateRequest(object: any): object is RequestBody {
    return (
        (object as RequestBody) && typeof (object as RequestBody).title === "string" && (object as RequestBody).title.length >=6
    );
}

export const GET = async (req: { nextUrl: { searchParams: any; }; }) => {

    try {

        await mongoose.connect(MONGO_URI);

        const data = await Blog.find().sort({date:-1});

        return NextResponse.json({ success: data })
    } catch (error) {
        return NextResponse.json({ error })
    }
}


export async function POST(req: NextRequest) {
    try {
        const token = await getDataFromToken(req);
        await mongoose.connect(MONGO_URI);

        const searchParams = req.nextUrl.searchParams;
        const id = searchParams.get('id');
        const body = await req.json();

        const {title, description, content} = body;

        if (!validateRequest(body)) {
            console.log(validateRequest)
            return new NextResponse(JSON.stringify({ error: "Enter valid data" }), { status: HttpStatusCode.BadRequest, headers: { 'Content-Type': 'application/json' } });
        }
        const formatedData = {
            body: body,
            hdyd: "udeddu",
            dtyew: "k8ydued",
        }
        const uploadPost = await Blog.create({
           user:token, title,description, content
        })
        // return new NextResponse(JSON.stringify({ formatedData }), { status: HttpStatusCode.Ok, headers: { 'Content-Type': 'application/json' } });
        return new NextResponse("BLOG Upload", { status: HttpStatusCode.Ok, headers: { 'Content-Type': 'application/json' } });
    } catch (error) {
        return new NextResponse(JSON.stringify({ error: "Error" }), { status: HttpStatusCode.InternalServerError, headers: { 'Content-Type': 'application/json' } });
    }
}


export async function DELETE (req:NextRequest){
    try {

        await mongoose.connect(MONGO_URI);

        const searchParams = req.nextUrl.searchParams;
        const id = searchParams.get('id');
        if(!id){
            return new NextResponse("BLOG Not Found", { status: HttpStatusCode.NotFound, headers: { 'Content-Type': 'application/json' } });
        }
        // return new NextResponse(JSON.stringify({ formatedData }), { status: HttpStatusCode.Ok, headers: { 'Content-Type': 'application/json' } });

        await Blog.findByIdAndDelete(id);
        return new NextResponse("BLOG Deleted", { status: HttpStatusCode.Ok, headers: { 'Content-Type': 'application/json' } });
    } catch (error) {
        return new NextResponse(JSON.stringify({ error: "Error" }), { status: HttpStatusCode.InternalServerError, headers: { 'Content-Type': 'application/json' } });
    }
}