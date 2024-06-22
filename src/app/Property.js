"use client";
import Aos from "aos";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Property() {
    const [rec,setRec]=useState([]);
    useEffect(()=>{
        axios.get("http://localhost:3000/api/real/property").then((req)=>setRec(req.data.result));   
        Aos.init({
            duration: 1500,
            once: false,
        })
    },[]);
    return(
        <>
            <div className="container-fluid" style={{background:"#F0F8FF"}}>
            <br/><br/>
            <div className="row" style={{marginTop:"20px"}}>
                   {rec.map((record) => {
                        const view = `/Property/${record.code}`;
                        const link = `${record.code}.jpg`;
                        return <div className="col-lg-3"  data-aos="fade-up" key={record._id}>
                            <div className="topiccard">
                                <label><img src={link} className="img-fluid"></img></label><br/>
                                <label className="topicname">{record.category}</label><br/>
                                <label className="topicname">{record.property} Property</label><br/>
                                <label className="topicname">Property availale for {record.propertyfor}</label><br/>
                                <label className="topicname"> {record.bhk} BHK , Amount {record.amount} {record.amounttype}</label><br/><br/>
                                <Link href={view}  style={{ display: 'flex', justifyContent: 'center',textDecoration:"none" }}><button className="btn btn-danger">View Details</button></Link>
                            </div>
                        </div>
                        }   
                    )}
                </div>
            </div>
        </>
    )
}