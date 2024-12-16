"use client";
import { useState } from 'react';
import Modal from '@/components/common/Modal-container';

export default function ModalTestPage() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    console.log('Opening modal');
    setIsOpen(true);
  };

  const handleClose = () => {
    console.log('Closing modal');
    setIsOpen(false);
  };

  console.log('Current isOpen state:', isOpen); // 현재 상태 확인

  return (
    <div className="p-8">
      <button 
        onClick={handleOpen}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        모달 열기
      </button>

      <Modal
        isOpen={isOpen}
        onClose={handleClose}
      >
        <div className="bg-white p-6 rounded-lg min-w-[300px] z-[100]">
          <h2 className="text-xl font-bold mb-4">테스트 모달</h2>
          <p className="mb-4">모달 컨텐츠입니다.</p>
          <button 
            onClick={handleClose}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            닫기
          </button>
        </div>
      </Modal>
    </div>
  );
}