// components/Footer.js
import Link from "next/link";
import React from "react";
import { BsFillSendFill, BsTelephoneOutbound } from "react-icons/bs";
import { BiMessageDetail } from "react-icons/bi";
const Footer = () => {
  return (
    <footer className="mt-16">
      <div className="container mx-auto px-4">
        <Link
          className="text-tertiary-dark dark:text-sky-600 font-black"
          href="/"
        >
          Hotelzz
        </Link>
        <h4 className="text-[40px] font-semibold py-6">Contact</h4>
        <div className="flex items-center justify-between flex-wrap gap-16">
          {/*this is interaction ui*/}
          <div className="flex-1">
            <p>123 Road</p>
            <div className="flex items-center py-4">
              <BsFillSendFill />
              <p className="ml-2">&copy; 2024 Hotel Management.</p>
            </div>
            <div className="flex items-center">
              <BsTelephoneOutbound />
              <p className="ml-2">+91-7906719540</p>
            </div>
            <div className="flex items-center pt-4">
              <BiMessageDetail />
              <p className="ml-2">Chat With Us!</p>
            </div>
          </div>
          {/*this is commitments*/}
          <div className="flex-1 md:text-right">
            <p className="pb-4">Our Story</p>
            <p className="pb-4">Get in Touch</p>
            <p className="pb-4">Our Privacy Commitments</p>
            <p className="pb-4">Term of Service</p>
            <p>Customer Assistance</p>
          </div>

          {/*this is services*/}
          <div className="flex-1 md:text-right">
            <p className="mb-4">Wellness</p>
            <p className="mb-4">Fitness</p>
            <p className="mb-4">Dining Experiance</p>
            <p className="mb-4">Sports</p>
            <p>Events</p>
          </div>
        </div>
      </div>
      <div className="bg-tertiary-light dark:bg-sky-500 h-10 md:h-[70px] mt-16 w-full relative bottom-0 left-0" />
    </footer>
  );
};

export default Footer;
