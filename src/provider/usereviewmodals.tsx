"use client";
import { createContext, useContext, useState } from "react";

type ReviewState = {
  content: string;
  selectedTags: string[];
  tasteValues: number[];
  wineId: number;
  wineName: string;
  rating: number;
  id: number | undefined;  // id 타입 정의
  setContent: (content: string) => void;
  setSelectedTags: (tags: string[]) => void;
  setTasteValues: (values: number[]) => void;
  setWineId: (id: number) => void;
  setRating: (rating: number) => void;
  setId: (id: number) => void;  // setId 추가
  resetReview: () => void;
};

const TestWineDetail = {
  id: 3,
  name: "Sentinel Carbernet Sauvignon 2016",
};

export const ReviewContext = createContext<ReviewState | null>(null);

const ReviewProvider = ({ children }: { children: React.ReactNode }) => {
  const [content, setContent] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [tasteValues, setTasteValues] = useState([50, 50, 50, 50]);
  const [wineId, setWineId] = useState(TestWineDetail.id);
  const [wineName] = useState(TestWineDetail.name);
  const [rating, setRating] = useState(0);
  const [id, setId] = useState<number | undefined>(undefined);  // id state 추가

  const resetReview = () => {
    setContent("");
    setSelectedTags([]);
    setTasteValues([50, 50, 50, 50]);
    setRating(0);
    setId(undefined);  // id도 리셋
  };

  const value = {
    content,
    selectedTags,
    tasteValues,
    wineId,
    wineName,
    rating,
    id,  // id 추가
    setContent,
    setSelectedTags,
    setTasteValues,
    setWineId,
    setRating,
    setId,  // setId 추가
    resetReview,
  };

  return (
    <ReviewContext.Provider value={value}>{children}</ReviewContext.Provider>
  );
};

export default ReviewProvider;

export function useReviewModalStore() {
  const context = useContext(ReviewContext);
  if (!context) {
    throw new Error("useReviewModalStore must be used within a ReviewProvider");
  }
  return context;
}