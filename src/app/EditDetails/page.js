"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import {  useRouter } from 'next/navigation';
import { getCookie, hasCookie } from "cookies-next";
import Link from "next/link";
import Navbar from "../Navbar";
import Footer from "../Footer";

export default function page(){
    const [error,setError] = useState('');
    const [rec,setRec] = useState([]);
    const Router = useRouter();
    useEffect(()=>{
        if(hasCookie("user") == false){
             Router.push("/");
        }
        else{   
            let id = getCookie("user");
            axios.get("http://localhost:3000/api/real/login/"+id).then((res)=>setRec(res.data.result));
        }
    },[])
    async function submit(){    
        if(rec.fname==null || rec.lname==null || rec.phone==null){
            setError("empty");
        }
        else{
           axios.put("http://localhost:3000/api/real/signup",{code:getCookie("user"),fname:rec.fname,lname:rec.lname,phone:rec.phone}).then((res)=>{console.log(res.data.result);});
           setError("update");
        } 
    }
    function change(e){
        setRec({...rec,[e.target.name]:e.target.value});
    }
    return(
        <>
         <Navbar />
         <br/><br/> 
        <div className="container-fluid"  style={{background:"#F0F8FF"}}>
            <br/>
            <div className="row">
            <div className="col-lg-2"></div>
                <div className="col-sm-8">
                    <div className="card">
                        <div className="card-header" style={{textAlign:"center",fontSize:"20px",fontFamily:"serif"}}>Edit Your Profile</div>
                        <div className="card-body">
                            {
                                error=="empty"?<div className="alert alert-danger">All Field Required</div>:
                                error=="update"?<div className="alert alert-success">Record Update</div>:null
                            }
                            <label>First Name :</label>
                            <input type="text" name="fname"className="form-control" value={rec.fname} onChange={change} /><br/>
                            <label>Last Name :</label>
                            <input type="text" name="lname" className="form-control" value={rec.lname} onChange={change} /><br/>
                            <label>Phone :</label>
                            <input type="number" name="phone" className="form-control" value={rec.phone} onChange={change} /><br/> 
                        </div>
                        <div className="card-footer">
                            <input type="submit" value="Submit" onClick={()=>submit()} className="btn btn-primary" /> 
                        </div>
                    </div>
                </div>
                <div className="col-lg-2"></div>
            </div>
            <br/><br/>
        </div>
        
        <Footer />
        </>
    )
}