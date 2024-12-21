import axios from "axios";

// let accessToken: string | null = null;

// Axios 인스턴스 생성
const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

export default instance;

// instance.interceptors.request.use(
//   (config) => {
//     if (accessToken) {
//       config.headers.Authorization = `Bearer ${accessToken}`;
//     }
//     return config;
//   },
//   (error) => {
//     console.error("요청 오류:", error);
//     return Promise.reject(error);
//   },
// );

// instance.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   async (error) => {
//     const originalRequest = error.config;

//     // 401 Unauthorized 상태 처리
//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true; // 무한 루프 방지

//       try {
//         // 리프레시 토큰으로 새로운 액세스 토큰 요청
//         const { data } = await axios.post(
//           `${process.env.NEXT_PUBLIC_BASE_URL}/auth/refresh`,
//           {},
//           { withCredentials: true }, // 리프레시 토큰은 쿠키에서 가져옴
//         );

//         // 새로운 액세스 토큰 저장
//         accessToken = data.accessToken;

//         // 이전 요청에 새로운 토큰 설정 후 재시도
//         originalRequest.headers.Authorization = `Bearer ${accessToken}`;
//         return instance(originalRequest);
//       } catch (refreshError) {
//         console.error("리프레시 토큰 만료 또는 오류:", refreshError);
//         return Promise.reject(refreshError);
//       }
//     }

//     console.error("응답 오류:", error);
//     return Promise.reject(error);
//   },
// );

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
    // 오류 처리를 구체적으로 할 수도 있음 (예: 4xx, 5xx 응답 구분)
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
