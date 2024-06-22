"use client";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Footer from '@/app/Footer';
import Navbar from '@/app/Navbar';
import Aos from 'aos';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getCookie, hasCookie } from 'cookies-next';

export default function Home() {
    const {id} = useParams();
    const [rec,setRec] = useState([]);
    const Router = useRouter();
    const [message,setMessage] = useState("");
    const [msg,setMsg] = useState("");
    useEffect(() => {
        axios.get("http://localhost:3000/api/real/property/"+id).then((req)=>setRec(req.data.result));  
        Aos.init({
            duration: 1500,
            once: false,
        })   
    }, []);

    function sendmessage(){
        if(message==""){
            setMsg("empty");
            return;
        }
        if(hasCookie("user")){
            const code =  getCookie("user");
            axios.post("http://localhost:3000/api/real/msg", { message: message, email:code,property:rec.property,category:rec.category,area:rec.area,amount:rec.amount,city:rec.city,state:rec.state,propertyfor:rec.propertyfor,code:rec.code}).then((res)=>console.log(res.data.result));
            setMsg("send");
            setMessage("");
        }
        else{
            Router.push("/Login");
        }
    }

    const change = (e) => {
        const inputMessage = e.target.value;
        setMsg("");
        setMessage(inputMessage);
    };
    let img = "/"+id+".jpg";
    return (
        <main>
            <Navbar />
            <div className="container-fluid" style={{background:"#F0F8FF"}}>
                <br/><br/><br/>
                    <div className='row'>
                        <div className='col-lg-4'>
                            <Carousel showArrows={true} showThumbs={false} dynamicHeight={true} autoPlay={true} interval={2000} stopOnHover={true} infiniteLoop={true}>
                                {[1, 2, 3, 4].map((index) => (
                                    <div key={index}>
                                        <img src={img} alt={`Slide ${index}`} className='img-fluid' />
                                    </div>
                                ))}
                            </Carousel>
                        </div>
                        <div className='col-lg-4'>
                            <label className='propertycat'>{rec.category}</label><br/><br/>
                            <label className='property'>Area : {rec.area} {rec.unit}</label><br/><br/>
                            <label className='property'>Ammount : {rec.amount} {rec.amounttype}</label><br/><br/>
                            <label className='propertycat'>Property availale for {rec.propertyfor}</label><br/><br/>
                            <label className='property'>{rec.bhk} BHK, Availale For Anyone</label><br/><br/>
                            <label className='property'>{rec.city}, {rec.state}, India</label><br/><br/>
                        </div>
                        <div className='col-lg-4'>
                            {
                                msg=="send"?<div className='alert alert-success'>Message Sent</div>:
                                msg=="empty"?<div className='alert alert-danger'>Message Can't Be Empty.</div>:null
                            }
                            <textarea rows="5" value={message} placeholder='Send Message To Property Dealer' onChange={change} className='form-control'></textarea>
                            <br/><button className='btn btn-danger' onClick={sendmessage}>Send Message</button>
                        </div>
                        
                    </div>
                    <div className='row' style={{marginTop:"50px"}}>
                            <label style={{marginLeft:"20px",fontWeight:"Bold"}}>Details About This Property :</label>
                            <label className='description' style={{ whiteSpace: 'pre-line',margin:"10px" }}>
                                {rec.description}
                                </label><br/>
                    </div>                
            </div>
            <Footer />
        </main>
    );
}
