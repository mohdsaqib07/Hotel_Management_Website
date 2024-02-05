import { BsStarFill } from "react-icons/bs";
import { FC } from "react";

type RatingModalProps = {
  isOpen: boolean;
  ratingValue: number | null;
  setRatingValue: React.Dispatch<React.SetStateAction<number | null>>;
  ratingText: string;
  setRatingText: React.Dispatch<React.SetStateAction<string>>;
  reviewSubmitHandler: () => Promise<string | undefined>;
  isSubmittingReview: boolean;
  toggleRatingModal: () => void;
};

const RatingModal: FC<RatingModalProps> = ({
  isOpen,
  ratingValue,
  setRatingValue,
  ratingText,
  setRatingText,
  reviewSubmitHandler,
  isSubmittingReview,
  toggleRatingModal,
}) => {
  const starValues = [1, 2, 3, 4, 5];

  return (
    <div
      className={`fixed z-[61] inset-0 flex items-center justify-center ${
        isOpen
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="bg-white w-96 p-4 rounded-lg shadow-lg">
        <h2 className="text-xl text-gray-800 font-semibold mb-2">
          Rate Your Experience
        </h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Rating
          </label>
          <div className="flex items-center">
            {starValues.map((value) => (
              <button
                className={`w-6 h-6 text-black ${
                  ratingValue === value ? "text-yellow-500" : "text-gray-300"
                }`}
                onClick={() => setRatingValue(value)}
                key={value}
              >
                <BsStarFill />
              </button>
            ))}
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Review Text
          </label>
          <textarea
            rows={4}
            value={ratingText}
            onChange={(e) => setRatingText(e.target.value)}
            className="w-full px-2 py-3 border mt-2 text-black rounded-md focus:outline-none ring-primary dark:ring-blue-500 focus:ring"
          ></textarea>
        </div>
        <div className="flex justify-end">
          <button
            className="px-4 py-2 bg-primary dark:bg-pink-600 text-[#f5f5f5] rounded-md"
            onClick={reviewSubmitHandler}
            disabled={isSubmittingReview}
          >
            {isSubmittingReview ? "Submitting..." : "Submit"}
          </button>
          <button
            className="ml-2 px-4 py-2 bg-slate-300 text-[#1E1E1E] rounded-md hover:bg-slate-200"
            onClick={() => toggleRatingModal()}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default RatingModal;
