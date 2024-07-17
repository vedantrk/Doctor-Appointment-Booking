"use client"
import GlobalApi from '@/app/_utils/GlobalApi';
import React, { useEffect, useState } from 'react';
import DoctorDetails from '../_components/DoctorDetails';
import DoctorSuggestionList from '../_components/DoctorSuggestionList';

function Details({params}) {
  const [doctor, setDoctor] = useState([]);

  useEffect(()=>{

    const getDoctorById = ()=> {
      GlobalApi.getDoctorById(params.record_Id).then((response)=>
      setDoctor(response.data.data)
      )}

      getDoctorById();
    },[])

  return (
    <div className="px-2 md:px-10 mt-5">
      <h2 className="font-bold text-2xl">Details</h2>
      <div className="mt-5 grid grid-cols-1 md:grid-cols-4 gap-2">
        <div className=" col-span-3">
          {doctor && <DoctorDetails doctor={doctor} />}
        </div>
        <div className='p-2 border-[1px] '><DoctorSuggestionList/></div>
      </div>
    </div>
  );
}

export default Details;
