"use client";
import React, { useEffect, useState } from "react";
import GlobalApi from "../_utils/GlobalApi";
import Image from "next/image";
import Link from "next/link";

function DoctorList({doctorList, heading='Popular Doctors'}) {
  
  return (
    <div>
      <div className="mb-5 px-4">
        <h2 className="font-bold text-2xl">{heading}</h2>
      </div>
      <div>
        <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-6  xl:grid-cols-4 mx-2 px-2 ">
          {
            doctorList.length > 0 ? (
              doctorList.map((item, index) => (
                <div
                  key={index}
                  className="border-[1px] hover:border-primary shadow-sm rounded-lg p-3 flex flex-col gap-1 align-center w-full">
                  <Image
                    src={item.attributes.Image.data[0].attributes.url}
                    alt={"doctor"}
                    width={400}
                    height={150}
                    className="object-cover h-[300px] rounded-lg w-full"
                  />

                  <div className=" ">
                    <div className="my-1 flex flex-wrap gap-1">
                      {item.attributes?.categories?.data.map(
                        (category, index) => (
                          <h3
                            key={index}
                            className="bg-blue-100 font-bold text-primary px-3 py-1 rounded-full text-[12px]">
                            {category.attributes?.Name}
                          </h3>
                        )
                      )}
                    </div>
                  </div>
                  <h2 key={index} className=" text-lg font-bold">
                    {item.attributes?.Name}
                  </h2>
                  <h3 className="text-sm text-primary">
                    {item.attributes?.Years_of_experience}
                  </h3>
                  <h4 className="text-sm text-gray-600">
                    {item.attributes?.Address}
                  </h4>
                  <div className="flex-grow"></div>
                  <Link href={"/details/" + item?.id}>
                    <button className="w-full text-sm border-2 border-primary mb-1 p-2 rounded-full text-primary hover:bg-primary hover:text-white cursor-pointer ">
                      Book Appointment
                    </button>
                  </Link>
                </div>
              ))
            ) : (
              // Skeleton effect
              <div className="flex flex-col gap-3 items-center py-6 px-3 rounded-lg transition-all animate-pulse border-[1px]">
                <div className="h-[300px] w-full rounded-lg bg-slate-200 animate-pulse"></div>
                <div className="h-[25px] w-full rounded-sm bg-slate-200 animate-pulse"></div>
                <div className="h-[25px] w-full rounded-sm bg-slate-200 animate-pulse"></div>
                <div className="h-[25px] w-full rounded-sm bg-slate-200 animate-pulse"></div>
              </div>
            )
          }
        </div>
      </div>
    </div>
  );
}

export default DoctorList;
