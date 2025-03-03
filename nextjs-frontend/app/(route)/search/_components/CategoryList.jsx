"use client"
import React, {useEffect, useState} from 'react';
import GlobalApi from '@/app/_utils/GlobalApi';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';


function CategoryList() {
  const [categoryList, setCategoryList] = useState([]);
  const [cgList, setCgList] = useState([]);
  const [nav, setNav] = useState(false);
  const [loading, setLoading] = useState(true);

  const params = usePathname();
  const category = decodeURIComponent(params.split("/")[2]);
  
    useEffect(() => {
      const getCategoryList = () => {
        GlobalApi.getCategory().then((response) => {
          setCategoryList(response.data.data);
          setLoading(false);
          setCgList(response.data.data); // Initialize cgList with categoryList
        });
      };

      getCategoryList();
    }, []);

    const handleSearch = (event) => {
      const searchTerm = event.target.value.toLowerCase();

      const filteredList = searchTerm
        ? categoryList.filter((item) =>
            item.attributes.Name.toLowerCase().includes(searchTerm)
          )
        : categoryList
      setCgList(filteredList); // Update cgList instead of categoryList
    };

  return (
    <div>
      <div className=" flex  md:hidden">
        <Image
          onClick={() => setNav(!nav)}
          src={"/category.png"}
          alt="list-icon"
          width={50}
          height={40}
          className="ml-4 mt-2 p-2 hover:cursor-pointer"
        />
        <div
          className={
            nav
              ? "fixed left-0 w-[300px] bg-white h-screen z-10 duration-300"
              : "fixed left-[-100%] w-full h-screen bg-white z-10 duration-300"
          }>
          <div className="m-2 mx-4 p-2">
            <Image
              src={"/close.png"}
              alt="close-icon"
              width={25}
              height={25}
              className="cursor-pointer "
              onClick={() => setNav(!nav)}
            />
          </div>
          <div className="m-4 p-2">
            <input
              type="text"
              placeholder="Search Category..."
              onChange={handleSearch}
              className="w-full p-2 border border-gray-300 rounded-md  mb-4"
            />

            <div className="bg-white rounded-lg ">
              {loading ? (
                <div>
                  <p className="text-gray-500 animate-pulse font-bold">
                    Loading...
                  </p>
                  <div className="flex flex-col gap-3 w-full items-center my-3  p-2 rounded-md">
                    {[...Array(8)].map((_, index) => (
                      <div
                        key={index}
                        className="rounded-md bg-slate-200 animate-pulse h-[40px] w-full"></div>
                    ))}
                  </div>
                </div>
              ) : cgList.length === 0 ? (
                <div>
                  <p className="text-gray-500 font-bold">No results found.</p>
                </div>
              ) : (
                <div>
                  <h3 className="font-semibold mb-2">Suggestions</h3>
                  {cgList.map((item, index) => (
                    <Link
                      onClick={() => setNav(!nav)}
                      key={index}
                      href={`/search/${item.attributes.Name}`}
                      className={`flex gap-2 w-full items-center my-3  p-2 rounded-md hover:bg-gray-200 ${
                        category === item.attributes.Name && "bg-blue-200 "
                      }`}>
                      <Image
                        src={item.attributes?.Icon?.data.attributes?.url}
                        width={25}
                        height={25}
                        alt="icon"
                        className="rounded-full"
                      />
                      <h3 className="text-sm font-bold cursor-pointer">
                        {item.attributes.Name}
                      </h3>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="h-screen w-full flex-col mt-5 p-4 hidden md:flex">
        <input
          type="text"
          placeholder="Type a command or search..."
          onChange={handleSearch}
          className="w-full p-2 border border-gray-300 rounded-md  mb-4"
        />
        <div className="bg-white rounded-lg ">
          {cgList.length === 0 ? (
            <div>
              <p className="text-gray-500 animate-pulse font-bold">
                Loading...
              </p>
              <div className="flex flex-col gap-3 w-full items-center my-3  p-2 rounded-md">
                {[...Array(8)].map((_, index) => (
                  <div
                    key={index}
                    className="rounded-md bg-slate-200 animate-pulse h-[40px] w-full"></div>
                ))}{" "}
              </div>
            </div>
          ) : (
            <div>
              <h3 className="font-semibold mb-2">Suggestions</h3>
              {cgList.map((item, index) => (
                <Link
                  key={index}
                  href={`/search/${item.attributes.Name}`}
                  className={`flex gap-2 w-full items-center my-3  p-2 rounded-md hover:bg-gray-200 ${
                    category === item.attributes.Name && "bg-blue-200 "
                  }`}>
                  <Image
                    src={item.attributes?.Icon?.data.attributes?.url}
                    width={25}
                    height={25}
                    alt="icon"
                    className="rounded-full"
                  />
                  <h3 className="text-sm font-bold cursor-pointer">
                    {item.attributes.Name}
                  </h3>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CategoryList;
//  <div className="flex flex-col gap-3 w-full items-center my-3  p-2 rounded-md">
//                     {[...Array(8)].map((_, index) => (
//                       <div
//                         key={index}
//                         className="rounded-md bg-slate-200 animate-pulse h-[40px] w-full"></div>
//                     ))}
//                   </div>