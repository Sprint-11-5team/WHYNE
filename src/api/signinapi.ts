// pages/api/auth/signin.ts
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

// 타입 정의 (선택 사항, 필요에 따라 추가)
interface KakaoTokenResponse {
  access_token: string;
}

interface KakaoUserInfoResponse {
  id: number;
  properties: {
    nickname: string;
    profile_image: string;
  };
  kakao_account: {
    email: string;
  };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // GET 요청만 처리
  if (req.method === "GET") {
    const { code } = req.query; // 카카오에서 받은 인증 코드

    if (!code) {
      return res.status(400).json({ error: "인증 코드가 없습니다." });
    }

    const tokenUrl = "https://kauth.kakao.com/oauth/token";
    const clientId = process.env.KAKAO_CLIENT_ID as string; // 환경 변수에서 카카오 앱의 REST API 키 가져오기
    const redirectUri = "http://localhost:3000"; // 리다이렉트 URI (카카오에 등록한 URI)

    try {
      // 카카오 API에 인증 코드로 Access Token 요청
      const response = await axios.post<KakaoTokenResponse>(
        tokenUrl,
        null, // body는 빈 값
        {
          params: {
            grant_type: "authorization_code",
            client_id: clientId,
            redirect_uri: redirectUri,
            code: code as string, // 카카오에서 받은 인증 코드
          },
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        },
      );

      const { access_token } = response.data; // 카카오로부터 받은 액세스 토큰

      // 액세스 토큰을 사용하여 사용자 정보 요청
      const userInfoResponse = await axios.get<KakaoUserInfoResponse>(
        "https://kapi.kakao.com/v2/user/me",
        {
          headers: {
            Authorization: `Bearer ${access_token}`, // 카카오에서 받은 액세스 토큰을 헤더에 포함
          },
        },
      );

      // 사용자 정보 응답
      return res.status(200).json(userInfoResponse.data); // 사용자 정보를 클라이언트로 반환
    } catch (error) {
      console.error("카카오 로그인 오류:", error);
      return res
        .status(500)
        .json({ error: "카카오 로그인 처리에 실패했습니다." });
    }
  } else {
    // GET 메소드가 아닌 다른 요청에 대한 처리
    return res.status(405).json({ error: "Method Not Allowed" });
  }
}
