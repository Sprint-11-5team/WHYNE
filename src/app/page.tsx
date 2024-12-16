import Image from "next/image";
import logo from "../../public/icons/purple_logo.svg";
import CardList from "@/components/landing/CardList";
import SectionCard from "@/components/landing/SectionCard";
import typesFilter from "../../public/images/types_filter.svg";
import pricesFilter from "../../public/images/prices_filter.svg";
import filterWine from "../../public/images/filter_wine.svg";
import review from "../../public/images/review.svg";
import mobileFilterWine from "../../public/images/mobile_filter_wine.svg";
import mobileReview from "../../public/images/mobile_review.svg";

export default function Home() {
  return (
    <div>
      <section>
        <div>
          <div>
            <Image width={102} height={29} src={logo} alt="wine 로고" />
            <h2>
              한 곳에서 관리하는
              <br />
              나만의 와인창고
            </h2>
          </div>
          <CardList />
        </div>
      </section>
      <section>
        <div>
          <h2>
            매달 새롭게 만나는
            <br />
            와인 추천 콘텐츠
          </h2>
          <div>매달 다양한 인기 와인을 만나보세요.</div>
        </div>
        <div>
          <h3>이번 달 추천 와인</h3>
          <SectionCard />
        </div>
      </section>
      <section>
        <div>
          <div>
            <h2>
              다양한 필터로 찾는
              <br />내 맞춤 와인
            </h2>
            <div>
              와인 타입, 가격, 평점으로
              <br />
              나에게 맞는 와인을 쉽게 검색해보세요
            </div>
          </div>
          <div className="visible-tablet">
            <Image width={137} src={typesFilter} alt="와인 타입 필터" />
            <Image width={129} src={pricesFilter} alt="와인 가격 필터" />
          </div>
        </div>
        <div className="visible-tablet">
          <Image width={341} src={filterWine} alt="맞춤 와인 예시" />
        </div>
        <div className="visible-mobile">
          <Image width={280} src={mobileFilterWine} alt="맞춤 와인 예시" />
        </div>
      </section>
      <section>
        <div>
          <h2>
            직관적인
            <br />
            리뷰 시스템
          </h2>
          <div>
            더 구체화된 리뷰 시스템으로
            <br />
            쉽고 빠르게 와인 리뷰를 살펴보세요.
          </div>
        </div>
        <div className="visible-tablet">
          <Image width={272} src={review} alt="와인 리뷰 예시" />
        </div>
        <div className="visible-mobile">
          <Image width={272} src={mobileReview} alt="와인 리뷰 예시" />
        </div>
      </section>
    </div>
  );
}
