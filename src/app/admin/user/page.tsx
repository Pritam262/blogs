'use client'

import Link from "next/link";
import { useEffect, useState } from "react";
import DeleteBtn from "../../../../components/deletebtn";

interface BlogItem {
    _id: String;
    title: String;
    description: String;
    content: String;
}
interface BlogsData {
    // map(arg0: (blog: Blog, index: any) => import("react").JSX.Element): import("react").ReactNode;
    success: Array<BlogItem>
}
export default function UserPage() {

    const [blogs, setBlogs] = useState<BlogsData | null | undefined>()


    const handleDelete = async (id: String) => {

        try {
            
            const response = await fetch(`http://127.0.0.1:3003/api/blog?id=${id}`, {
                method: 'DELETE',
            });
            const resData = await response.json();
            
            console.log(resData, response.status);

            if(response.status === 200){
                let updateBlogsData = {...blogs};
                updateBlogsData.success = updateBlogsData.success?.filter(blog=> blog._id != id);
                console.log(updateBlogsData);
                setBlogs( updateBlogsData)

                console.log(resData);
            }
        } catch (error) {
            console.log(error)
        }

    }


    const getBlogs = async () => {

        const response = await fetch('http://127.0.0.1:3003/api/blog', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            cache: 'no-cache',
        })

        const resData = await response.json();

        setBlogs(resData);


    }

    useEffect(() => {
        getBlogs();
    }, [])

    // const Blogs = resData.success;




    return (
        <div className="w-full min-h-screen max-h-fit bg-gray-200  flex flex-col ">

            <div className="w-full mt-2 flex flex-col items-center">



                {blogs && blogs.success.map((blog: BlogItem, index: any) => {

                    return (
                        <div key={String(blog._id)} className="w-3/5  mb-5 p-4 bg-white rounded shadow-lg flex flex-col justify-between">
                            <p className="text-3xl">{blog.title}</p>
                            <p className="text-xl">{blog.description}</p>
                            <div>
                                <Link href={`/blogs/blog?q=${blog.title}&id=${blog._id}`} className="mr-2"><button className="p-2 bg-purple-600 rounded text-white text-xl">Read more</button></Link>
                                {/* <DeleteBtn  id={String(blog._id)} /> */}
                                <button className="p-2 bg-purple-600 rounded text-white text-xl" onClick={()=>handleDelete(blog._id)}>Delete Blog</button>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}