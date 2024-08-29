"use client";
import Aos from "aos";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import './styles.css'; 

export default function Property() {
    const [rec, setRec] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        fetchProperties(page);
        Aos.init({
            duration: 1500,
            once: false,
        });
    }, [page]);

    const fetchProperties = async (page) => {
        const response = await axios.get(`http://localhost:3000/api/real/property?page=${page}`);
        setRec((prevRec) => [...prevRec, ...response.data.result]);
        setHasMore(response.data.hasMore);
    };

    const loadMore = () => {
        setPage(page + 1);
    };

    return (
        <>
            <div className="container-fluid" style={{ background: "#F0F8FF" }}>
                <br /><br />
                <div className="row" style={{ marginTop: "20px" }}>
                    {rec.map((record) => {
                        const view = `/Property/${record.code}`;
                        const link = `${record.code}.jpg`;
                        return (
                            <div className="col-lg-3" data-aos="fade-up" key={record._id}>
                                <div className="topiccard">
                                    <label><img src={link} className="img-fluid" /></label><br />
                                    <label className="topicname">{record.category}</label><br />
                                    <label className="topicname">{record.property} Property</label><br />
                                    <label className="topicname">Property available for {record.propertyfor}</label><br />
                                    <label className="topicname"> {record.bhk} BHK, Amount {record.amount} {record.amounttype}</label><br /><br />
                                    <Link href={view} style={{ display: 'flex', justifyContent: 'center', textDecoration: "none" }}>
                                        <button className="btn btn-danger">View Details</button>
                                    </Link>
                                </div>
                            </div>
                        );
                    })}
                </div>
                {hasMore && (
                    <div className="text-center">
                        <button className="load-more-button" onClick={loadMore} style={{ marginBottom: "20px" }}>
                            Load More
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}
