"use client";

import { useState, useCallback } from "react";
import PriceFilter from "@/components/wines/PriceFilter";
import RatingFliter from "@/components/wines/RatingFilter";
import TypesFilter from "@/components/wines/TypesFilter";
import Button from "@/components/common/Button";
import FilterButton from "@/components/wines/FilterButton";
import SearchBar from "@/components/wines/SearchBar";
import Card from "@/components/wines/Card";
import CardList from "@/components/wines/CardList";

const wines = [
  { id: 1, name: "Red Wine 1", type: "Red", rating: 4.7, price: 50000 },
  { id: 2, name: "White Wine 1", type: "White", rating: 4.3, price: 700000 },
  {
    id: 3,
    name: "Sparkling Wine 1",
    type: "Sparkling",
    rating: 3.9,
    price: 80000,
  },
  { id: 4, name: "Red Wine 2", type: "Red", rating: 3.8, price: 80000 },
  { id: 5, name: "White Wine 2", type: "White", rating: 2.8, price: 700000 },
];

export default function Wines() {
  const [entireList, setEntierList] = useState(wines);

  // 검색 필터
  const handleInputChange = (term: string) => {
    const filtered = wines.filter((wines) =>
      wines.name.toLowerCase().includes(term.toLowerCase()),
    );
    setEntierList(filtered); // 검색어에 맞는 상품을 필터링
  };

  // 종류별 필터링 함수
  const handleTypeChange = (type: string) => {
    const filtered = wines.filter((wines) => wines.type === type); // 종류에 따라 필터링
    setEntierList(filtered); // 필터링된 데이터 업데이트
  };

  const handleRatingChange = (ranges: [number, number][]) => {
    if (ranges.length === 0) {
      // 선택된 범위가 없으면 전체 데이터 표시
      setEntierList(wines);
      console.log("전체 데이터  표시:", setEntierList);
      return;
    }

    // 선택된 범위에 맞는 데이터 필터링
    const filtered = wines.filter((wines) =>
      ranges.some(([min, max]) => wines.rating >= min && wines.rating <= max),
    );
    setEntierList(filtered);
    console.log("Filtered wines:", filtered);
  };

  // 가격대 필터링 함수
  const handlePriceChange = useCallback(
    (minPrice: number, maxPrice: number) => {
      const filtered = wines.filter(
        (wine) => wine.price >= minPrice && wine.price <= maxPrice,
      );
      setEntierList(filtered);
    },
    [],
  );

  return (
    <div className="flex flex-column w-auto max-w-[114rem] my-0 mx-auto">
      <section className="w-full max-w-[114rem] tablet:mt-[2rem] mobile:mt-[1.5rem] tablet:mb-[4rem] mobile:mb-[2.4rem] h-auto rounded-[1.6rem] tablet:p-[3rem] mobile:p-[2rem] bg-gray-100">
        <h2 className="font-bold text-gray-800 tablet:text-[2rem]/[2.4rem] mobile:text-[1.8rem]/[2.1rem]">
          이번 달 추천 와인
        </h2>
        <Card />
      </section>
      <div className="flex flex-col desktop:items-end tablet:items-center">
        <div className="flex tablet:justify-between desktop:justify-end tablet:gap-[1.6rem] tablet:w-[70.4rem] tablet:flex-row mobile:flex-col">
          <div className="desktop:justify-end mobile:flex tablet:justify-between tablet:flex-row tablet:gap-[2.4rem] mobile:gap-[2rem] mobile:flex-col-reverse">
            <FilterButton />
            <SearchBar onChange={handleInputChange} />
          </div>
          <div className="desktop:hidden">
            <Button
              type="button"
              size="large"
              color="primary"
              addClassName="font-bold text-lg text-center rounded-[1.6rem] py-[1.6rem] px-[17.2rem] flex justify-center items-center"
              /*와인 등록 모달창 띄우기 */
            >
              와인 등록하기
            </Button>
          </div>
        </div>
        <div className="desktop:flex desktop:gap-[6rem]">
          <div className="w-[28.4rem] desktop:h-auto desktop:flex desktop:flex-col desktop:gap-[6rem] mobile:hidden">
            <div className="h-auto w-auto desktop:flex desktop:flex-col gap-[6rem] ">
              <TypesFilter onChange={handleTypeChange} />
              <PriceFilter onChange={handlePriceChange} />
              <RatingFliter onChange={handleRatingChange} />
            </div>
            <Button
              type="button"
              size="large"
              color="primary"
              addClassName="font-bold text-lg text-center rounded-[1.6rem] py-[1.6rem] px-[17.2rem] flex justify-center items-center"
              /*와인 등록 모달창 띄우기 */
            >
              와인 등록하기
            </Button>
          </div>
          {entireList.length > 0 ? (
            <ul>
              {entireList.map((wine) => (
                <li
                  key={wine.id}
                  className="tablet:mt-[6.2rem] mobile:mt-[3rem] h-auto max-w-[80rem] border-solid border-[0.1rem] border-gray-300 rounded-[1.6rem] shadow-md"
                >
                  <CardList />
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
