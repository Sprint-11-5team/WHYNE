"use client";

import { useState } from 'react';
import { WineType } from '@/types/tasting';
import EditWine from '@/components/modal-wine/modal-eddit-wine';  // 경로는 실제 위치에 맞게 수정해주세요
import Button from '@/components/common/Button';  // 경로는 실제 위치에 맞게 수정해주세요

// Wine 인터페이스 정의
interface Wine {
  id: number;
  name: string;
  region: string;
  image: string;
  price: number;
  type: WineType;
}

// 테스트용 샘플 와인 데이터
const sampleWine: Wine = {
  id: 1,
  name: "샤토 마고",
  region: "프랑스 보르도",
  image: "https://example.com/wine.jpg",  // 실제 이미지 URL로 변경해주세요
  price: 150000,
  type: WineType.None,  // WineType enum에 맞는 값을 사용해주세요
};

export default function WineEditTest() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleWineUpdate = (updatedWine: Wine) => {
    console.log('Updated wine:', updatedWine);
    setIsModalOpen(false);
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">와인 수정 테스트</h1>
      
      <div className="border p-4 rounded-lg mb-4">
        <h2 className="text-xl mb-2">현재 와인 정보</h2>
        <p>이름: {sampleWine.name}</p>
        <p>지역: {sampleWine.region}</p>
        <p>가격: {sampleWine.price.toLocaleString()}원</p>
        <p>종류: {sampleWine.type}</p>
      </div>

      <Button
        type="button"
        color="primary"
        size="large"
        onClick={handleModalOpen}
      >
        와인 수정하기
      </Button>

      <EditWine
        isOpen={isModalOpen}
        wine={sampleWine}
        onClose={handleModalClose}
        onUpdate={handleWineUpdate}
      />
    </div>
  );
}