"use client"
import { useEffect } from "react";
import AdminNav from "../Component/AdminNav";
import { hasCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import Dashboard from "../Component/Dashboard";

export default function Home() {
    const Router = useRouter();
    useEffect(()=>{
        if(hasCookie("admin") == false){
            Router.push("/Admin/Index");
        }
    },[])
    return(
        <>
            <AdminNav />
            <Dashboard />
        </>
    )
}