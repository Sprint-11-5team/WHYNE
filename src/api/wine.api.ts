import instance from "./api";

export interface PatchWineData {
  name: string;
  price: number;
  region: string;
  type: 'RED' | 'WHITE' | 'SPARKLING';
  image: string;
}

export interface PatchReviewData {
    rating:number;
    lightBold:number;
    smoothTannic:number;
    drySweet:number;
    softAcidic:number;
    aroma:string[];
    content:string;
}


// 이미지 업로드
export const uploadWineImage = async (imgFile: File): Promise<string> => {
  const accessToken = `Bearer ${localStorage.getItem("accessToken")}`;
  const formData = new FormData();
  formData.append("image", imgFile, btoa(encodeURI(imgFile.name)));

  const response = await instance({
    method: "POST",
    url: "/images/upload",
    data: formData,
    headers: {
      Authorization: accessToken,
    },
  });

  return response.data.url;
};

// 와인 상세 정보 POST
export const postWineDetail = async (wineData: {
  name: string;
  region: string;
  price: number;
  type: string;
  image: string;
}) => {
  const response = await instance({
    method: "POST",
    url: "/wines",
    data: wineData,
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response;
};

export async function deleteWine({ id }: { id: number }) {
  const response = await instance<{
    id?: number;
    message?: string;
  }>({
    method: "DELETE",
    url: `/wines/${id}`,
  });

  return response;
}

export async function deleteReview({ id }: { id: number }) {
  const response = await instance<{
    id?: number;
    message?: string;
  }>({
    method: "DELETE", 
    url: `/reviews/${id}`,
  });
 
  return response;
 }



 export const getWine = async (wineId: number) => {
  try {
    const response = await instance.get(`/wines/${wineId}`);
    return response.data;
  } catch {
    console.log('와인등록 정보 불러오기 오류');
  }
};

export const patchWine = async (
  wineId: number,
  data: PatchWineData,
): Promise<void> => {
  try {
    await instance.patch(`/wines/${wineId}`, data);
  } catch (err) {
    console.error(err);
    alert('와인 수정 중 오류가 발생했습니다.');
  }
};

export const getReview = async (reviewId: number) => {
  try {
    const response = await instance.get(`/reviews/${reviewId}`);
    return response.data;
  } catch {
    console.log('리뷰 정보 불러오기 오류');
  }
};

export const patchReview = async (
  reviewId: number,
  data: PatchReviewData,
): Promise<void> => {
  try {
    await instance.patch(`/reviews/${reviewId}`, data);
  } catch (err) {
    console.error(err);
    alert('리뷰 수정 중 오류가 발생했습니다.');
  }
};