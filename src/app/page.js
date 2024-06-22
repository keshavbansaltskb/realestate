"use client";

import Footer from "./Footer";
import Navbar from "./Navbar";
import Property from "./Property";
import Search from "./Search";

export default function Home() {
  return (
    <>

        <Navbar />
        <Search />
        <Property />
        <Footer />
    </>
  );
}
