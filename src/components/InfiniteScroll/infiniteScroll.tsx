import React, { useRef, useEffect, useCallback } from "react";

interface InfiniteScrollProps {
  loadData: () => void; // 데이터를 로드하는 함수
  isFetching: boolean; // 데이터를 불러오는 중인지 여부
  hasMore: boolean; // 더 이상 로드할 데이터가 있는지 여부
  children: React.ReactNode;
}

const InfiniteScroll: React.FC<InfiniteScrollProps> = ({
  loadData,
  isFetching,
  hasMore,
  children,
}) => {
  const sensorRef = useRef<HTMLDivElement | null>(null);

  // 데이터를 더 로드하는 함수 (useCallback으로 최적화)
  const handleLoadMore = useCallback(() => {
    if (!isFetching && hasMore) {
      loadData(); // 데이터 로드
    }
  }, [isFetching, hasMore, loadData]); // isFetching과 hasMore만 의존성으로 설정

  // IntersectionObserver를 사용하여 스크롤 끝을 감지
  useEffect(() => {
    if (!isFetching && hasMore) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              handleLoadMore(); // 스크롤 끝에 도달하면 데이터를 더 로드
            }
          });
        },
        { threshold: 1.0 }, // 100% 보이기 시작할 때 트리거
      );

      const currentSensor = sensorRef.current;
      if (currentSensor) {
        observer.observe(currentSensor); // sensorRef를 감시
      }

      // 컴포넌트 언마운트 시 observer 해제
      return () => {
        if (currentSensor) {
          observer.unobserve(currentSensor); // 감시 해제
        }
      };
    }
  }, [isFetching, hasMore, handleLoadMore]); // 의존성 배열에서 handleLoadMore를 포함

  return (
    <>
      {children}
      <div
        ref={sensorRef}
        style={{
          height: "1px", // 감지 영역의 높이
          marginTop: "100px", // 감지 시작 위치
        }}
      />
    </>
  );
};

export default InfiniteScroll;
