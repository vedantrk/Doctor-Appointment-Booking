"use client"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import GlobalApi from '../_utils/GlobalApi';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

function CategorySearch() {
  const [categoryList, setCategoryList] = useState([])
  
  useEffect(() => {
    const getCategoryList = () => {
      GlobalApi.getCategory().then((response) => {
        setCategoryList(response.data.data)
      });
    }; 

    getCategoryList()
  },[])
  
  return (
    <div className="mb-10 flex flex-col items-center gap-2 mx-2 px-2">
      <h2 className="font-bold text-4xl tracking-wide text-center">
        Search <span className="text-primary">Doctors</span>
      </h2>
      <h2 className="text-gray-400 text-xl text-center">
        Find Your Doctor and Book Appointment in one click
      </h2>
      {/* <div className="flex w-full mt-3 max-w-sm items-center space-x-2">
        <Input type="text" placeholder="Search..." />
        <Button type="submit">
          <Search className="h-4 w-4 mr-1" /> Search
        </Button>
      </div> */}

      {/* Display categories list */}
      <div className="my-6">
        <div className="grid gap-5 grid-cols-2 sm:grid-cols-3 xl:grid-cols-8 ">
          {categoryList.length > 0 ? (
            categoryList.map((item, index) => (
              <Link
                href={"/search/" + item.attributes.Name}
                key={index}
                className="flex flex-col gap-2 items-center py-6 px-3 bg-blue-100 rounded-lg hover:scale-110 transition-all ease-in-out cursor-pointer">
                <Image
                  src={item.attributes?.Icon?.data.attributes?.url}
                  alt="icon"
                  width={40}
                  height={50}></Image>
                <label>{item.attributes?.Name}</label>
              </Link>
            ))
          ) : (
              [...Array(8)].map((_, index) => (
                <div
                  key={index}
                  className="h-[125px] w-[125px] rounded-lg bg-slate-200 animate-pulse"></div>
              ))
              
          )}
        </div>
      </div>
    </div>
  );
}

export default CategorySearch;
