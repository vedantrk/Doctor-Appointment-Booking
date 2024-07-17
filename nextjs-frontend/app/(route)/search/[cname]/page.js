"use client";
import DoctorList from "@/app/_components/DoctorList";
import GlobalApi from "@/app/_utils/GlobalApi";
import React, { useEffect, useState } from "react";

function Search({ params }) {
  const [doctorList, setDoctorList] = useState([]);

  const category = decodeURIComponent(params.cname);
  console.log(category)
  useEffect(() => {
    const getDoctors = () => {
      GlobalApi.getDoctorByCategory(category).then(
        (response) => {
          // console.log(response)
          setDoctorList(response.data.data);
        }
      );
    };

    getDoctors();
  }, []);

  return (
    <div className="mt-5 p-2">
      <DoctorList heading={category} doctorList={doctorList}/>
    </div>
  );
}

export default Search;
