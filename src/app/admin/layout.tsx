import type { Metadata } from "next";

import "@/app/globals.css";
import AdminNavBar from "../../../components/adminNavbar";


export const metadata: Metadata = {
    title: "admin | pritamjana.com",
    description: "Personal portfolio of pritamjana | pritamjana.com",
};

export default function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    
    return (
        <html lang="en">
            <body >
                <AdminNavBar />
                {children}</body>
        </html>
    );
}
