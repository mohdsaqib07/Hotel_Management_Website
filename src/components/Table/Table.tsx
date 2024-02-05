"use client";

import { FC } from "react";
import { Booking } from "@/models/booking";
import { useRouter } from "next/navigation";

type Props = {
  bookingDetails: Booking[];
  setRoomId: React.Dispatch<React.SetStateAction<string | null>>;
  toggleRatingModal: () => void;
};
const Table: FC<Props> = ({ bookingDetails, setRoomId, toggleRatingModal }) => {
  const router = useRouter();
  return (
    <div className="overflow-x-scroll sm:overflow-x-auto max-w-[384px] rounded-lg mx-auto md:max-w-full shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-[#1E1E1E] uppercase bg-gray-50">
          <tr>
            <th className="px-6 py-3 whitespace-nowrap">Room Name</th>
            <th className="px-6 py-3 whitespace-nowrap">Unit Price</th>
            <th className="px-6 py-3 whitespace-nowrap">Price</th>
            <th className="px-6 py-3 whitespace-nowrap">Dicount</th>
            <th className="px-6 py-3 whitespace-nowrap">No. Days Booked</th>
            <th className="px-6 py-3 whitespace-nowrap">Days Left</th>
            <th className="px-6 py-3 whitespace-nowrap"></th>
          </tr>
        </thead>
        <tbody>
          {bookingDetails.length !== 0 ? (
            bookingDetails.map((booking) => (
              <tr
                key={booking._id}
                className="bg-[#f5f5f5] border-b hover:bg-gray-100"
              >
                <th
                  onClick={() =>
                    router.push(`/rooms/${booking.hotelRoom.slug.current}`)
                  }
                  className="px-6 underline text-blue-600 cursor-pointer py-4 font-medium whitespace-nowrap"
                >
                  {booking.hotelRoom.name}
                </th>
                <td className="px-6 py-4">{booking.hotelRoom.price}</td>
                <td className="px-6 py-4">{booking.totalPrice}</td>
                <td className="px-6 py-4">{booking.discount}%</td>
                <td className="px-6 py-4">{booking.numberOfDays}</td>
                <td className="px-6 py-4">0</td>
                <td className="px-6 py-4">
                  <button
                    className="font-medium text-blue-600 hover:underline"
                    onClick={() => {
                      setRoomId(booking.hotelRoom._id);
                      toggleRatingModal();
                    }}
                  >
                    Rate
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr className="bg-[#f5f5f5] border-b hover:bg-gray-100">
              <th
                onClick={() => router.push(`/rooms/delux-suite`)}
                className="px-6 underline text-blue-600 cursor-pointer py-4 font-medium whitespace-nowrap"
              >
                Deluxe Suite
              </th>
              <td className="px-6 py-4">5100</td>
              <td className="px-6 py-4">11200</td>
              <td className="px-6 py-4">8%</td>
              <td className="px-6 py-4">2</td>
              <td className="px-6 py-4">1</td>
              <td className="px-6 py-4 ">
                <button
                  className="text-blue-600 font-medium hover:underline"
                  onClick={() => {
                    setRoomId(`8f8593f4-5a21-4a53-a8bc-8cfc4e82ab39`);
                    toggleRatingModal();
                  }}
                >
                  Rate
                </button>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
