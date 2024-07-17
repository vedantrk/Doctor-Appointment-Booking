import GlobalApi from "@/app/_utils/GlobalApi";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

function DoctorSuggestionList() {
  const [doctorList, setDoctorList] = useState([]);

  useEffect(() => {
    const getDoctorList = () => {
      GlobalApi.getDoctorList().then((response) => {
        console.log(response);
        setDoctorList(response.data.data);
      });
    };

    getDoctorList();
  }, []);
  return (
    <div className="p-2 w-full">
      <div className="">
        <h2 className="font-bold mb-5 text-md">Suggested Doctors</h2>
      </div>
      <Link href={""} className="flex flex-col gap-2 ">
        {doctorList &&
          doctorList.map((doctor, index) => (
            <div key={index} className="flex md:flex-col lg:flex-row border-[1px] shadow-sm hover:border-primary hover:bg-blue-50 p-3 gap-3 w-full">
              <div className="">
                <Image
                  src={doctor.attributes?.Image?.data[0]?.attributes?.url}
                  alt={"doctor"}
                  width={80}
                  height={70}
                  className="object-cover h-[80px] rounded-full w-[120px]"
                />
              </div>
              {/* Doctor info */}
              <div className="flex flex-col gap-1 w-full">
                <div className="my-1 flex flex-wrap gap-1">
                  {doctor.attributes?.categories?.data.map(
                    (category, index) => index<1&&(
                      <h3
                        key={index}
                        className="bg-blue-100 font-bold text-primary text-[10px] px-2 py-1 rounded-full ">
                        {category.attributes?.Name}
                      </h3>
                    )
                  )}
                </div>
                <h2 className="font-bold text-sm ">
                  {doctor.attributes?.Name}
                </h2>

                <h2 className="text-[13px] text-primary text-gray-500">
                  {doctor.attributes?.Years_of_experience}
                </h2>
              </div>
            </div>
          ))}
      </Link>
    </div>
  );
}

export default DoctorSuggestionList;
