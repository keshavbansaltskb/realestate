"use client"
import axios from "axios";
import { hasCookie } from "cookies-next";
import { useParams, useRouter } from "next/navigation"
import { useEffect} from "react";

export default function page(){
    const {id} = useParams();
    const Router = useRouter();
    useEffect(()=>{
        if(hasCookie("admin") == false){
            Router.push("/Admin/Index");
        }
        axios.delete("http://localhost:3000/api/admin/property/"+id);
        Router.push(`/Admin/AllProperty?delete=1`);
    },[])
    return(
        <>
           
        </>
    )
}