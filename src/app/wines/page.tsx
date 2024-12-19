import PriceFilter from "@/components/wines/PriceFilter";
import RatingFliter from "@/components/wines/RatingFilter";
import TypesFilter from "@/components/wines/TypesFilter";
import Button from "@/components/common/Button";
import FilterButton from "@/components/wines/FilterButton";
import SearchBar from "@/components/wines/SearchBar";
import Card from "@/components/wines/Card";

export default function Wines() {
  return (
    <>
      <section className="max-w-[114rem] min-w-[34.3rem] tablet:mt-[2rem] mobile:mt-[1.5rem] tablet:mb-[4rem] mobile:mb-[2.4rem] h-auto rounded-[1.6rem] tablet:p-[3rem] mobile:p-[2rem] bg-gray-100">
        <h2 className="font-bold text-gray-800 tablet:text-[2rem]/[2.4rem] mobile:text-[1.8rem]/[2.1rem]">
          이번 달 추천 와인
        </h2>
        <Card />
      </section>
      <FilterButton />
      <SearchBar />
      <div className="desktop:w-[28.4rem] desktop:h-auto desktop:flex desktop:flex-col desktop:gap-[6rem]">
        <div className="h-auto w-auto flex flex-col gap-[6rem] desktop:flow-root mobile:hidden">
          <TypesFilter />
          <PriceFilter />
          <RatingFliter />
        </div>
        <Button
          type="button"
          size="large"
          color="primary"
          addClassName="rounded-[1.6rem] py-[1.6rem] px-[17.2rem] font-bold text-lg text-center flex justify-center items-center"
          /*와인 등록 모달창 띄우기 */
        >
          와인 등록하기
        </Button>
      </div>
    </>
  );
}
