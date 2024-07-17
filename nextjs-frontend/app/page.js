"use client"
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Hero from "./_components/Hero";
import CategorySearch from "./_components/CategorySearch";
import DoctorList from "./_components/DoctorList";
import Footer from "./_components/Footer";
import { useEffect, useRef, useState } from "react";
import GlobalApi from "./_utils/GlobalApi";

export default function Home() {
  const [doctorList, setDoctorList] = useState([]);
  
  useEffect(() => {
    const getDoctorList = () => {
      GlobalApi.getDoctorList().then((response) => {
        setDoctorList(response.data.data);
      });
    };

    getDoctorList();
  }, []);

  return (
    <div>
      <Hero />
      <CategorySearch />
      <div>
        <DoctorList doctorList={doctorList} />
      </div>
    </div>
  );
}
