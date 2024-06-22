"use client";
import { useEffect, useState } from "react";
import AdminNav from "../Component/AdminNav";
import axios from "axios";
import Link from "next/link";
import { hasCookie } from "cookies-next";
import { useRouter } from "next/navigation";

export default function page(){
    const [rec,setRec] = useState([]);
    const Router = useRouter();
    useEffect(()=>{
        if(hasCookie("admin") == false){
            Router.push("/Admin/Index");
        }
        axios.get("http://localhost:3000/api/admin/message").then((req)=>setRec(req.data.result));
    },[])

    return(
        <>
            <AdminNav />
            <div className="container">
                <br/><br/>
                
                    {rec.map((record) => {
                        const link = `/${record.propertycode}.jpg`;
                        const pro = `/Admin/VisitProperty/${record.propertycode}`;
                        return <div className="row topiccard">
                            <div className="col-lg-4" key={record._id} style={{marginBottom:"20px"}}>
                                <img src={link} className="img-fluid"></img>
                            </div>
                            <div className="col-lg-4" key={record._id} style={{marginBottom:"20px"}}>
                                <label><span className="topicname">From Name : </span><span>{record.name}</span></label><br/>
                                <label><span className="topicname">From Email : </span><span>{record.email}</span></label><br/>
                                <label><span className="topicname">From Phone : </span><span>{record.phone}</span></label><br/>
                                <label><span className="topicname">Message : </span><span>{record.message}</span></label><br/> <br/> 
                                <Link href={pro}><button className="btn btn-danger">Visit Property</button></Link>
                            </div>
                            <div className="col-lg-4" style={{marginBottom:"20px"}}>
                                <label><span className="topicname">To Name : </span><span>{record.username}</span></label><br/>
                                <label><span className="topicname">To Phone : </span><span>{record.userphone}</span></label><br/>
                                <label><span className="topicname">To Address : </span><span>{record.useraddress}</span></label><br/>
                                <label><span className="topicname">Property Type  : </span><span>{record.property}</span></label><br/>
                                <label><span className="topicname">Category : </span><span>{record.category}</span></label><br/>
                            </div>
                        </div>
                        }   
                    )}
                
            </div>
            
        </>
    )
}