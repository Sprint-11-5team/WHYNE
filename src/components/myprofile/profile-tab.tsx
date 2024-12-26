"use client";

import { useEffect, useState, useCallback } from "react";
import MyReviewCard, { Review } from "./my-review-card";
import MyWineCard, { Wine } from "./my-wine-card";
import instance from "@/api/api";
import InfiniteScroll from "../InfiniteScroll/infiniteScroll"; // InfiniteScroll 컴포넌트 임포트

export default function ProfileTab() {
  const [activeTab, setActiveTab] = useState<"reviews" | "wines">("reviews");
  const [reviews, setReviews] = useState<Review[]>([]);
  const [wines, setWines] = useState<Wine[]>([]);
  const [isFetching, setIsFetching] = useState<boolean>(false); // 데이터 로딩 상태
  const [totalCount, setTotalCount] = useState(0);
  const [cursor, setCursor] = useState<number | null>(null); // cursor 상태
  const [hasMore, setHasMore] = useState(true); // 더 이상 불러올 데이터가 있는지 여부
  const [initialLoad, setInitialLoad] = useState<boolean>(true); // 첫 번째 로드 상태

  const limit = 20; // 한 번에 불러올 데이터의 개수

  // 리뷰 데이터 불러오기
  const fetchReviews = useCallback(async (cursor: number | null) => {
    try {
      setIsFetching(true);
      const response = await instance.get("/users/me/reviews", {
        params: { limit, cursor },
      });

      const { list, totalCount, nextCursor } = response.data;

      setReviews((prev) => [...prev, ...list]);
      setTotalCount(totalCount);
      setCursor(nextCursor);
      setHasMore(!!nextCursor); // 다음 페이지가 있으면 true
    } catch (error) {
      console.error("리뷰 데이터 불러오기 실패", error);
    } finally {
      setIsFetching(false);
      setInitialLoad(false); // 첫 번째 로딩 후 초기화
    }
  }, []);

  // 와인 데이터 불러오기
  const fetchWines = useCallback(async (cursor: number | null) => {
    try {
      setIsFetching(true);
      const response = await instance.get("/users/me/wines", {
        params: { limit, cursor },
      });

      const { list, totalCount, nextCursor } = response.data;

      setWines((prev) => [...prev, ...list]);
      setTotalCount(totalCount);
      setCursor(nextCursor);
      setHasMore(!!nextCursor); // 다음 페이지가 있으면 true
    } catch (error) {
      console.error("와인 데이터 불러오기 실패", error);
    } finally {
      setIsFetching(false);
      setInitialLoad(false); // 첫 번째 로딩 후 초기화
    }
  }, []);

  // 탭 변경 시 데이터 불러오기
  useEffect(() => {
    if (isFetching || !hasMore) return; // 로딩 중이거나 더 이상 데이터가 없으면 실행하지 않음

    // 첫 번째 로딩 시에만 데이터를 불러오고 이후엔 탭 변경 시 데이터 불러옴
    if (initialLoad) {
      if (activeTab === "reviews") {
        fetchReviews(cursor); // 리뷰 데이터를 불러옴
      } else {
        fetchWines(cursor); // 와인 데이터를 불러옴
      }
    }

    // 탭이 변경될 때마다 데이터를 초기화하고 새로운 데이터를 불러옴
    setReviews([]);
    setWines([]);
    setCursor(null);
    setHasMore(true);

    if (activeTab === "reviews") {
      fetchReviews(cursor); // 리뷰 데이터를 불러옴
    } else {
      fetchWines(cursor); // 와인 데이터를 불러옴
    }
  }, [
    activeTab,
    cursor,
    fetchReviews,
    fetchWines,
    isFetching,
    hasMore,
    initialLoad,
  ]); // 의존성 배열에 initialLoad 추가

  // 리뷰 데이터 로드 함수
  const loadDataForReviews = () => fetchReviews(cursor);

  // 와인 데이터 로드 함수
  const loadDataForWines = () => fetchWines(cursor);

  return (
    <div className="desktop:w-[80rem] desktop:h-[3.2rem] tablet:w-full mobile:w-full">
      <div className="flex justify-between items-center">
        <div>
          <button
            className={`desktop:w-[9.6rem] desktop:h-[3.2rem] desktop:text-[2rem] desktop:leading-[3.2rem] tablet:w-[9.6rem] tablet:h-[3.2rem] tablet:text-[2rem] tablet:leading-[3.2rem] mobile:w-[8.7em] mobile:h-[2.6rem] mobile:text-[1.8rem] mobile:leading-[2.6rem] font-semibold ${activeTab === "reviews" ? "text-gray-800" : "text-gray-500"}`}
            onClick={() => setActiveTab("reviews")}
          >
            내가 쓴 후기
          </button>
          <button
            className={`ml-[3.2rem] w-[13.1rem] h-[3.2rem] text-[2rem] font-semibold leading-[3.2rem] ${activeTab === "wines" ? "text-gray-800" : "text-gray-500"}`}
            onClick={() => setActiveTab("wines")}
          >
            내가 등록한 와인
          </button>
        </div>
        <p className="font-regular text-[1.4rem] leading-[2.4rem] text-right text-primary">
          {`총 ${totalCount}개`}
        </p>
      </div>

      {isFetching && <div>로딩 중...</div>}

      {/* 리뷰 탭일 때 InfiniteScroll 적용 */}
      {activeTab === "reviews" && (
        <InfiniteScroll
          loadData={loadDataForReviews}
          isFetching={isFetching}
          hasMore={hasMore}
          cursor={cursor}
        >
          <div className="mt-[2.2rem] space-y-[2rem]">
            {reviews.map((review) => (
              <MyReviewCard key={review.id} review={review} />
            ))}
          </div>
        </InfiniteScroll>
      )}

      {/* 와인 탭일 때 InfiniteScroll 적용 */}
      {activeTab === "wines" && (
        <InfiniteScroll
          loadData={loadDataForWines}
          isFetching={isFetching}
          hasMore={hasMore}
          cursor={cursor}
        >
          <div className="mt-[2.2rem] space-y-[2rem]">
            {wines.map((wine) => (
              <MyWineCard key={wine.id} wine={wine} />
            ))}
          </div>
        </InfiniteScroll>
      )}
    </div>
  );
}
