"use client";
import useSWR from "swr";
import { useState } from "react";
import { getUserBookings } from "@/lib/apis";
import axios from "axios";
import { User } from "@/models/user";
import Image from "next/image";
import LoadingSpinner from "../../loading";
import { FaSignOutAlt } from "react-icons/fa";
import { BsJournalBookmarkFill } from "react-icons/bs";
import { GiMoneyStack } from "react-icons/gi";
import { signOut } from "next-auth/react";
import Table from "@/components/Table/Table";
import Chart from "@/components/Chart/Chart";
import RatingModal from "@/components/RatingModal/RatingModal";
import BackDrop from "@/components/BackDrop/BackDrop";
import toast from "react-hot-toast";

const UserDetails = ({ params }: { params: { id: string } }) => {
  const { id: userId } = params;

  const [currentNav, setCurrentNav] = useState<
    "bookings" | "amount" | "ratings"
  >("bookings");
  const [roomId, setRoomId] = useState<string | null>(null);
  const [isRatingVisible, setIsRatingVisible] = useState(false);
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const [ratingValue, setRatingValue] = useState<number | null>(0);
  const [ratingText, setRatingText] = useState("");

  const toggleRatingModal = () => setIsRatingVisible((prevState) => !prevState);

  const reviewSubmitHandler = async () => {
    if (!ratingText.trim().length || !ratingValue)
      return toast.error(
        "Please provide some rating and a review to continue !"
      );
    if (!roomId) return toast.error("Something Went Wrong ! Please Try Again");
    try {
      setIsSubmittingReview(true);
      const { data } = await axios.post("/api/users", {
        roomId,
        ratingValue,
        reviewText: ratingText,
      });
      console.log(data);
      toast.success("Review Submitted");
    } catch (err: any) {
      console.log("Review Error : ", err.message);
      toast.error("Review Failed");
    } finally {
      setRatingText("");
      setRatingValue(0);
      setRoomId(null);
      setIsSubmittingReview(false);
      toggleRatingModal();
    }
  };

  const fetchUserBooking = async () => getUserBookings(userId);
  const fetchUserData = async () => {
    const { data } = await axios.get<User>("/api/users");
    return data;
  };

  const {
    data: userBookings,
    error,
    isLoading,
  } = useSWR("/api/userBooking", fetchUserBooking);
  const {
    data: userData,
    isLoading: loadingUserData,
    error: errorGettingUserData,
  } = useSWR("/api/users", fetchUserData);

  if (error || errorGettingUserData) throw new Error("Cannot fetch data");

  if (typeof userBookings === "undefined" && !isLoading) {
    throw new Error("Cannot fetch UserBookings");
  }

  if (typeof userData === "undefined" && !loadingUserData) {
    throw new Error("Cannot fetch UserData");
  }

  if (loadingUserData) return <LoadingSpinner />;
  if (!userData) throw new Error("Cannot fetch UserData");
  if (!userBookings) throw new Error("Cannot fetch UserData");

  return (
    <div className="container mx-auto px-2 md:px-4 py-10">
      <div className="grid md:grid-cols-12 gap-10">
        <div className="hidden md:block md:col-span-4 lg:col-span-3  h-fit sticky top-10 bg-slate-100 dark:bg-light dark:shadow-sm dark:shadow-light-shadow text-[#1E1E1E] dark:text-[#f5f5f5] rounded-lg px-6 py-4">
          <div className="md:w-[143px] w-28 h-28 md:h-[143px] mx-auto mb-5 rounded-full overflow-hidden">
            <Image
              src={userData.image}
              alt={userData.name}
              width={143}
              height={143}
              className="img scale-animation rounded-full"
            />
          </div>
          <div className="font-normal py-4 text-left">
            <h6 className="text-xl font-bold pb-3">About</h6>
            <p className="text-sm">{userData.about ?? ""}</p>
          </div>
          <div className="font-normal text-left">
            <h6 className="text-xl font-bold pb-3">{userData.name}</h6>
          </div>
          <div className="flex items-center">
            <p className="mr-2">Sign Out</p>

            <FaSignOutAlt
              className="cursor-pointer text-2xl text-pink-600 hover:scale-110 duration-300 transition-all"
              onClick={() => signOut({ callbackUrl: "/" })}
            />
          </div>
        </div>
        <div className="md:col-span-8 lg:col-span-9">
          <div className="flex items-center">
            <h5 className="text-2xl font-bold mr-3">Hello, {userData.name}</h5>
          </div>
          <div className="md:hidden mt-1.5 w-14 h-14 rounded-full overflow-hidden">
            <Image
              className="img scale-animation rounded-full"
              width={56}
              height={56}
              src={userData.image}
              alt="User Name"
            />
          </div>
          <p className="block w-fit md:hidden text-sm py-2">
            {userData.about ?? ""}
          </p>
          <p className="text-sm py-2 font-medium">
            Joined At{" "}
            {new Date(userData._createdAt.split("T")[0]).toDateString()}
          </p>
          <div className="md:hidden flex items-center my-2">
            <p className="mr-2">Sign out</p>
            <FaSignOutAlt
              className="cursor-pointer text-lg text-pink-600 hover:scale-110 duration-300 transition-all"
              onClick={() => signOut({ callbackUrl: "/" })}
            />
          </div>
          <nav className="sticky top-0 px-2 w-fit mr-auto sm:mx-auto md:w-full md:px-5 py-3 mb-8 text-gray-700 border border-[lightgray] rounded-lg bg-gray-50 mt-7">
            <ol
              className={`${
                currentNav === "bookings" ? "text-blue-600" : "text-gray-700"
              } inline-flex mr-1 md:mr-5 items-center space-x-1 md:space-x-3`}
            >
              <li
                className="inline-flex items-center cursor-pointer"
                onClick={() => setCurrentNav("bookings")}
              >
                <BsJournalBookmarkFill />
                <a className="inline-flex items-center mx-1 md:mx-3 text-xs md:text-sm font-medium">
                  Current Bookings
                </a>
              </li>
            </ol>
            <ol
              className={`${
                currentNav === "amount" ? "text-blue-600" : "text-gray-700"
              } inline-flex mr-1 md:mr-5 items-center space-x-1 md:space-x-3`}
            >
              <li
                className="inline-flex items-center cursor-pointer"
                onClick={() => setCurrentNav("amount")}
              >
                <GiMoneyStack />
                <a className="inline-flex items-center mx-1 md:mx-3 text-xs md:text-sm font-medium">
                  Amount Spent
                </a>
              </li>
            </ol>
          </nav>
          {currentNav === "bookings" ? (
            userBookings && (
              <Table
                bookingDetails={userBookings}
                setRoomId={setRoomId}
                toggleRatingModal={toggleRatingModal}
              />
            )
          ) : (
            <></>
          )}

          {currentNav === "amount" ? (
            userBookings && <Chart userBookings={userBookings} />
          ) : (
            <></>
          )}
        </div>
      </div>

      <RatingModal
        isOpen={isRatingVisible}
        ratingValue={ratingValue}
        setRatingValue={setRatingValue}
        ratingText={ratingText}
        setRatingText={setRatingText}
        reviewSubmitHandler={reviewSubmitHandler}
        isSubmittingReview={isSubmittingReview}
        toggleRatingModal={toggleRatingModal}
      />
      <BackDrop isOpen={isRatingVisible} setIsOpen={setIsRatingVisible} />
    </div>
  );
};

export default UserDetails;
