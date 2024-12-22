<!-- "use client";

실제 사용 예시 입니다.

import React, { useState, useCallback, useEffect } from "react";
import InfiniteScroll from "../../components/InfiniteScroll/infiniteScroll"; // InfiniteScroll 컴포넌트 임포트
import axiosInstance from "../../api/api.ts"; // axios 인스턴스 임포트

const App: React.FC = () => {
  const [data, setData] = useState<string[]>([]); // 데이터 상태
  const [isFetching, setIsFetching] = useState(false); // 데이터 로딩 중 상태
  const [hasMore, setHasMore] = useState(true); // 더 이상 로드할 데이터 여부
  const [page, setPage] = useState(1); // 페이지 번호 (페이지 단위로 데이터를 로드)

  // API 호출 함수 (Swagger GET API 사용)
  const fetchDataFromAPI = useCallback(async () => {
    if (isFetching || !hasMore) return; // 데이터 로딩 중이거나, 더 이상 로드할 데이터가 없으면 리턴

    setIsFetching(true);

    try {
      // axios를 사용하여 API에서 데이터 요청
         실제 데이터 확인
      const response = await axiosInstance.get(`/data`, {
        params: {
          page, // 페이지 번호
          limit: 20, // 페이지당 항목 수
        },
      });

      // API 호출 성공 시
      if (response.status === 200) {
        const newData = response.data.items; // API 응답에서 데이터 추출 (응답 형식에 맞게 수정)

        // 새로 로드한 데이터 추가
        setData((prevData) => [...prevData, ...newData]);

        // 더 이상 데이터가 없으면 hasMore를 false로 설정
        if (newData.length === 0) {
          setHasMore(false); // 데이터가 없으면 더 이상 로드할 데이터 없음
        }
      } else {
        // 응답이 실패한 경우
        console.error("Failed to fetch data from API");
      }
    } catch (error) {
      // 네트워크 오류 처리
      console.error("Error fetching data:", error);
    } finally {
      setIsFetching(false); // 데이터 로딩 완료 후 로딩 상태 종료
      setPage((prevPage) => prevPage + 1); // 페이지 번호 증가
    }
  }, [isFetching, hasMore, page]); // 의존성 배열에 정확한 상태를 넣어야 함

  // 처음 로드 시 첫 번째 데이터 로드
  useEffect(() => {
    fetchDataFromAPI();
  }, [fetchDataFromAPI]); // fetchDataFromAPI 함수가 변경될 때마다 호출

  return (
    <div style={{ padding: "20px" }}>
      <h1>Infinite Scroll Test</h1>
      <InfiniteScroll
        loadData={fetchDataFromAPI}  // API 데이터를 로드하는 함수 전달
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

export default App; -->
