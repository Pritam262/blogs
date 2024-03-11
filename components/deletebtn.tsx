'use client'

type props = {
    id:string
}
export default function DeleteBtn(props: props) {
    const deleteBlog = async (id: string) => {
        const response = await fetch(`http://127.0.0.1:3003/api/blog?id=${id}`, { method: "DELETE" });
        if (response.status === 200) {
            console.log(`Blog deleted ${id}`);
        }
        else{
            console.log(await response.json());
        }
    }
        return (
            <button className="p-2 bg-purple-600 rounded text-white text-xl" onClick={()=>deleteBlog(props?.id)}>Delete Blog</button>
        )
    }
