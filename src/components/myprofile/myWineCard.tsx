import Image from "next/image";
import PalceholderWine from "@/../public/images/placeholder1.png";
import Menu from "../../../public/icons/menu.svg";

export default function MyWineCard() {
  return (
    <div className="w-[80rem] h-[27rem] flex">
      <div>
        <div className="mt-[4.2rem] w-[80rem] h-[22.8rem] border-solid border-[0.1rem] bg-white rounded-[1.6rem] border-gray-300 p-[2.4rem_4rem] flex">
          <div className="flex-shrink-0">
            <Image
              src={PalceholderWine}
              alt="와인사진"
              width={76}
              height={270}
            />
          </div>
          <div>
            <p className="text-[3rem] font-semibold leading-[3.58rem] text-gray-800">
              Sentinel Carbernet Sauvignon 2016
            </p>
            <p>Western Cape, South Africa</p>
            <div>
              <p>₩ 64,990</p>
            </div>
          </div>
          <div>
            <Image src={Menu} alt="메뉴 버튼" width={26} height={26} />
          </div>
        </div>
      </div>
    </div>
  );
}
