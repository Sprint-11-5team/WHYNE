import PriceFilter from "@/components/wines/PriceFilter";
import RatingFliter from "@/components/wines/RatingFilter";
import TypesFilter from "@/components/wines/TypesFilter";
import Button from "@/components/common/Button";
import SearchBar from "@/components/wines/SearchBar";

export default function Wines() {
  return (
    <>
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
