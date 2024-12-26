"use client";

import { useState, useCallback, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import Image from "next/image";
import instance from "@/api/api";
import { removeEmptyField } from "./util";
import {
  WineParam,
  Filters,
  WineListType,
  WineType,
} from "@/components/wines/wine";
import PriceFilter from "@/components/wines/price-filter";
import RatingFliter from "@/components/wines/rating-filter";
import TypesFilter from "@/components/wines/types-filter";
import Button from "@/components/common/Button";
import FilterButton from "@/components/wines/filter-button";
import Search from "@/components/wines/search";
import RecommendCard from "@/components/wines/recommend-card";
import EntireCard from "@/components/wines/entire-card";
import FilterModal from "@/components/wines/modal/filter-modal";
import Modal from "@/components/common/modal-container";
import AddWine from "@/components/common/modal-add-wine";
import arrowRight from "../../../public/icons/right.svg";
import "swiper/css";
import "swiper/css/navigation";

const InitialFilters: Filters = {
  limit: 10,
  type: "",
  minPrice: 0,
  maxPrice: 500000,
  rating: 0,
};

// 와인 목록을 가져오는 함수 (공통화)
const fetchData = async (
  url: string,
  { limit = 10, cursor, type, minPrice, maxPrice, rating, name }: WineParam,
): Promise<WineListType | null> => {
  const param = removeEmptyField({
    limit,
    cursor,
    type,
    minPrice,
    maxPrice,
    rating,
    name,
  });

  try {
    const response = await instance.get(`${url}`, {
      params: param,
    });
    return response.data;
  } catch (error) {
    console.error(`${url} 데이터 업로드 실패:`, error);
    alert((error as Error).message);
    return null; // 실패 시 null 반환
  }
};

export default function Wines() {
  const [recommendList, setRecommendList] = useState<WineType[]>([]);
  const [entireList, setEntireList] = useState<WineListType>({
    list: [],
    nextCursor: 0,
    totalCount: 0,
  }); // 전체 와인 목록
  const [isLoading, setIsLoading] = useState<boolean>(false); // 로딩 상태 추가

  const [filters, setFilters] = useState<Filters>(InitialFilters);

  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isAddWineModalOpen, setIsAddWineModalOpen] = useState(false);

  const handleReset = () => {
    setFilters(InitialFilters);
  };

  // 추천 와인 목록 가져오기
  const fetchRecommendData = useCallback(async () => {
    console.log("Fetching recommended wines with:", { limit: 10 });
    const response = await fetchData("/wines/recommended", { limit: 10 });
    console.log("Fetched recommended data:", response);
    if (response === null) return;
    setRecommendList(response);
    console.log("Fetched recommended data setState:", response);
  }, []);

  // 필터 값이 변경될 때마다 데이터 새로 가져오기
  // useEffect(() => {
  // fetchEntireData();
  // }, [filters, search, fetchEntireData]);

  useEffect(() => {
    fetchRecommendData();
  }, [fetchRecommendData]);

  useEffect(() => {
    const fetchDataAsync = async () => {
      const response = await fetchData("/wines", { limit: 10 });
      console.log(response);
      if (response === null) return;
      setEntireList(response);
    };
    fetchDataAsync();
  }, [entireList.nextCursor]);

  // 검색 필터
  const handleInputChange = async (name: string) => {
    setFilters((prev) => ({ ...prev, name }));
    const data = await fetchData("/wines", { limit: 10, name });
    if (data === null) return;
    setEntireList((print) => ({ ...print, list: data.list }));
  };

  const handleFilterChange = (
    filterType: "type" | "rating" | "price",
    value: Filters,
  ) => {
    setFilters((prev) => {
      switch (filterType) {
        case "type":
          return { ...prev, type: value.type };
        case "rating":
          return { ...prev, rating: value.rating };
        case "price":
          const { minPrice, maxPrice } = value; // 가격은 객체로 받음
          return { ...prev, minPrice, maxPrice };
        default:
          return prev; // 알 수 없는 필터 타입은 변경하지 않음
      }
    });
  };

  // 각각의 핸들러 함수도 분리
  const handleFilterModalOpen = () => {
    setIsFilterModalOpen(!isFilterModalOpen);
  };

  const handleAddWineModalOpen = () => {
    setIsAddWineModalOpen(!isAddWineModalOpen);
  };

  // 모달 상태를 토글하는 함수
  const handleModalToggle = () => {
    setIsFilterModalOpen((prev) => !prev); // 이전 상태를 반전시킴
  };

  const handleFilterApply = () => {
    console.log("필터 적용:", filters);
    handleModalToggle(); // 필터 적용 후 모달 닫기
  };

  return (
    <div className="flex flex-column w-auto max-w-[114rem] my-0 mx-auto">
      <section className="w-full max-w-[114rem] tablet:mt-[2rem] mobile:mt-[1.5rem] tablet:mb-[4rem] mobile:mb-[2.4rem] h-auto rounded-[1.6rem] tablet:p-[3rem] mobile:p-[2rem] bg-gray-100">
        <h2 className="font-bold text-gray-800 tablet:text-[2rem]/[2.4rem] mobile:text-[1.8rem]/[2.1rem]">
          이번 달 추천 와인
        </h2>
        {recommendList.length > 0 ? (
          <div className="relative group w-full">
            <Swiper
              modules={[Navigation]}
              slidesPerView="auto" // 기본 슬라이드 수
              spaceBetween={20}
              centeredSlides={false}
              loop={true}
              navigation={{
                nextEl: ".swiper-button-next", // 커스텀 버튼 지정
              }} // 네비게이션 버튼 추가
              breakpoints={{
                // 화면 크기에 따른 슬라이드 수 조정
                375: {
                  slidesPerView: 3,
                },
                744: {
                  slidesPerView: 4,
                },
                1024: {
                  slidesPerView: 5,
                },
              }}
              className="w-full swiper-wrapper"
            >
              {recommendList.map((data) => (
                <SwiperSlide key={data.id}>
                  <RecommendCard data={data} />
                </SwiperSlide>
              ))}
            </Swiper>
            {/* 커스텀 네비게이션 버튼 */}
            <button className="swiper-button-next absolute top-2/3 right-0 transform -translate-y-1/2 bg-gray-200 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <Image
                src={arrowRight}
                width={24}
                height={24}
                alt="추천 와인 더보기"
              />
            </button>
          </div>
        ) : (
          <p>와인 추천을 준비중이예요!</p>
        )}
      </section>
      <div className="flex flex-col desktop:items-end tablet:items-center">
        <div className="flex tablet:justify-between desktop:justify-end tablet:gap-[1.6rem] tablet:w-[70.4rem] tablet:flex-row mobile:flex-col">
          <div className="mobile:flex tablet:justify-between tablet:flex-row tablet:gap-[2.4rem] mobile:gap-[2rem] mobile:flex-col-reverse">
            <FilterButton onClick={handleFilterModalOpen} />
            {/* 필터 모달 컴포넌트 */}
            <FilterModal
              isOpen={isFilterModalOpen}
              onToggle={handleFilterModalOpen}
              filters={filters}
              onFilterApply={handleFilterApply}
              onFilterReset={handleReset}
              onTypeChange={() => handleFilterChange("type", filters)}
              onPriceChange={() => handleFilterChange("price", filters)}
              onRatingChange={() => handleFilterChange("rating", filters)}
            />
            <Search onChange={handleInputChange} />
          </div>
          <div className="desktop:hidden tablet:static tablet:mt-0 mobile:sticky mobile:mt-[2.5rem]">
            <Button
              type="button"
              size="large"
              color="primary"
              addClassName="font-bold text-lg text-center rounded-[1.6rem] tablet:py-[1.6rem] tablet:px-[6rem] flex justify-center items-center tablet:shadow-none tablet:w-auto mobile:w-[34.3rem] tablet:static tablet:translate-x-0 mobile:fixed mobile:translate-x-1/2 mobile:right-1/2 mobile:bottom-[1.5rem] mobile:p-[1.6rem] mobile:shadow-xl"
              onClick={handleAddWineModalOpen}
            >
              와인 등록하기
            </Button>
            <Modal isOpen={isAddWineModalOpen} onClose={handleAddWineModalOpen}>
              <AddWine onClose={handleAddWineModalOpen} />
            </Modal>
          </div>
        </div>
        <div className="desktop:flex desktop:gap-[6rem]">
          <div className="w-[28.4rem] desktop:h-auto desktop:flex desktop:flex-col desktop:gap-[6rem] mobile:hidden">
            <div className="h-auto w-auto mt-[5.9rem] desktop:flex desktop:flex-col gap-[6rem] ">
              <TypesFilter
                onChange={() => handleFilterChange("type", filters)}
              />
              <PriceFilter
                onChange={() => handleFilterChange("price", filters)}
                filters={{
                  minPrice: filters.minPrice,
                  maxPrice: filters.maxPrice,
                }}
                resetValues={{ minPrice: 0, maxPrice: 500000 }}
              />
              <RatingFliter
                onChange={() => handleFilterChange("rating", filters)}
                filters={{ rating: filters.rating }} // filters 객체에서 rating 값만 넘겨줌
                resetRating={0}
              />
            </div>
            <Button
              type="button"
              size="large"
              color="primary"
              addClassName="font-bold text-lg text-center rounded-[1.6rem] p-[1.6rem] flex justify-center items-center"
              onClick={handleAddWineModalOpen}
            >
              와인 등록하기
            </Button>
            <Modal isOpen={isAddWineModalOpen} onClose={handleAddWineModalOpen}>
              <AddWine onClose={handleAddWineModalOpen} />
            </Modal>
          </div>
          {isLoading ? (
            <p className="text-gray-600">와인을 준비중입니다...</p> // 로딩 중 문구 표시
          ) : entireList.list.length > 0 ? (
            <ul>
              {entireList.list.map((data) => (
                <li key={data.id}>
                  <EntireCard data={data} />
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">
              일치하는 와인이 없습니다. 다음에 다시 시도해주세요.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
