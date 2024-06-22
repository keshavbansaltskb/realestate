"use client";

import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import AdminNav from '../../Component/AdminNav';

export default function Home() {
    const {id} = useParams();
    const [rec,setRec] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:3000/api/real/property/"+id).then((req)=>setRec(req.data.result));   
    }, []);

    let img = "/"+id+".jpg";
    return (
        <main>
            <AdminNav/>
            <div className="container-fluid" style={{background:"#F0F8FF"}}>
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
                        <div className='col-lg-8'>
                            <label className='propertycat'>{rec.category}</label><br/><br/>
                            <label className='property'>Area : {rec.area} {rec.unit}</label><br/><br/>
                            <label className='property'>Ammount : {rec.amount} {rec.amounttype}</label><br/><br/>
                            <label className='propertycat'>Property availale for {rec.propertyfor}</label><br/><br/>
                            <label className='property'>{rec.bhk} BHK, Availale For Anyone</label><br/><br/>
                            <label className='property'>{rec.city}, {rec.state}, India</label><br/><br/>
                        </div>
                    </div>
                    <div className='row' style={{marginTop:"50px"}}>
                        <label style={{marginLeft:"20px",fontWeight:"Bold"}}>Details About This Property :</label>
                        <label className='description' style={{ whiteSpace: 'pre-line',margin:"10px" }}>{rec.description}</label><br/>
                    </div>                
            </div>
        </main>
    );
}
