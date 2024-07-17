import { Calendar, Clock, MapPin } from 'lucide-react';
import moment from 'moment/moment';
import React from 'react';
import CancelAppointment from './CancelAppointment';
import GlobalApi from '@/app/_utils/GlobalApi';

function BookingList({ bookingList, expired, updateRecord }) {
  const onDeleteAppointment = (item) => {
    console.log(item);
    GlobalApi.deleteAppointment(item.id).then((response) => {
      console.log(response);
      if (response) {
        toast: "Appointment canceled!";
        updateRecord();
      }
    });
  };
  return (
    <div className="mt-5">
      {bookingList &&
        bookingList.map((item, index) => (
          <div
            key={index}
            className="text-lg border p-4 my-4 flex flex-col gap-2">
            <h2 className="font-bold text-xl flex justify-between items-center mb-2">
              {item.attributes.doctor.data.attributes.Name}
              {!expired && (
                <CancelAppointment
                  onContinueClick={() => onDeleteAppointment(item)}
                />
              )}
            </h2>

            <h2 className=" flex gap-2 items-center text-gray-600">
              <MapPin size={18} />
              {item.attributes.doctor.data.attributes.Address}
            </h2>
            <h2 className="flex gap-2 items-center text-gray-600">
              <Calendar size={18} />
              Appointment on: {moment.utc(item.attributes.Date).format("DD-MM-YYYY")}
            </h2>
            <h2 className="flex gap-2 items-center text-gray-600">
              <Clock size={18} />
              Time: {item.attributes.Time}
            </h2>
          </div>
        ))}
    </div>
  );
}

export default BookingList;
