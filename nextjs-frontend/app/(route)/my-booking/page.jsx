"use client"
import React, { useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BookingList from './_components/BookingList';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import GlobalApi from '@/app/_utils/GlobalApi';

function MyBooking() {
  const {user} = useKindeBrowserClient()
  const [bookingList, setBookingList] = useState([])

  useEffect(()=>{
    user&&getUserBookingList()
  },[user])
  
  const getUserBookingList = () => {
    GlobalApi.getBookinglist(user?.email).then((response) => {
      console.log(response.data.data);
      setBookingList(response.data.data);
    });
  };

  const filterBooking = (type) => {
    const now = new Date();
    const result = bookingList.filter(item =>{
      const bookingDate = new Date(item.attributes.Date);

      return type === "upcoming" ? bookingDate >= now : bookingDate < now;
  });
    return result
  }
  
  return (
    <div className="p-4 ">
      <h2 className="font-bold text-2xl">My Booking</h2>
      <Tabs defaultValue="account" className="w-full mt-5">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="account">Upcoming</TabsTrigger>
          <TabsTrigger value="password">Expired</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <BookingList
            bookingList={filterBooking("upcoming")}
            updateRecord={() => getUserBookingList()}
            expired={false}
          />
        </TabsContent>
        <TabsContent value="password">
          <BookingList
            bookingList={filterBooking("expired")}
            updateRecord={() => getUserBookingList()}
            expired={true}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default MyBooking;
