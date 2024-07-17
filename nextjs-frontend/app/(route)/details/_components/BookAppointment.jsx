import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { CalendarDays, Clock } from "lucide-react";
import { DialogClose } from "@radix-ui/react-dialog";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import GlobalApi from "@/app/_utils/GlobalApi";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";


function BookAppointment(doctor) {
  const [date, setDate] = useState(new Date());
  const [timeSlot, setTimeSlot] = useState()
  const [selectedTimeSlot, setSelectedTimeSlot] = useState()
  const [note, setNote] = useState('')
  const {user} = useKindeBrowserClient()
  const saveBooking = () => {
    const data = {
        data:{
            UserName:user.given_name+''+user.family_name,
            Email:user.email,
            Time:selectedTimeSlot,
            Date:date,
            doctor:doctor.doctor.id,
            Note:note
        }
    }

    GlobalApi.bookAppointment(data).then(response=>{
        console.log(response)
        if(response){
          GlobalApi.sendEmail(data).then(response=>{
            console.log(response)
          })
          toast("Appointment Confirmed! Check your mail for more details.")
        }
    })
  }

  useEffect(()=>{
    const getTime = () => {
      const timeList = [];

      for (let i = 10; i <= 12; i++) {
        timeList.push({
          time: i + ":00 AM",
        });
        timeList.push({
          time: i + ":30 AM",
        });
      }
      for (let i = 1; i <= 6; i++) {
        timeList.push({
          time: i + ":00 PM",
        });
        timeList.push({
          time: i + ":30 PM",
        });
      }
      setTimeSlot(timeList);
    };

    getTime()
  },[])

  const isPastDay = (day) => {
    return day<=new Date()
  }
  


  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <Button className="p-2 mt-3 rounded-full ">Book Appointment</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-center">Book Appointment</DialogTitle>
            <DialogDescription>
              <div>
                <div className="grid grid-cols-1 mt-1 md:grid-cols-2 ">
                  {/* Calendar */}
                  <div className="flex flex-col gap-3 items-baseline">
                    <h2 className="flex gap-2 items-center">
                      <CalendarDays className="text-primary h-5 w-5" />
                      Select Date
                    </h2>

                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      disabled={isPastDay}
                      className="rounded-md border"
                    />
                  </div>
                  {/* Time slot */}
                  <div className="mt-2 md:mt-0">
                    <h2 className="flex gap-2 items-center mb-3">
                      <Clock className="text-primary h-5 w-5" />
                      Select Time Slot
                    </h2>
                    <div className="p-4 grid grid-cols-3 gap-2 border-[1px] rounded-lg">
                      {timeSlot?.map((item, index) => (
                        <h2
                          onClick={() => setSelectedTimeSlot(item.time)}
                          className={`p-2 border rounded-full text-center cursor-pointer hover:bg-primary hover:text-white
                            ${
                              item.time === selectedTimeSlot &&
                              "bg-primary text-white"
                            }`}>
                          {item.time}
                        </h2>
                      ))}
                    </div>
                  </div>
                </div>
                <Textarea placeholder="Note" className='my-2' value={note}
                onChange={(e)=>setNote(e.target.value)} />
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <>
                <Button
                  type="button"
                  variant="outline"
                  className="text-red-500 border border-red-500">
                  Close
                </Button>
                <Button
                  onClick={() => saveBooking()}
                  type="button"
                  disabled={!(date && selectedTimeSlot)}
                  className="">
                  Submit
                </Button>
              </>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default BookAppointment;
