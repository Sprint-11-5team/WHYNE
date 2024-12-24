"use client";

import Button from "@/components/common/Button";
import StarRating from "@/components/common/StarRating";

export default function RatingDetails() {
  return (
    <div className="flex flex-col aspect-[280/311] w-[28rem] gap-[3rem]">
      <div>
        <div className="flex aspect-[218/64]">
          <h2 className="aspect-[86/64] text-[5.4rem] font-extrabold">4.8</h2>
          <div className="flex flex-col">
            <StarRating />
            <p className="aspect-[90/17] text-gray-500 text-[1.4rem]">
              5,446개의 후기
            </p>
          </div>
        </div>
        <div className="flex gap-[1.5rem]">
          <p className="text-[1.6rem] text-gray-500">5점</p>
          프로그레스 바
        </div>
      </div>
      <Button
        size="small"
        color="primary"
        type="button"
        addClassName="text-[1.6rem] aspect-[113/42] max-w-[11.3rem] h-[4.2rem] font-semibold text-center"
      >
        리뷰 남기기
      </Button>
    </div>
  );
}
