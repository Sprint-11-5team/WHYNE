"use client";
import instance from "@/api/api";
import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";

type ReviewState = {
  content: string;
  selectedTags: string[];
  tasteValues: number[];
  wineId: number;
  wineName: string;
  rating: number;
  id: number | undefined;
  setContent: (content: string) => void;
  setSelectedTags: (tags: string[]) => void;
  setTasteValues: (values: number[]) => void;
  setWineId: (id: number) => void;
  setRating: (rating: number) => void;
  setId: (id: number) => void;
  setReviewData: (
    data: Partial<Omit<ReviewState, "setReviewData" | "resetReview">>,
  ) => void;
  resetReview: () => void;
};

const TestWineDetail = {
  id: 504,
  name: "Sentinel Carbernet Sauvignon 2016",
};

export const ReviewContext = createContext<ReviewState | null>(null);

const ReviewProvider = ({ children }: { children: React.ReactNode }) => {
  const [content, setContent] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [tasteValues, setTasteValues] = useState([50, 50, 50, 50]);
  const [wineId, setWineId] = useState(TestWineDetail.id);
  const [wineName, setWineName] = useState<string>("");
  const [rating, setRating] = useState(0);
  const [id, setId] = useState<number | undefined>(undefined);

  const setReviewData = useCallback((data: Partial<ReviewState>) => {
    if (data.content !== undefined) setContent(data.content);
    if (data.selectedTags !== undefined) setSelectedTags(data.selectedTags);
    if (data.tasteValues !== undefined) setTasteValues(data.tasteValues);
    if (data.wineId !== undefined) setWineId(data.wineId);
    if (data.rating !== undefined) setRating(data.rating);
    if (data.id !== undefined) setId(data.id);
  }, []);

  const resetReview = useCallback(() => {
    setContent("");
    setSelectedTags([]);
    setTasteValues([50, 50, 50, 50]);
    setRating(0);
    setId(undefined);
  }, []); // useCallback으로 감싸기

  useEffect(() => {
    if (wineId) {
      async function GetWineName() {
        try {
          const res = await instance.get(`/wines/${wineId}`);
          setWineName(res.data.name);
        } catch (error) {
          console.error("와인 이름 가져오기 실패", error);
          setWineName("와인 이름 로딩 실패");
        }
      }
      GetWineName();
    }
  }, [wineId]);

  const value = {
    content,
    selectedTags,
    tasteValues,
    wineId,
    wineName,
    rating,
    id,
    setContent,
    setSelectedTags,
    setTasteValues,
    setWineId,
    setRating,
    setId,
    setReviewData,
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
