"use client"
import { deleteCookie} from "cookies-next";
import { useRouter } from "next/navigation";
import { useEffect } from "react"

export default function Logout(){
    const Router = useRouter();
    useEffect(()=>{
        deleteCookie("user");
        Router.push("/");
    },[]) 
}