

import { cookies } from "next/headers";
import AdminLogout from "./adminLogout";
import Link from "next/link";

export default function AdminNavBar() {

    const cookie = cookies();

    return <div className="w-full h-14 bg-slate-500 sticky top-0 flex items-center justify-between px-5">
        <div>
            LOGO
        </div>

        <div>
            {cookie.get('admintoken')?.value ? <><Link href="/admin/postblog"> <button className="px-2 py-1 border border-black">POST BLOG</button> </Link> <AdminLogout adminToken={String(cookie.get('admintoken')?.value)} /> </>: <Link href="/admin/login"> <button className="px-2 py-1 border border-black">LOGIN</button> </Link>}
        </div>
    </div>
}