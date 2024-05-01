import { Metadata } from "next";
import Link from "next/link";
import Navbar from "../../components/navbar";
import { BlogsInterface } from "./utils/blogs";

const ServerUrl = String(process.env.SERVER_URL);

// { searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }

export async function generateMetadata(): Promise<Metadata> {


    return {
        title: 'Blog | pritamjana.com',
        description: "fetch all blogs",
        keywords: "India's top bloging website",
    };
}

export default async function getBlog() {


    try {


        const response = await fetch(`${ServerUrl}/api/blog`, { cache: 'no-cache' });

        const blogs: BlogsInterface = await response.json();

        return (
            <div className="w-full min-h-screen max-h-fit bg-gray-200  flex flex-col ">
                <Navbar />

                <div className="w-full mt-2 flex flex-col items-center">

                    {blogs.success && blogs.success.map(blog => {
                        return (
                            <div key={blog?._id} className="vsm:w-10/12 sm:w-3/5  mb-5 p-4 bg-white rounded shadow-lg flex flex-col justify-between">
                                <p className="text-3xl">{blog.title}</p>
                                <p className="text-xl">{blog.description}</p>
                                <div>
                                    <Link href={`/blog?q=${blog.title}&id=${blog._id}`} className="mr-2"><button className="p-2 bg-purple-600 rounded text-white text-xl">Read more</button></Link>
                                    {/* <DeleteBtn id={blog._id.toString()}/> */}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    } catch (error) {
        <div className="w-full min-h-screen max-h-fit bg-gray-200  flex flex-col ">
            <Navbar />

            <div className="w-full mt-2 flex flex-col items-center">


                <div className="vsm:w-10/12 sm:w-3/5  mb-5 p-4 bg-white rounded shadow-lg flex flex-col justify-between">
                    <p className="text-3xl">There is no Blogs</p>

                </div>
            </div>

        </div>

    }
}
