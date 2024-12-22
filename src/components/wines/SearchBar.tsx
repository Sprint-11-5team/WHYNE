"use client";

import Image from "next/image";
import search from "../../../public/icons/small_search.svg";

interface SearchProps {
  onChange: (term: string) => void; // 부모로 검색어를 전달하는 콜백
}

export default function Search({ onChange }: SearchProps) {
  return <SearchBar onChange={onChange} />;
}

function SearchBar({ onChange }: { onChange: (term: string) => void }) {
  function handleSearch(term: string) {
    onChange(term);
    console.log(term);
  }

  return (
    <>
      <div className="flex relative gap-[1rem] items-center desktop:w-[76rem] desktop:h-[4.8rem] tablet:w-[39.6rem] tablet:h-[4.8rem] mobile:w-full mobile:h-[3.8rem]">
        <Image
          width={20}
          src={search}
          alt="검색하기"
          className="absolute z-10 tablet:left-[2.5rem] mobile:left-[1.5rem]"
        />
        <label htmlFor="search">
          <input
            type="search"
            placeholder="와인을 검색해 보세요"
            className="w-full rounded-[5rem] text-gray-500 border-solid border-[0.1rem] border-gray-300 tablet:h-[4.8rem] mobile:h-[3.8rem] tablet:font-regular mobile:font-medium tablet:text-lg mobile:text-md tablet:pl-[5.5rem] mobile:pl-[4.5rem] py-[1.4rem] tablet:px-[2rem] mobile:px-[1.5rem]"
            onChange={(e) => {
              handleSearch(e.target.value);
            }}
          />
        </label>
      </div>
    </>
  );
}
