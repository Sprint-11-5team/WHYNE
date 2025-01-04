"use client";

import Button from "@/components/common/Button";
import Image from "next/image";
import defaultStar from "../../../../public/icons/star.svg";
import purpleStar from "../../../../public/icons/star_fill.svg";
import { useState } from "react";
import AddReviewModal from "@/components/modal-review/AddReviewModal";
import ReviewProvider from "@/provider/usereviewmodals";

interface RatingDetailsProps {
  id: string;
  ratingData?: {
    avgRating: number;
    reviewCount: number;
    avgRatings: {
      [key: number]: number;
    };
  };
}

export default function RatingDetails({ id, ratingData }: RatingDetailsProps) {
  const [isOpenModal, setIsOpenModal] = useState(false);

  // useEffect와 getRatings 제거 (더 이상 필요 없음)

  return ratingData?.reviewCount ? (
    <div className="desktop:mx-0 tablet:mx-[2rem] mobile:mx-[1.6rem]">
      <div className="">
        <div
          className="flex justify-center
        desktop:flex-col desktop:gap-0
        tablet:flex-row tablet:gap-[8rem]
        mobile:flex-col mobile:gap-0
        "
        >
          <div
            className="flex
          tablet:flex-col tablet:justify-center
          mobile:flex-row mobile:justify-between
          "
          >
            <div
              className="
            flex items-center flex-row 
            desktop:gap-[2rem] desktop:mb-[2rem]
            tablet:gap-[2rem] tablet:mb-[2rem]
            mobile:gap-[1.5rem] mobile:mb-[2.4rem]
            "
            >
              <h2 className="desktop:text-[5.4rem] tablet:text-[5.4rem] mobile:text-[3.6rem] font-extrabold">
                {ratingData.avgRating?.toFixed(1)}
              </h2>

              <div className="flex flex-col gap-[0.5rem]">
                <div className="flex gap-2">
                  {[...Array(5)].map((_, index) => (
                    <div
                      key={index}
                      className="relative desktop:w-[2.4rem] desktop:h-[2.4rem] tablet:w-[2.4rem] tablet:h-[2.4rem] mobile:w-[1.8rem] mobile:h-[1.8rem]"
                    >
                      <Image
                        layout="fill"
                        src={
                          index < Math.round(ratingData.avgRating)
                            ? purpleStar
                            : defaultStar
                        }
                        alt={`별 ${index + 1}`}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  ))}
                </div>

                <p className="text-gray-500 text-[1.4rem]">
                  {ratingData.reviewCount}개의 후기
                </p>
              </div>
            </div>

            <Button
              onClick={() => setIsOpenModal(!isOpenModal)}
              size="small"
              color="primary"
              type="button"
              addClassName="text-[1.6rem] desktop:w-[11.3rem] desktop:h-[4.2rem] tablet:w-[11.3rem] tablet:h-[4.2rem] mobile:w-[10rem] mobile:h-[4rem] font-bold text-center desktop:hidden tablet:block mobile:block"
            >
              리뷰 남기기
            </Button>
          </div>
          <div className="flex flex-col gap-[1.5rem]">
            {[
              { label: "5점", value: ratingData.avgRatings?.[5] || 0 },
              { label: "4점", value: ratingData.avgRatings?.[4] || 0 },
              { label: "3점", value: ratingData.avgRatings?.[3] || 0 },
              { label: "2점", value: ratingData.avgRatings?.[2] || 0 },
              { label: "1점", value: ratingData.avgRatings?.[1] || 0 },
            ].map((ratings, index) => (
              <div
                key={index}
                className="desktop:w-[28rem] tablet:w-[28rem] mobile:w-full flex items-center justify-start"
              >
                <p className="text-center font-medium text-[1.6rem] text-gray-500 desktop:leading-[1.909rem] tablet:leading-[2.6rem] mobile:leading-[2.6rem] mr-[1.5rem] min-w-[2.4rem]">
                  {ratings.label}
                </p>
                <div className="flex h-[1.9rem] justify-center items-center w-full">
                  <div className="desktop:w-[28rem] tablet:w-[28rem] mobile:w-full flex items-center">
                    <div className="relative desktop:w-[24.1rem] tablet:w-[24.1rem] mobile:w-full h-[0.6rem] bg-gray-100 rounded-[5rem] ">
                      <div
                        className="absolute max-w-full h-[0.6rem] bg-primary rounded-[5rem] z-10"
                        style={{
                          width: `${(ratings.value / ratingData.reviewCount) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <Button
          onClick={() => setIsOpenModal(!isOpenModal)}
          size="small"
          color="primary"
          type="button"
          addClassName="mt-[3rem] text-[1.6rem] aspect-[113/42] max-w-[11.3rem] h-[4.2rem] font-semibold text-center desktop:block tablet:hiddne mobile:hidden"
        >
          리뷰 남기기
        </Button>
        {isOpenModal && (
          <ReviewProvider>
            <AddReviewModal
              isOpen={isOpenModal}
              onClick={() => setIsOpenModal(!isOpenModal)}
              wineId={id}
            ></AddReviewModal>
          </ReviewProvider>
        )}
      </div>
    </div>
  ) : null;
}