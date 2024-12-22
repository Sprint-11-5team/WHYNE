"use client";

import React, { useState, useCallback } from "react";
import InfiniteScroll from "../../components/InfiniteScroll/infiniteScroll"; // InfiniteScroll 컴포넌트 임포트

const App: React.FC = () => {
  const [data, setData] = useState<string[]>([]); // 데이터 상태
  const [isFetching, setIsFetching] = useState(false); // 데이터 로딩 중 상태
  const [hasMore, setHasMore] = useState(true); // 더 이상 로드할 데이터 여부
  const [page, setPage] = useState(1); // 페이지 번호 (페이지 단위로 데이터를 로드)

  // 데이터 로드 함수
  const loadData = useCallback(() => {
    if (isFetching || !hasMore) return; // 데이터 로딩 중이거나, 더 이상 로드할 데이터가 없으면 리턴

    setIsFetching(true);

    // 긴 텍스트를 사용하여 데이터 항목 크기 키우기
    const newData = Array.from(
      { length: 20 },
      (_, index) =>
        `Item ${20 * (page - 1) + index + 1} - This is a much longer piece of content with larger text and more details to make the data items larger and more informative.`,
    );

    // 새로 로드한 데이터 추가
    setData((prevData) => [...prevData, ...newData]);

    // 데이터가 100개 이상 로드되면 더 이상 데이터가 없다고 설정
    if (data.length + 20 >= 100) {
      setHasMore(false);
    }

    setIsFetching(false); // 로딩 상태 종료
    setPage((prevPage) => prevPage + 1); // 페이지 번호 증가
  }, [isFetching, hasMore, page, data]); // 의존성 배열에 정확한 상태를 넣어야 함

  return (
    <div style={{ padding: "20px" }}>
      <h1>Infinite Scroll Test</h1>
      <InfiniteScroll
        loadData={loadData} // 데이터 로딩 함수 전달
        isFetching={isFetching} // 로딩 상태 전달
        hasMore={hasMore} // 더 이상 로드할 데이터가 있는지 여부 전달
      >
        <ul style={{ padding: 0 }}>
          {data.map((item, index) => (
            <li
              key={index}
              style={{
                padding: "20px", // 패딩을 추가하여 항목 크기 증가
                marginBottom: "15px", // 항목 사이에 공간 추가
                border: "1px solid #ddd", // 항목에 경계선 추가
                borderRadius: "8px", // 둥근 모서리
                fontSize: "18px", // 폰트 크기 키우기
                backgroundColor: "#f9f9f9", // 항목 배경 색상
                lineHeight: "1.6", // 텍스트 간격 증가
              }}
            >
              {item}
            </li>
          ))}
        </ul>
      </InfiniteScroll>

      {isFetching && <p>Loading...</p>}
      {!hasMore && <p>No more data to load.</p>}
    </div>
  );
};

export default App;
