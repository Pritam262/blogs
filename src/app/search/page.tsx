import { BlogInterface } from "../utils/blogs";
// import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';


export default async function SearchPage({ searchParams }: { searchParams: { query: string; } }) {
// hljs.highlightAll();

    const response = await fetch(`${process.env.SERVER_URL}/api/blog/search?query=${searchParams.query}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        cache: 'no-cache',
    })

    const blog: BlogInterface = await response.json();


    return <div className="sm:w-screen  lg:w-10/12  md:mt-10 mx-auto bg-white vsm:px-1 md:px-1 lg:px-12 pt-12 shadow-md overflow-x-hidden vsm:pb-10">
        {blog.success ? (
            <>
                <div className="w-fit mx-auto">
                    <h1 className="text-3xl ">{blog?.success?.title}</h1>
                </div>
                <p className="text-xl font-light">{blog.success?.description}</p>
                {blog.success?.content && <div className="" dangerouslySetInnerHTML={{ __html: blog.success?.content }} />}
            </>
        ) : <div className="sm:w-screen  lg:w-10/12  md:mt-10 mx-auto bg-white vsm:px-1 md:px-1 lg:px-12 pt-12 shadow-md overflow-x-hidden vsm:pb-10">

            <div className="w-fit mx-auto">
                <h1 className="text-3xl ">Bad Search Query</h1>
            </div>



            {!blog && <p>Loading...</p>}
        </div>}
        {!blog && <p>Loading...</p>}
    </div>
}