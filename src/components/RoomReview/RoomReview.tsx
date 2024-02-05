"use client";
import { FC } from "react";
import axios from "axios";
import useSWR from "swr";
import { Review } from "@/models/review";
import { FaStar } from "react-icons/fa";
type Props = {
  roomId: string;
};
const RoomReview: FC<Props> = ({ roomId }) => {
  const fetchRoomReviews = async () => {
    const { data } = await axios.get<Review[]>(`/api/room-review/${roomId}`);
    return data;
  };

  const {
    data: roomReviews,
    error,
    isLoading,
  } = useSWR("/api/room-reviews", fetchRoomReviews);

  if (error) throw new Error("Cannot fetch Reviews");
  if (typeof roomReviews === "undefined" && !isLoading)
    throw new Error("Cannot fetch Reviews");

  return (
    <>
      {roomReviews &&
        roomReviews.map((review) => (
          <div
            key={review._id}
            className="bg-gray-100 dark:bg-light p-4 rounded-lg"
          >
            <div className="font-semibold mb-2 flex">
              <p>{review.user.name}</p>
              <div className="ml-4 flex items-center text-tertiary-light text-lg">
                {Array.from({ length: review.userRating }, (_, i) => i + 1).map(
                  (value) => (
                    <FaStar className={`text-yellow-500`} key={value} />
                  )
                )}
              </div>
            </div>
            <p>{review.text}</p>
          </div>
        ))}
    </>
  );
};

export default RoomReview;
