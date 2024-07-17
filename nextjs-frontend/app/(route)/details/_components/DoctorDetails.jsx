import { Button } from "@/components/ui/button";
import { GraduationCap, MapPin } from "lucide-react";
import Image from "next/image";
import React from "react";
import BookAppointment from "./BookAppointment";

function DoctorDetails({ doctor }) {
  const socailMediaList = [
    {
      id: 1,
      icon: "/twitter.png",
      url: "",
    },
    {
      id: 1,
      icon: "/facebook.png",
      url: "",
    },
    {
      id: 1,
      icon: "/instagram.png",
      url: "",
    },
    {
      id: 1,
      icon: "/linkedin.png",
      url: "",
    },
  ];
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 border-[1px] border-balck p-3 rounded-lg ">
        {/* Doctor Image */}
        <div className="">
          <Image
            src={doctor.attributes?.Image?.data[0]?.attributes?.url}
            alt={"doctor"}
            width={300}
            height={300}
            className="object-cover h-[300px] rounded-lg w-full sm:w-[450px] md:h-[300px]  "
          />
        </div>
        {/* Doctor info */}
        <div className="col-span-2  flex flex-col gap-3 w-full">
          <h2 className="font-bold text-2xl my-1 ">
            {doctor.attributes?.Name}
          </h2>

          <h2 className="text-md flex gap-2 text-gray-500 mt-1 mt-2">
            <GraduationCap />
            <span>{doctor.attributes?.Years_of_experience} of Experience</span>
          </h2>

          <h2 className="text-md flex mb-1 gap-2 w-full text-gray-500">
            <MapPin />
            <span>{doctor.attributes?.Address}</span>
          </h2>

          <div className="my-1 flex flex-wrap gap-1">
            {doctor.attributes?.categories?.data.map((category, index) => (
              <h3
                key={index}
                className="bg-blue-100 font-bold text-primary px-3 py-1 rounded-full text-[12px]">
                {category.attributes?.Name}
              </h3>
            ))}
          </div>
          <div className="flex gap-3 mt-1">
            {socailMediaList.map((item, index) => (
              <Image
                src={item.icon}
                key={index}
                alt="socialmedia-icon"
                width={35}
                height={30}
                className="cursor-pointer"
              />
            ))}
          </div>
          <BookAppointment doctor={doctor} />
        </div>
      </div>
      {/* About */}
      <div className="mt-5 border-[1px] border-balck p-3 rounded-lg">
        <h2 className="font-bold  text-2xl  my-2">About Me</h2>
        <div className="flex-grow"></div>
        <h2 className="text-gray-600 text-lg mt-2 tracking-wide">
          {doctor.attributes?.About}
        </h2>
      </div>
    </div>
  );
}

export default DoctorDetails;
