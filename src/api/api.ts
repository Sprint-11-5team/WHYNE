import axios from "axios";

// Axios 인스턴스 생성
const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

// 요청 인터셉터
axios.interceptors.request.use(
  function (config) {
    // 요청이 보내지기 전에 작업
    return config;
  },
  function (error) {
    // 요청 오류 처리
    console.error("요청 오류:", error);
    return Promise.reject(error);
  },
);

// 응답 인터셉터
axios.interceptors.response.use(
  function (response) {
    // 2xx 응답 처리
    return response.data;
  },
  function (error) {
    // 2xx 외의 응답 오류 처리
    console.error("응답 오류:", error);
    return Promise.reject(error);
  },
);

// 요청 파라미터 및 응답 타입 정의
type RequestParam = { wineId?: number }; // wineId는 선택적 파라미터
type GetWinesResponse = { title: string; desc: string }; // 응답 구조에 맞게 수정
type LoginRequest = { email: string; password: string };
type LoginResponse = { token: string; user: { id: number; name: string } };
type RefreshTokenRequest = { refreshToken: string };
type RefreshTokenResponse = { token: string; expiresIn: number };

// 와인 정보 가져오기 함수
export const getWines = async (params: RequestParam) => {
  try {
    // GET 요청 보내기 (params는 객체로 전달)
    const response = await instance.get<GetWinesResponse>("/wines", { params });
    return response; // 인터셉터에서 이미 데이터만 반환하므로 그대로 리턴
  } catch (error) {
    console.error("와인 정보 가져오기 오류:", error);
    throw error; // 오류를 다시 던져서 호출한 곳에서 처리하게끔
  }
};

// POST요청 로그인 함수
export const loginUser = async (data: LoginRequest) => {
  try {
    const response = await instance.post<LoginResponse>("/auth/signIn", data);
    return response;
  } catch (error) {
    console.error("로그인 오류", error);
    throw error;
  }
};

// 토큰 갱신 함수
export const refreshToken = async (data: RefreshTokenRequest) => {
  try {
    const response = await instance.post<RefreshTokenResponse>(
      "/auth/refresh-token",
      data,
    );
    return response;
  } catch (error) {
    console.error("토큰 갱신 오류", error);
    throw error;
  }
};

// 구글/카카오 앱 등록 함수
export const registerOAuthApp = async (appData: {
  appSecret: string;
  provider: "KAKAO";
}) => {
  try {
    const appKey = process.env.KAKAO_CLIENT_ID;

    const data = {
      ...appData,
      appKey: appKey, // 환경변수에서 가져온 appKey 추가
    };
    // API URL을 요청에 맞게 설정 (teamId는 URL 경로에 포함)
    const url = `https://winereview-api.vercel.app/10-4/oauthApps`;

    // `appData`를 본문으로 담아 POST 요청을 보냄
    const response = await instance.post(url, data);

    // 응답 반환
    return response;
  } catch (error) {
    console.error("OAuth 앱 등록 오류:", error);
    throw error;
  }
};

export const signIn = async (
  provider: "GOOGLE" | "KAKAO",
  signInData: {
    state: string;
    redirectUri: "http://localhost:3000";
    token: string;
  },
) => {
  try {
    // URL에서 provider를 동적으로 경로에 포함
    const url = `/auth/signIn/${provider}`;

    // 요청 본문을 `signInData`로 설정하여 POST 요청을 보냄
    const response = await instance.post(url, signInData);

    // 응답 반환
    return response.data;
  } catch (error) {
    console.error("OAuth 로그인 오류:", error);
    throw error;
  }
};
