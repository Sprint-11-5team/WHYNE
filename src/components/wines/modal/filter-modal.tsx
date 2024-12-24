// "use client";

// import { useState, useCallback } from "react";
// import TypesFilter from "../types-filter";
// import PriceFilter from "../price-filter";
// import RatingFilter from "../rating-filter";
// import Button from "@/components/common/Button";

// export default function FilterModal() {
//   const [filters, setFilters] = useState({
//     limit: 5,
//     type: "",
//     minPrice: 0,
//     maxPrice: 500000,
//     rating: 0,
//   }); // 필터 상태 관리

//   // 종류별 필터링 함수
//   const handleTypeChange = (type: string) => {
//     setFilters((prev) => ({ ...prev, type }));
//   };

//   // 평점 필터링 함수
//   const handleRatingChange = (rating: number) => {
//     setFilters((prev) => ({ ...prev, rating }));
//   };

//   // 가격대 필터링 함수
//   const handlePriceChange = useCallback(
//     (minPrice: number, maxPrice: number) => {
//       setFilters((prev) => ({ ...prev, minPrice, maxPrice }));
//     },
//     [],
//   );

//   return (
//     <>
//       <div>
//         <div>
//           <h2>필터</h2>
//           <button>x</button>
//         </div>
//         <div className="h-auto w-auto mt-[5.9rem] desktop:flex desktop:flex-col gap-[6rem] ">
//           <TypesFilter onChange={handleTypeChange} />
//           <PriceFilter onChange={handlePriceChange} />
//           <RatingFilter onChange={handleRatingChange} />
//         </div>
//       </div>
//       <div>
//         <Button size="small" color="white" type="reset">
//           초기화
//         </Button>
//         <Button size="small" color="primary" type="submit">
//           필터 적용하기
//         </Button>
//       </div>
//     </>
//   );
// }
