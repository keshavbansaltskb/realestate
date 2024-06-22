"use client";
import axios from "axios";
import { useState } from "react";
import {  useRouter } from 'next/navigation';
import { useEffect } from "react";
import { hasCookie, setCookie } from "cookies-next";

export default function Home() {
  const [email,setEmail] = useState();
  const [pass,setPass] = useState();
  const router = useRouter();
  const [msg,setMsg] = useState("");
  useEffect(()=>{
    if(hasCookie("admin") != false){
      router.push("/Admin/Dashboard");
    }  
  },[])
  async function submit(){
    if(!email || !pass){
        setMsg("empty");
        return;
    }
    const response = await axios.post("http://localhost:3000/api/admin/login", { email: email, pass: pass });
    const result = response.data.result;
    setMsg(result);
    const userId = response.data.userId; 
    if (result === "success") {
        setCookie("admin", userId);
        router.push("/Admin/Dashboard");
    } 
    }
  return(
    <main>
        <br/><br/><br/><br/>
        <div className="container">
          <div className="row">
              <div className="col-lg-3"></div>
              <div className="col-lg-7">
                   {
                        msg=="Mismatch"?
                             <div className="alert alert-danger" style={{textAlign:"center"}}>Password Not Currect</div>
                        :msg=="Invalid"?<div className="alert alert-danger" style={{textAlign:"center"}}>Email I'd Not Found</div>:
                        msg=="empty"?<div className="alert alert-danger" style={{textAlign:"center"}}>All Field Required</div>:null
                        

                        
                   }
                  <div className="card">
                      <div className="card-header" style={{textAlign:"center",fontSize:"20px",fontFamily:"serif"}}>Login</div>
                      <div className="card-body">
                          <label>Email :</label>
                          <input type="email" required style={{marginTop:"10px"}} className="form-control" onChange={(e)=>setEmail(e.target.value)} /><br/>
                          <label>Password :</label>
                          <input type="password" required className="form-control" onChange={(e)=>setPass(e.target.value)} /><br/>
                      </div>
                      <div className="card-footer">
                      <input type="submit" value="Login" onClick={()=>submit()} className="btn btn-primary" />
                      </div>
                  </div>
              </div>
              <div className="col-lg-2"></div>
          </div>
        </div>
    </main>
  );
}
