"use client";
import { useEffect, useState } from "react"
import { useSearchParams } from 'next/navigation'
import axios from "axios";
import { useRouter } from "next/navigation";

export default function page(){
    const Router = useRouter();
    const searchParams = useSearchParams();
    const property = searchParams.get('property');
    const category = searchParams.get('category');
    const area = searchParams.get('area');
    const unit = searchParams.get('unit');
    const [amount,setAmount] = useState('');
    const [amounttype,setAmountType] = useState('');
    const [propertyfor,setPropertyFor] = useState('');
    const [bhk,setBHK] = useState('');
    const [description,setDescription] = useState('');
    const [selectedState, setSelectedState] = useState("");
    const [selectedCity, setSelectedCity] = useState("");
    const statesData = [
        { state: "Andhra Pradesh", cities: ["Anantapur", "Chittoor", "East Godavari", "Guntur", "Krishna", "Kurnool", "Prakasam", "Srikakulam", "Visakhapatnam", "Vizianagaram", "West Godavari", "Y.S.R. Kadapa"] },
        { state: "Arunachal Pradesh", cities: ["Tawang", "West Kameng", "East Kameng", "Papum Pare", "Kurung Kumey", "Kra Daadi", "Lower Subansiri", "Upper Subansiri", "West Siang", "East Siang", "Siang", "Upper Siang", "Lower Siang", "Lower Dibang Valley", "Upper Dibang Valley", "Dibang Valley", "Anjaw", "Lohit", "Namsai", "Changlang", "Tirap", "Longding"] },
        { state: "Assam", cities: ["Baksa", "Barpeta", "Biswanath", "Bongaigaon", "Cachar", "Charaideo", "Chirang", "Darrang", "Dhemaji", "Dhubri", "Dibrugarh", "Dima Hasao", "Goalpara", "Golaghat", "Hailakandi", "Hojai", "Jorhat", "Kamrup", "Kamrup Metropolitan", "Karbi Anglong", "Karimganj", "Kokrajhar", "Lakhimpur", "Majuli", "Morigaon", "Nagaon", "Nalbari", "Sivasagar", "Sonitpur", "South Salmara-Mankachar", "Tinsukia", "Udalguri", "West Karbi Anglong"] },
        { state: "Bihar", cities: ["Araria", "Arwal", "Aurangabad", "Banka", "Begusarai", "Bhagalpur", "Bhojpur", "Buxar", "Darbhanga", "East Champaran", "Gaya", "Gopalganj", "Jamui", "Jehanabad", "Kaimur", "Katihar", "Khagaria", "Kishanganj", "Lakhisarai", "Madhepura", "Madhubani", "Munger", "Muzaffarpur", "Nalanda", "Nawada", "Patna", "Purnia", "Rohtas", "Saharsa", "Samastipur", "Saran", "Sheikhpura", "Sheohar", "Sitamarhi", "Siwan", "Supaul", "Vaishali", "West Champaran"] },
        { state: "Chhattisgarh", cities: ["Balod", "Baloda Bazar", "Balrampur", "Bastar", "Bemetara", "Bijapur", "Bilaspur", "Dantewada", "Dhamtari", "Durg", "Gariaband", "Janjgir-Champa", "Jashpur", "Kabirdham", "Kanker", "Kondagaon", "Korba", "Koriya", "Mahasamund", "Mungeli", "Narayanpur", "Raigarh", "Raipur", "Rajnandgaon", "Sukma", "Surajpur", "Surguja"] },
        { state: "Goa", cities: ["North Goa", "South Goa"] },
        { state: "Gujarat", cities: ["Ahmedabad", "Amreli", "Anand", "Aravalli", "Banaskantha", "Bharuch", "Bhavnagar", "Botad", "Chhota Udaipur", "Dahod", "Dang", "Devbhoomi Dwarka", "Gandhinagar", "Gir Somnath", "Jamnagar", "Junagadh", "Kheda", "Kutch", "Mahisagar", "Mehsana", "Morbi", "Narmada", "Navsari", "Panchmahal", "Patan", "Porbandar", "Rajkot", "Sabarkantha", "Surat", "Surendranagar", "Tapi", "Vadodara", "Valsad"] },
        { state: "Haryana", cities: ["Ambala", "Bhiwani", "Charkhi Dadri", "Faridabad", "Fatehabad", "Gurugram", "Hisar", "Jhajjar", "Jind", "Kaithal", "Karnal", "Kurukshetra", "Mahendragarh", "Nuh", "Palwal", "Panchkula", "Panipat", "Rewari", "Rohtak", "Sirsa", "Sonipat", "Yamunanagar"] },
        { state: "Himachal Pradesh", cities: ["Bilaspur", "Chamba", "Hamirpur", "Kangra", "Kinnaur", "Kullu", "Lahaul and Spiti", "Mandi", "Shimla", "Sirmaur", "Solan", "Una"] },
        { state: "Jharkhand", cities: ["Bokaro", "Chatra", "Deoghar", "Dhanbad", "Dumka", "East Singhbhum", "Garhwa", "Giridih", "Godda", "Gumla", "Hazaribagh", "Jamtara", "Khunti", "Koderma", "Latehar", "Lohardaga", "Pakur", "Palamu", "Ramgarh", "Ranchi", "Sahibganj", "Seraikela Kharsawan", "Simdega", "West Singhbhum"] },
        { state: "Karnataka", cities: ["Bagalkot", "Ballari", "Belagavi", "Bengaluru Rural", "Bengaluru Urban", "Bidar", "Chamarajanagar", "Chikkaballapur", "Chikkamagaluru", "Chitradurga", "Dakshina Kannada", "Davanagere", "Dharwad", "Gadag", "Hassan", "Haveri", "Kalaburagi", "Kodagu", "Kolar", "Koppal", "Mandya", "Mysuru", "Raichur", "Ramanagara", "Shivamogga", "Tumakuru", "Udupi", "Uttara Kannada", "Vijayapura", "Yadgir"] },
        { state: "Kerala", cities: ["Alappuzha", "Ernakulam", "Idukki", "Kannur", "Kasaragod", "Kollam", "Kottayam", "Kozhikode", "Malappuram", "Palakkad", "Pathanamthitta", "Thiruvananthapuram", "Thrissur", "Wayanad"] },
        { state: "Madhya Pradesh", cities: ["Agar Malwa", "Alirajpur", "Anuppur", "Ashoknagar", "Balaghat", "Barwani", "Betul", "Bhind", "Bhopal", "Burhanpur", "Chhatarpur", "Chhindwara", "Damoh", "Datia", "Dewas", "Dhar", "Dindori", "Guna", "Gwalior", "Harda", "Hoshangabad", "Indore", "Jabalpur", "Jhabua", "Katni", "Khandwa", "Khargone", "Mandla", "Mandsaur", "Morena", "Narsinghpur", "Neemuch", "Panna", "Raisen", "Rajgarh", "Ratlam", "Rewa", "Sagar", "Satna", "Sehore", "Seoni", "Shahdol", "Shajapur", "Sheopur", "Shivpuri", "Sidhi", "Singrauli", "Tikamgarh", "Ujjain", "Umaria", "Vidisha"] },
        { state: "Maharashtra", cities: ["Ahmednagar", "Akola", "Amravati", "Aurangabad", "Beed", "Bhandara", "Buldhana", "Chandrapur", "Dhule", "Gadchiroli", "Gondia", "Hingoli", "Jalgaon", "Jalna", "Kolhapur", "Latur", "Mumbai City", "Mumbai Suburban", "Nagpur", "Nanded", "Nandurbar", "Nashik", "Osmanabad", "Palghar", "Parbhani", "Pune", "Raigad", "Ratnagiri", "Sangli", "Satara", "Sindhudurg", "Solapur", "Thane", "Wardha", "Washim", "Yavatmal"] },
        { state: "Manipur", cities: ["Bishnupur", "Chandel", "Churachandpur", "Imphal East", "Imphal West", "Jiribam", "Kakching", "Kamjong", "Kangpokpi", "Noney", "Pherzawl", "Senapati", "Tamenglong", "Tengnoupal", "Thoubal", "Ukhrul"] },
        { state: "Meghalaya", cities: ["East Garo Hills", "East Jaintia Hills", "East Khasi Hills", "North Garo Hills", "Ri Bhoi", "South Garo Hills", "South West Garo Hills", "South West Khasi Hills", "West Garo Hills", "West Jaintia Hills", "West Khasi Hills"] },
        { state: "Mizoram", cities: ["Aizawl", "Champhai", "Kolasib", "Lawngtlai", "Lunglei", "Mamit", "Saiha", "Serchhip"] },
        { state: "Nagaland", cities: ["Dimapur", "Kiphire", "Kohima", "Longleng", "Mokokchung", "Mon", "Peren", "Phek", "Tuensang", "Wokha", "Zunheboto"] },
        { state: "Odisha", cities: ["Angul", "Balangir", "Balasore", "Bargarh", "Bhadrak", "Boudh", "Cuttack", "Deogarh", "Dhenkanal", "Gajapati", "Ganjam", "Jagatsinghpur", "Jajpur", "Jharsuguda", "Kalahandi", "Kandhamal", "Kendrapara", "Kendujhar", "Khordha", "Koraput", "Malkangiri", "Mayurbhanj", "Nabarangpur", "Nayagarh", "Nuapada", "Puri", "Rayagada", "Sambalpur", "Subarnapur", "Sundargarh"] },
        { state: "Punjab", cities: ["Amritsar", "Barnala", "Bathinda", "Faridkot", "Fatehgarh Sahib", "Fazilka", "Ferozepur", "Gurdaspur", "Hoshiarpur", "Jalandhar", "Kapurthala", "Ludhiana", "Mansa", "Moga", "Muktsar", "Pathankot", "Patiala", "Rupnagar", "Sahibzada Ajit Singh Nagar", "Sangrur", "Tarn Taran"] },
        { state: "Rajasthan", cities: ["Ajmer", "Alwar", "Banswara", "Baran", "Barmer", "Bharatpur", "Bhilwara", "Bikaner", "Bundi", "Chittorgarh", "Churu", "Dausa", "Dholpur", "Dungarpur", "Hanumangarh", "Jaipur", "Jaisalmer", "Jalore", "Jhalawar", "Jhunjhunu", "Jodhpur", "Karauli", "Kota", "Nagaur", "Pali", "Pratapgarh", "Rajsamand", "Sawai Madhopur", "Sikar", "Sirohi", "Sri Ganganagar", "Tonk", "Udaipur"] },
        { state: "Sikkim", cities: ["East Sikkim", "North Sikkim", "South Sikkim", "West Sikkim"] },
        { state: "Tamil Nadu", cities: ["Ariyalur", "Chengalpattu", "Chennai", "Coimbatore", "Cuddalore", "Dharmapuri", "Dindigul", "Erode", "Kallakurichi", "Kanchipuram", "Kanyakumari", "Karur", "Krishnagiri", "Madurai", "Nagapattinam", "Namakkal", "Nilgiris", "Perambalur", "Pudukkottai", "Ramanathapuram", "Ranipet", "Salem", "Sivaganga", "Tenkasi", "Thanjavur", "Theni", "Thoothukudi", "Tiruchirappalli", "Tirunelveli", "Tirupathur", "Tiruppur", "Tiruvallur", "Tiruvannamalai", "Tiruvarur", "Vellore", "Viluppuram", "Virudhunagar"] },
        { state: "Telangana", cities: ["Adilabad", "Bhadradri Kothagudem", "Hyderabad", "Jagtial", "Jangaon", "Jayashankar Bhupalpally", "Jogulamba Gadwal", "Kamareddy", "Karimnagar", "Khammam", "Komaram Bheem", "Mahabubabad", "Mahabubnagar", "Mancherial", "Medak", "Medchal–Malkajgiri", "Nagarkurnool", "Nalgonda", "Nirmal", "Nizamabad", "Peddapalli", "Rajanna Sircilla", "Rangareddy", "Sangareddy", "Siddipet", "Suryapet", "Vikarabad", "Wanaparthy", "Warangal Rural", "Warangal Urban", "Yadadri Bhuvanagiri"] },
        { state: "Tripura", cities: ["Dhalai", "Gomati", "Khowai", "North Tripura", "Sepahijala", "South Tripura", "Unakoti", "West Tripura"] },
        { state: "Uttar Pradesh", cities: ["Agra", "Aligarh", "Ambedkar Nagar", "Amethi", "Amroha", "Auraiya", "Azamgarh", "Baghpat", "Bahraich", "Ballia", "Balrampur", "Banda", "Barabanki", "Bareilly", "Basti", "Bhadohi", "Bijnor", "Budaun", "Bulandshahr", "Chandauli", "Chitrakoot", "Deoria", "Etah", "Etawah", "Faizabad", "Farrukhabad", "Fatehpur", "Firozabad", "Gautam Buddh Nagar", "Ghaziabad", "Ghazipur", "Gonda", "Gorakhpur", "Hamirpur", "Hapur", "Hardoi", "Hathras", "Jalaun", "Jaunpur", "Jhansi", "Kannauj", "Kanpur Dehat", "Kanpur Nagar", "Kasganj", "Kaushambi", "Kushinagar", "Lakhimpur Kheri", "Lalitpur", "Lucknow", "Maharajganj", "Mahoba", "Mainpuri", "Mathura", "Mau", "Meerut", "Mirzapur", "Moradabad", "Muzaffarnagar", "Pilibhit", "Pratapgarh", "Prayagraj", "Rae Bareli", "Rampur", "Saharanpur", "Sambhal", "Sant Kabir Nagar", "Shahjahanpur", "Shamli", "Shrawasti", "Siddharthnagar", "Sitapur", "Sonbhadra", "Sultanpur", "Unnao", "Varanasi"] },
        { state: "Uttarakhand", cities: ["Almora", "Bageshwar", "Chamoli", "Champawat", "Dehradun", "Haridwar", "Nainital", "Pauri Garhwal", "Pithoragarh", "Rudraprayag", "Tehri Garhwal", "Udham Singh Nagar", "Uttarkashi"] },
        { state: "West Bengal", cities: ["Alipurduar", "Bankura", "Birbhum", "Cooch Behar", "Dakshin Dinajpur", "Darjeeling", "Hooghly", "Howrah", "Jalpaiguri", "Jhargram", "Kalimpong", "Kolkata", "Malda", "Murshidabad"]},
        { state: "Jammu and Kashmir", cities: ["Jammu", "Srinagar", "Udhampur", "Reasi", "Ramban", "Doda", "Kishtwar", "Poonch", "Rajouri", "Anantnag", "Pulwama", "Kulgam", "Shopian", "Baramulla", "Bandipora", "Kupwara", "Ganderbal"] },
        { state: "Ladakh", cities: ["Leh", "Kargil"] },
    ];
    const handleStateChange = (e) => {
        const state = e.target.value;
        setSelectedState(state);
        setSelectedCity("");
    };
    
    const handleCityChange = (e) => {
    const city = e.target.value;
    setSelectedCity(city);
    };

    const [uploader,setUploaderName] = useState("");
    const [phone,setPhone] = useState("");
    const [address,setAddress] = useState("");
    function next(){
        if(amount=="" || amounttype=="" || propertyfor=="" || description=="" || bhk=="" || selectedState=="" || selectedCity=="" || uploader=="" || phone=="" || address==""){
            alert("All Field Required"); 
            return;
        }   
        const ls = [];
        for (let i = 0; i <= 9; i++) {
            ls.push(i.toString());
        }
        for (let i = 'A'.charCodeAt(0); i <= 'Z'.charCodeAt(0); i++) {
            ls.push(String.fromCharCode(i));
        }
        for (let i = 'a'.charCodeAt(0); i <= 'z'.charCodeAt(0); i++) {
            ls.push(String.fromCharCode(i));
        }
        for (let i = ls.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [ls[i], ls[j]] = [ls[j], ls[i]];
        }
        const code = ls.slice(0,15).join('');  
        axios.post("http://localhost:3000/api/admin/property",{property:property,category:category,area:area,unit:unit,amount:amount,amounttype:amounttype,propertyfor:propertyfor,description:description,bhk:bhk,state:selectedState,city:selectedCity,code:code,uploader:uploader,phone:phone,address:address}).then((res)=>{console.log(res);});
        Router.push(`/Admin/File?code=${code}`);
    }
    return(
        <>
            <div className="container">
                <div className='row' style={{marginTop:"20px"}}>
                    <label><b>PROPERTY DETAILS </b></label><br/><br/>
                </div>
                <div className='row' style={{marginTop:"20px"}}>
                    <input type="number" value={amount} className="form-control" placeholder="Enter Amount" onChange={(e)=> setAmount(e.target.value)}></input>
                </div>
                <div className='row' style={{marginTop:"20px"}}>
                    <select value={amounttype} className='form-control' onChange={(e)=> setAmountType(e.target.value)}>
                        <option value="">Select Amount Type</option>
                        <option value="INR">INR</option>
                        <option value="USD">USD</option>
                    </select>
                </div>
                <div className='row' style={{marginTop:"20px"}}>
                    <select value={propertyfor} className='form-control' onChange={(e)=> setPropertyFor(e.target.value)}>
                        <option value="">Property For</option>
                        <option value="Rent">Rent</option>
                        <option value="Buy">Buy</option>
                        <option value="Sell">Sell</option>
                    </select>
                </div>
                <div className='row' style={{marginTop:"20px"}}>
                    <select value={bhk} className='form-control' onChange={(e)=> setBHK(e.target.value)}>
                        <option value="">BHK</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                    </select>
                </div>
                         
            
                <div className="row" style={{ marginTop: "20px" }}>
                    <select value={selectedState} className="form-control" onChange={handleStateChange}>
                    <option value="">Select State</option>
                    {statesData.map((stateData, index) => (
                        <option key={index} value={stateData.state}>{stateData.state}</option>
                    ))}
                    </select>
                </div>
                <div className="row" style={{ marginTop: "20px" }}>
                    <select value={selectedCity} className="form-control" onChange={handleCityChange} disabled={!selectedState}>
                    <option value="">Select City</option>
                    {selectedState &&
                        statesData.find((stateData) => stateData.state === selectedState)?.cities.map((city, index) => (
                        <option key={index} value={city}>{city}</option>
                        ))}
                    </select>
                </div>
                <div className='row' style={{marginTop:"20px"}}>
                    <textarea rows="5" placeholder="Property Description " value={description} className='form-control' onChange={(e)=> setDescription(e.target.value)}></textarea>
                </div>
                <div className='row' style={{marginTop:"20px"}}>
                    <input value={uploader} type="text" placeholder="Enter Property Uploader Name" className='form-control' onChange={(e)=> setUploaderName(e.target.value)}></input>
                </div>
                <div className='row' style={{marginTop:"20px"}}>
                    <input value={phone} type="number" placeholder="Enter Property Uploader Phone" className='form-control' onChange={(e)=> setPhone(e.target.value)}></input>
                </div>
                <div className='row' style={{marginTop:"20px"}}>
                    <textarea rows="5" placeholder="Enter Property Uploader Address "  value={address} className='form-control' onChange={(e)=> setAddress(e.target.value)}></textarea>
                </div>
                <br/><br/>
                <button className='btn btn-primary' onClick={next}>Next</button>
            </div>
        </>
    )
}