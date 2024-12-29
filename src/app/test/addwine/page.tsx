"use client";

import { useState, useCallback, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import AddWine from "@/components/modal-wine/modal-add-wine";
import Button from "@/components/common/Button";
import FilterModal from "@/components/wines/modal/filter-modal";
import instance from "@/api/api";
import { removeEmptyField } from "@/utils/parameter";
import {
  WineParam,
  WineType,
} from "@/components/wines/wine";
import Search from "@/components/wines/search";
import RecommendCard from "@/components/wines/recommend-card";
import "swiper/css";
import "swiper/css/navigation";

const initialPrice = { minPrice: 0, maxPrice: 500000 };
const initialRating = 3;

const fetchData = async (
  url: string,
  { limit = 10, name, type, minPrice, maxPrice, rating }: WineParam,
): Promise<WineType[]> => {
  const param = removeEmptyField({
    limit,
    name,
    type,
    minPrice,
    maxPrice,
    rating,
  });

  try {
    const response = await instance.get(`${url}`, {
      params: param,
    });
    return response.data;
  } catch (error) {
    console.error(`${url} 데이터 업로드 실패:`, error);
    if (error instanceof Error) {
      alert(error.message);
    } else {
      alert('데이터를 불러오는데 실패했습니다.');
    }
    return [];
  }
};

export default function ImageSearchPage() {
  const [isAddWineModalOpen, setIsAddWineModalOpen] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [recommendList, setRecommendList] = useState<WineType[]>([
    {
      id: 0,
      name: "",
      region: "",
      image: "",
      price: 0,
      type: "",
      avgRating: 0,
      reviewCount: 0,
      recentReview: null,
    },
  ]);

  const fetchRecommendData = useCallback(async () => {
    const response = await fetchData("/wines/recommended", { limit: 10 });
    if (response) {
      setRecommendList(response);
      console.log("추천 와인 목록", response);
    }
  }, []);

  useEffect(() => {
    fetchRecommendData();
  }, [fetchRecommendData]);

  const handleSearchChange = async (name: string) => {
    const response = await fetchData("/wines", { limit: 10, name });
    if (response) console.log("검색 결과:", response);
  };

  const handleAddWineModalOpen = () => {
    setIsAddWineModalOpen(!isAddWineModalOpen);
  };

  const handleFilterModalOpen = () => {
    setIsFilterModalOpen(!isFilterModalOpen);
  };

  const handleFilterApply = async (filters: {
    type: string;
    price: { minPrice: number; maxPrice: number };
    rating: number;
  }) => {
    const response = await fetchData("/wines", {
      limit: 10,
      type: filters.type,
      minPrice: filters.price.minPrice,
      maxPrice: filters.price.maxPrice,
      rating: filters.rating,
    });
    if (response) console.log("필터 적용 결과:", response);
  };

  const handleFilterReset = async () => {
    const response = await fetchData("/wines", { limit: 10 });
    if (response) console.log("필터 초기화 결과:", response);
  };

  const handleTypeChange = async (type: string) => {
    const response = await fetchData("/wines", { limit: 10, type });
    if (response) console.log("타입 변경 결과:", response);
  };

  const handlePriceChange = async (minPrice: number, maxPrice: number) => {
    const response = await fetchData("/wines", { limit: 10, minPrice, maxPrice });
    if (response) console.log("가격 변경 결과:", response);
  };

  const handleRatingChange = async (rating: number) => {
    const response = await fetchData("/wines", { limit: 10, rating });
    if (response) console.log("평점 변경 결과:", response);
  };

  return (
    <div
      className="flex flex-col items-center h-screen pt-[2rem]"
      style={{ gap: "3.2rem" }}
    >
      <section className="w-full max-w-[114rem] tablet:mt-[2rem] mobile:mt-[1.5rem] tablet:mb-[4rem] mobile:mb-[2.4rem] h-auto rounded-[1.6rem] tablet:p-[3rem] mobile:p-[2rem] bg-gray-100">
        <h2 className="font-bold text-gray-800 tablet:text-[2rem]/[2.4rem] mobile:text-[1.8rem]/[2.1rem]">
          추천 와인 이미지
        </h2>
        {Array.isArray(recommendList) && recommendList.length > 0 ? (
          <div className="relative group w-full">
            <Swiper
              modules={[Navigation]}
              slidesPerView="auto"
              spaceBetween={20}
              centeredSlides={false}
              loop={false}
              navigation={{
                nextEl: ".swiper-button-next",
              }}
              breakpoints={{
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
          </div>
        ) : (
          <p>와인 추천을 준비중이예요!</p>
        )}
      </section>

      <div className="w-full max-w-[114rem] flex flex-col gap-4">
        <Search onChange={handleSearchChange} />
        <Button
          type="button"
          size="large"
          color="secondary"
          addClassName="font-bold text-lg text-center rounded-[1.6rem] p-[1.6rem] flex justify-center items-center"
          onClick={handleFilterModalOpen}
        >
          필터로 검색하기
        </Button>
        <FilterModal
          isOpen={isFilterModalOpen}
          onToggle={handleFilterModalOpen}
          onFilterApply={handleFilterApply}
          onFilterReset={handleFilterReset}
          onTypeChange={handleTypeChange}
          onPriceChange={handlePriceChange}
          onRatingChange={handleRatingChange}
          initialPrice={initialPrice}
          initialRating={initialRating}
        />
      </div>

      <div className="w-full max-w-[114rem]">
        <Button
          type="button"
          size="large"
          color="primary"
          addClassName="w-full font-bold text-lg text-center rounded-[1.6rem] p-[1.6rem] flex justify-center items-center"
          onClick={handleAddWineModalOpen}
        >
          와인 등록하기
        </Button>
        <AddWine
          isOpen={isAddWineModalOpen}
          onClick={handleAddWineModalOpen}
        />
      </div>
    </div>
  );
}