import PriceFilter from "@/components/wines/PriceFilter";
import RatingFliter from "@/components/wines/RatingFilter";
import TypesFilter from "@/components/wines/TypesFilter";
import Button from "@/components/common/Button";

export default function Wines() {
  return (
    <>
      <div className="w-[28.4rem] h-auto flex flex-col gap-[6rem]">
        <div className="h-auto w-auto flex flex-col gap-[6rem]">
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
