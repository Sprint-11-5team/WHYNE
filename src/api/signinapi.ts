import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

// 카카오에서 받은 인증 코드로 액세스 토큰을 요청하는 코드
interface KakaoTokenResponse {
  access_token: string;
}

const apiClient = axios.create({
  baseURL: "https://kauth.kakao.com", // 카카오 API 기본 URL 설정
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // Step 1: 인가 코드 받기
  if (req.method === "GET" && req.query.code) {
    const { code } = req.query; // 카카오에서 받은 인증 코드

    if (!code) {
      return res.status(400).json({ error: "인증 코드가 없습니다." });
    }

    const tokenUrl = "/oauth/token"; // 카카오 토큰 요청 엔드포인트
    const clientId = process.env.KAKAO_CLIENT_ID as string; // .env.local에서 설정한 카카오 앱의 REST API 키
    const redirectUri = "http://localhost:3000"; // 리다이렉트 URI (카카오에 등록한 URI)

    try {
      // Step 2: 카카오 API에 인증 코드로 Access Token 요청
      const response = await apiClient.post<KakaoTokenResponse>(
        tokenUrl,
        null,
        {
          params: {
            grant_type: "authorization_code",
            client_id: clientId,
            redirect_uri: redirectUri,
            code: code as string, // 카카오에서 받은 인증 코드
          },
        },
      );

      const { access_token } = response.data; // 카카오에서 받은 액세스 토큰

      // Step 3: 외부 API에 전달할 데이터 준비
      const winereviewApiUrl =
        "https://winereview-api.vercel.app/10-4/auth/signIn/KAKAO";

      // 새로 요청하는 API의 request body는 { state, redirectUri, token } 형식
      const requestBody = {
        state: "string", // 요청 body에 요구된 'state' 값
        redirectUrI: "http://localhost:3000/oauth/kakao", // 리다이렉트 URI
        token: access_token, // 카카오에서 받은 access_token
      };

      // 외부 API에 POST 요청 보내기
      const winereviewApiResponse = await axios.post(
        winereviewApiUrl,
        requestBody,
      );

      // 외부 API 호출 성공 시 사용자 정보를 클라이언트로 반환
      return res.status(200).json(winereviewApiResponse.data);
    } catch (error) {
      console.error("카카오 로그인 오류:", error);
      return res
        .status(500)
        .json({ error: "카카오 로그인 처리에 실패했습니다." });
    }
  } else {
    // Step 1: 인가 코드를 받기 위한 리다이렉트
    const clientId = process.env.KAKAO_CLIENT_ID as string;
    const redirectUri =
      process.env.REDIRECT_URI || "http://localhost:3000/oauth/kakao";
    const authorizationUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code`;

    // 카카오 로그인 페이지로 리다이렉트
    return res.redirect(authorizationUrl);
  }
}
