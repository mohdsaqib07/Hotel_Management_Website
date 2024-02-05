"use client";
import { FC } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type Props = {
  price: number;
  discount: number;
  specialNote: string;
  checkinDate: Date | null;
  setCheckinDate: React.Dispatch<React.SetStateAction<Date | null>>;
  checkoutDate: Date | null;
  setCheckoutDate: React.Dispatch<React.SetStateAction<Date | null>>;
  calcMinCheckoutDate: () => Date | null;
  adults: number;
  children: number;
  setAdults: React.Dispatch<React.SetStateAction<number>>;
  setChildren: React.Dispatch<React.SetStateAction<number>>;
  isBooked: boolean;
  handleBookNow: () => void;
  calcNumberOfDays: () => number;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

const BookRoomCta: FC<Props> = (props) => {
  const {
    price,
    discount,
    specialNote,
    checkinDate,
    setCheckinDate,
    checkoutDate,
    setCheckoutDate,
    calcMinCheckoutDate,
    adults,
    setAdults,
    children,
    setChildren,
    isBooked,
    handleBookNow,
    calcNumberOfDays,
    loading,
    setLoading,
  } = props;

  const discountPrice = price - (price / 100) * discount;
  const buttonText = isBooked ? "Booked" : "Book Now";

  return (
    <div className="px-7 py-6">
      <h3>
        <span
          className={`${
            discount ? "text-gray-400 dark:text-gray-800" : ""
          } font-bold text-xl`}
        >
          &#8377; {price}
        </span>
        {discount ? (
          <span className="font-bold text-xl capitalize">
            {" "}
            | discount {discount}%. Now{" "}
            <span className="text-tertiary-dark dark:text-sky-600">
              &#8377; {discountPrice}
            </span>{" "}
          </span>
        ) : (
          ""
        )}
      </h3>
      <div className="w-full border-b-2 border-b-primary dark:border-b-pink-600 my-2" />
      <h4 className="my-8">{specialNote}</h4>
      <div className="flex">
        <div className="w-1/2 pr-2">
          <label
            htmlFor="check-in-date"
            className="block text-sm font-medium text-gray-900 dark:text-gray-400"
          >
            Check In Date
          </label>
          <DatePicker
            selected={checkinDate}
            onChange={(date) => setCheckinDate(date)}
            dateFormat="dd/MM/yyyy"
            minDate={new Date()}
            id="check-in-date"
            className="w-full mt-2 border text-black border-gray-300 rounded-lg p-2.5 focus:ring-primary focus:border-primary"
          />
        </div>
        <div className="w-1/2 pl-2">
          <label
            htmlFor="check-out-date"
            className="block text-sm font-medium text-gray-900 dark:text-gray-400"
          >
            Check Out Date
          </label>
          <DatePicker
            selected={checkoutDate}
            onChange={(date) => setCheckoutDate(date)}
            dateFormat="dd/MM/yyyy"
            minDate={calcMinCheckoutDate()}
            id="check-out-date"
            className="w-full  border mt-2 text-black border-gray-300 rounded-lg p-2.5 focus:ring-primary focus:border-primary"
            disabled={!checkinDate}
          />
        </div>
      </div>
      <div className="flex mt-4">
        <div className="w-1/2 pr-2">
          <label
            htmlFor="adults"
            className="block text-sm font-medium text-gray-900 dark:text-gray-400"
          >
            Adults
          </label>
          <input
            type="number"
            id="adults"
            value={adults}
            onChange={(e) => setAdults(+e.target.value)}
            min={1}
            max={5}
            className="w-full border border-gray-300 rounded-lg p-2.5 dark:text-black"
          />
        </div>
        <div className="w-1/2 pl-2">
          <label
            htmlFor="children"
            className="block text-sm font-medium text-gray-900 dark:text-gray-400"
          >
            Children
          </label>
          <input
            type="number"
            id="children"
            value={children}
            onChange={(e) => setChildren(+e.target.value)}
            min={0}
            max={3}
            className="w-full border border-gray-300 rounded-lg p-2.5 dark:text-black"
          />
        </div>
      </div>
      {calcNumberOfDays() > 0 ? (
        <p className="mt-3 text-lg font-semibold dark:font-thin">
          TotalPrice:{" "}
          <span className="float-right">
            &#8377; {calcNumberOfDays() * discountPrice}
          </span>
        </p>
      ) : (
        <></>
      )}
      <button
        type="button"
        disabled={isBooked || !checkinDate || !checkoutDate || loading}
        onClick={handleBookNow}
        className={`btn-primary flex justify-center items-center dark:bg-pink-600 dark:!shadow-none font-thin w-full mt-6 disabled:!bg-light disabled:cursor-not-allowed disabled:hover:scale-100`}
      >
        {loading ? (
          <div className="animate-spin rounded-full h-8 w-8  border-t-2 border-b-2 border-[#f5f5f5]" />
        ) : (
          buttonText
        )}
      </button>
    </div>
  );
};

export default BookRoomCta;
