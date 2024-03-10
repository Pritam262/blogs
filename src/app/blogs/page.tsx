import { MONGO_URI } from "@/lib/db";
import { Blog } from "@/lib/model/blogModel";
import mongoose from "mongoose";
import { Metadata} from "next";
import Link from "next/link";

import DeleteBtn from "../../../components/deletebtn";

export async function generateMetadata({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }): Promise<Metadata> {


    return {
        title: 'Blog | pritamjana.com',
        description: "fetch all blogs",
        keywords: "India's top bloging website",
    };
}

export default  async function getBlog(){
    'use server'

    await mongoose.connect(MONGO_URI);
    const blogs = await Blog.find().sort({date:-1});

    return(
        <div className="w-full min-h-screen max-h-fit bg-gray-200  flex flex-col ">

            <div className="w-full mt-2 flex flex-col items-center">

            {blogs && blogs.map((blog,index)=>{
                return(
                    <div key={index} className="w-3/5  mb-5 p-4 bg-white rounded shadow-lg flex flex-col justify-between">
                        <p className="text-3xl">{blog.title}</p>
                        <p className="text-xl">{blog.description}</p>
                        <div>
                            <Link href={`/blogs/blog?q=${blog.title}&id=${blog._id}`} className="mr-2"><button className="p-2 bg-purple-600 rounded text-white text-xl">Read more</button></Link>
                           {/* <DeleteBtn id={blog._id.toString()}/> */}
                        </div>
                    </div>
                )
            })}
            </div>
        </div>
    )


}
