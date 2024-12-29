"use client";

import { useState } from "react";
import AddWine from "@/components/modal-wine/modal-add-wine";
import EditWine from "@/components/modal-wine/modal-eddit-wine";
import DropDownMenu from "@/components/common/dropdown-menu";

export default function TestPage() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleCloseAddModal = () => {
    setIsAddModalOpen(false);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
  };

  const handleEdit = () => {
    console.log("수정하기");
  };

  const handleDelete = () => {
    console.log("삭제하기");
  };

  return (
    <div
      className="flex flex-col items-center justify-center h-screen"
      style={{ gap: "3.2rem" }}
    >
      <div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="rounded-[1.6rem] bg-primary px-[2.4rem] py-[1.2rem] text-[1.6rem] text-white hover:bg-[#7b52f1] transition-colors"
        >
          와인 등록하기
        </button>

        <AddWine isOpen={isAddModalOpen} onClick={handleCloseAddModal} />
      </div>

      <div>
        <button
          onClick={() => setIsEditModalOpen(true)}
          className="rounded-[1.6rem] bg-primary px-[2.4rem] py-[1.2rem] text-[1.6rem] text-white hover:bg-[#7b52f1] transition-colors"
        >
          와인 수정하기
        </button>

        <EditWine isOpen={isEditModalOpen} onClick={handleCloseEditModal} />
      </div>

      <div className="flex items-center" style={{ gap: "1.6rem" }}>
        <h1 className="text-[1.6rem]">드롭다운 메뉴 테스트</h1>
        <DropDownMenu onEdit={handleEdit} onDelete={handleDelete}>
          <button className="w-8 h-8">⋮</button>
        </DropDownMenu>
      </div>
    </div>
  );
}