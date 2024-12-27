"use client";

import { useEffect, useState } from "react";
import MyReviewCard, { Review } from "./my-review-card";
import MyWineCard, { Wine } from "./my-wine-card";
import "@/../public/images/placeholder1.png";
import instance from "@/api/api";
import InfiniteScroll from "../InfiniteScroll/infiniteScroll";

export default function ProfileTab() {
  const [activeTab, setActiveTab] = useState<"reviews" | "wines">("reviews");
  const [reviews, setReviews] = useState<Review[]>([]);
  const [wines, setWines] = useState<Wine[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [hasMore, setHasMore] = useState(true); // 더 많은 데이터가 있는지 여부
  const [cursor, setCursor] = useState<number | null>(null); // 커서 상태 추가

  const limit = 20;

  // 리뷰 데이터 로드
  async function fetchReviews(cursor: number | null) {
    console.log("Fetching reviews with cursor:", cursor); // 커서 값 콘솔 출력
    try {
      setIsLoading(true);
      const response = await instance.get("/users/me/reviews", {
        params: { limit, cursor },
      });

      const { list, totalCount, nextCursor } = response.data; // nextCursor를 받음

      console.log("Reviews data:", list); // 콘솔 로그 추가
      console.log("Total reviews count:", totalCount); // 콘솔 로그 추가

      setReviews((prev) => [...prev, ...list]);
      setTotalCount(totalCount);
      setCursor(nextCursor); // 새로운 커서 저장

      if (!nextCursor) {
        setHasMore(false); // 더 이상 데이터가 없다면 hasMore를 false로 설정
      }
    } catch (error) {
      console.error("리뷰 데이터 불러오기 실패", error);
    } finally {
      setIsLoading(false);
    }
  }

  // 와인 데이터 로드
  async function fetchWines(cursor: number | null) {
    console.log("Fetching wines with cursor:", cursor); // 커서 값 콘솔 출력
    try {
      setIsLoading(true);
      const response = await instance.get("/users/me/wines", {
        params: { limit, cursor },
      });

      const { list, totalCount, nextCursor } = response.data; // nextCursor를 받음

      console.log("Wines data:", list); // 콘솔 로그 추가
      console.log("Total wines count:", totalCount); // 콘솔 로그 추가

      setWines((prev) => [...prev, ...list]);
      setTotalCount(totalCount);
      setCursor(nextCursor); // 새로운 커서 저장

      if (!nextCursor) {
        setHasMore(false); // 더 이상 데이터가 없다면 hasMore를 false로 설정
      }
    } catch (error) {
      console.error("와인 데이터 불러오기 실패", error);
    } finally {
      setIsLoading(false);
    }
  }

  // 탭 변경 시 데이터 가져오기
  useEffect(() => {
    console.log("Active Tab:", activeTab); // 현재 활성화된 탭 출력
    if (activeTab === "reviews") {
      fetchReviews(cursor);
    } else {
      fetchWines(cursor);
    }
  }, [activeTab, cursor]); // 탭 변경 시에만 실행

  return (
    <div className="desktop:w-[80rem] desktop:h-[3.2rem] tablet:w-full mobile:w-full">
      <div className="flex justify-between items-center">
        <div>
          <button
            className={`desktop:w-[9.6rem] desktop:h-[3.2rem] desktop:text-[2rem] desktop:leading-[3.2rem] tablet:w-[9.6rem] tablet:h-[3.2rem] tablet:text-[2rem] tablet:leading-[3.2rem] mobile:w-[8.7em] mobile:h-[2.6rem] mobile:text-[1.8rem] mobile:leading-[2.6rem] font-semibold ${activeTab === "reviews" ? "text-gray-800" : "text-gray-500"}`}
            onClick={() => {
              setActiveTab("reviews");
              setReviews([]); // 리뷰 데이터 초기화
              setHasMore(true); // hasMore 상태 초기화
              setCursor(null); // 커서 초기화
            }}
          >
            내가 쓴 후기
          </button>
          <button
            className={`ml-[3.2rem] w-[13.1rem] h-[3.2rem] text-[2rem] font-semibold leading-[3.2rem] ${activeTab === "wines" ? "text-gray-800" : "text-gray-500"}`}
            onClick={() => {
              setActiveTab("wines");
              setWines([]); // 와인 데이터 초기화
              setHasMore(true); // hasMore 상태 초기화
              setCursor(null); // 커서 초기화
            }}
          >
            내가 등록한 와인
          </button>
        </div>
        <p className="font-regular text-[1.4rem] leading-[2.4rem] text-right text-primary">
          {`총 ${totalCount}개`}
        </p>
      </div>

      {isLoading && <div>로딩 중...</div>}

      <InfiniteScroll
        loadData={activeTab === "reviews" ? fetchReviews : fetchWines}
        isFetching={isLoading}
        hasMore={hasMore}
        cursor={cursor}
      >
        {activeTab === "reviews" ? (
          <div className="mt-[2.2rem] space-y-[2rem]">
            {reviews.map((review) => (
              <MyReviewCard key={review.id} review={review} />
            ))}
          </div>
        ) : (
          <div className="mt-[2.2rem] space-y-[2rem]">
            {wines.map((wine) => (
              <MyWineCard key={wine.id} wine={wine} />
            ))}
          </div>
        )}
      </InfiniteScroll>
    </div>
  );
}
