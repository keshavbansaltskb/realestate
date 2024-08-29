"use client";
import { useEffect, useState } from "react";
import AdminNav from "../Component/AdminNav";
import { hasCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import Dashboard from "../Component/Dashboard";

export default function Home() {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        if (hasCookie("admin")) {
            setIsAuthenticated(true);
        } else {
            router.push("/Admin/Index"); 
        }
    }, []);

    if (!isAuthenticated) {
        return null;
    }

    return (
        <>
            <AdminNav />
            <Dashboard />
        </>
    );
}
