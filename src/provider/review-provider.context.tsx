"use client";
import instance from "@/api/api";
import { createContext, useContext, useEffect, useState } from "react";

type ReviewState = {
  id: number | undefined;
  setId: (id: number) => void;
  data: GetWineDetailResponse | null;
};

type GetWineDetailResponse = {
  id: number;
  rating: number;
  lightBold: number;
  smoothTannic: number;
  drySweet: number;
  softAcidic: number;
  aroma: string[];
  content: string;
  createdAt: Date;
  updatedAt: Date;
  user: {
    id: number;
    nickname: string;
    image: string;
  };
  isLiked: boolean;
  wineId: number;
  teamId: string;
};

export const ReviewContext = createContext<ReviewState | null>(null);

const ReviewProviderV2 = ({ children }: { children: React.ReactNode }) => {
  const [reviewId, setReviewId] = useState<number | undefined>(undefined);
  const [data, setData] = useState<GetWineDetailResponse | null>(null);

  async function handleChangedId(id: number) {
    setReviewId(id);
  }

  useEffect(() => {
    async function fetchWineDetail() {
      if (!reviewId) {
        return;
      }
      return instance.get<GetWineDetailResponse>(`/reviews/${reviewId}`);
    }

    fetchWineDetail().then((response) => {
      if (response) setData(response.data);
    });
  }, [reviewId]);

  return (
    <ReviewContext.Provider
      value={{
        id: reviewId,
        setId: handleChangedId,
        data,
      }}
    >
      {children}
    </ReviewContext.Provider>
  );
};

export default ReviewProviderV2;

export function useReviewModalStoreV2() {
  const context = useContext(ReviewContext);
  if (!context) {
    throw new Error("useReviewModalStore must be used within a ReviewProvider");
  }
  return context;
}
