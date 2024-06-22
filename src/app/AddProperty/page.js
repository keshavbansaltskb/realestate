"use client"
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Navbar from '../Navbar';
import { hasCookie } from 'cookies-next';

const optionsData = {
  Residencial: ['Residential Apartment', 'Independent/Builder Floor','Independent House/Villa','Residential Land','Studio Apartment','Farm House','Serviced Apartments','Others'],
  Commercial: ['Commercial Shops', 'Commercial Showrooms', 'Commercial Office/Space','Commercial Land','Industrial Lands/Plots','Agricultural/Farm Land','Hotel/Resorts','Guest House/Banquet-Halls','Time Share','Space in Retail Mail','Office in Bussiness Park','Office in IT Park','Ware House','Cold Storage','Factory','Manufacturing','Business Center','Other'],
};

const page= () => {
  const [selectedField1, setSelectedField1] = useState('');
  const [selectedField2, setSelectedField2] = useState('');
  const [area, setArea] = useState('');
  const [unit, setUnit] = useState('');
  const Router = useRouter();
  function next(){
    if(selectedField1=="" || area=="" || selectedField2=="" || unit==""){
        alert("All Field Required"); 
        return;
    }   
    Router.push(`/LoginProperty?property=${selectedField1}&category=${selectedField2}&area=${area}&unit=${unit}`);
  }
  useEffect(()=>{
    if(hasCookie("user") == false){
        Router.push("/");
    }
  },[]);
  return (
    <>
        <Navbar/>
        <div className='container' style={{marginTop:"100px"}}>
            <div className='row' style={{marginTop:"20px"}}>
                
                <label><b>ADD PROPERTY DETAILS</b></label><br/><br/>
                <select value={selectedField1} className='form-control' onChange={(e)=> setSelectedField1(e.target.value)}>
                    <option value="">Select Property type</option>
                    <option value="Residencial">Residential</option>
                    <option value="Commercial">Commercial</option>
                </select>
            </div>
            {selectedField1 && (
                <div className='row' style={{marginTop:"20px"}}>
                
                    <select value={selectedField2} className='form-control' onChange={(e)=> setSelectedField2(e.target.value)}>
                        <option value="">Select {selectedField1} Category</option>
                        {optionsData[selectedField1].map((option, index) => (
                        <option key={index} value={option}>
                            {option}
                        </option>
                        ))}
                    </select>
                    </div>
            )}
            
            <div className='row' style={{marginTop:"20px"}}>
                <input value={area} type="number" placeholder='Enter Area' onChange={(e)=> setArea(e.target.value)} className='form-control'></input>
            </div>
            { area && (
                <div className='row' style={{marginTop:"20px"}}>
                
                    <select value={unit} className='form-control' onChange={(e)=> setUnit(e.target.value)}>
                        <option value="">Area Unit</option>
                        <option value="sq. ft.">sq. ft.</option>
                        <option value="sq. yards">sq. yards</option>
                        <option value="sq. m.">sq. m.</option>
                        <option value="acres">acres</option>
                        <option value="marla">marla</option>
                        <option value="cents">cents</option>
                        <option value="bigha">bigha</option>
                        <option value="kottah">kottah</option>
                    </select>
                        
            </div>
            )}
            <br/>
            <button className='btn btn-primary' onClick={next}>Next</button>
            
        </div>
      
    </>
  );
};

export default page;
