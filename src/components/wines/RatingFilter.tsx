"use client";

import { useState } from "react";

interface RatingFilterProps {
  onChange: (ranges: [number, number][]) => void; // 여러 개의 범위를 부모로 전달하는 함수
}

export default function RatingFilter({ onChange }: RatingFilterProps) {
  const [selectedRatings, setSelectedRatings] = useState<[number, number][]>(
    [],
  );

  const ratings: { id: string; label: string; range: [number, number] }[] = [
    { id: "all", label: "전체", range: [0, 5] },
    { id: "highest", label: "4.5 - 5.0", range: [4.5, 5] },
    { id: "muchHigher", label: "4.0 - 4.5", range: [4, 4.5] },
    { id: "higher", label: "3.5 - 4.0", range: [3.5, 4] },
    { id: "littleHigher", label: "3.0 - 3.5", range: [3, 3.5] },
  ];

  const handleSelection = (range: [number, number], isChecked: boolean) => {
    let updatedRatings: [number, number][];
    console.log(range);

    if (isChecked) {
      // 체크박스가 선택되었을 때는 배열에 추가
      updatedRatings = [...selectedRatings, range];
    } else {
      // 체크박스가 선택되지 않았을 때는 배열에서 해당 항목을 제거
      updatedRatings = selectedRatings.filter(
        ([start, end]) => start !== range[0] || end !== range[1],
      );
    }

    // 상태 업데이트
    setSelectedRatings(updatedRatings);
    console.log(updatedRatings);
    onChange(updatedRatings);
  };

  return (
    <div className="flex flex-col gap-[1.6rem] w-auto">
      <h3 className="font-bold text-[1.8rem] text-gray-800">RATING</h3>
      <form>
        <fieldset className="flex flex-col gap-[1.2rem]">
          {ratings.map(({ id, label, range }) => {
            const isChecked = selectedRatings.some(
              (r) => r[0] === range[0] && r[1] === range[1],
            );
            return (
              <label
                key={id}
                htmlFor={id}
                className="flex items-center gap-[1.2rem] cursor-pointer"
              >
                <input
                  type="checkbox"
                  id={id}
                  checked={isChecked}
                  onChange={(e) => handleSelection(range, e.target.checked)}
                />
                <span className="font-medium text-[1.6rem] text-gray-800">
                  {label}
                </span>
              </label>
            );
          })}
        </fieldset>
      </form>
    </div>
  );
}
