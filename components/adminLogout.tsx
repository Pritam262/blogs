'use client'

import { useRouter } from "next/navigation";

interface PropsInterface {
    adminToken: string
};

export default function AdminLogout(props: PropsInterface) {

    const router = useRouter();

    const handleLogout = async () => {
        const response = await fetch('/api/admin/logout', { method: 'POST' });
        if (response.ok) {
           router.push("/admin/login");
        }
    }

    // console.log("ADMIN TOKEN", props.adminToken)
    return <button className="px-2 py-1 border border-black" onClick={() => console.log("LOGOUT")} onClickCapture={handleLogout}>LOGOUT</button>
}