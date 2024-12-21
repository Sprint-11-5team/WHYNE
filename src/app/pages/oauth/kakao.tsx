import { useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";

const KakaoCallbackPage = () => {
  const router = useRouter();

  useEffect(() => {
    const { code } = router.query; // URL에서 'code' 파라미터를 추출

    if (code) {
      // 인증 코드가 있으면 POST 요청을 사용해서 액세스 토큰을 받아옵니다.
      axios
        .post(
          "https://winereview-api.vercel.app/10-4/auth/signIn/KAKAO", // 외부 API 서버의 POST URL
          {
            state: "string", // 요청 body에 요구된 'state' 값 (예시로 "string" 사용)
            redirectUri: "http://localhost:3000/oauth/kakao", // 리다이렉트 URI
            token: code, // 카카오에서 받은 인증 코드
          },
        )
        .then((response) => {
          const data = response.data;
          if (data.token) {
            // 액세스 토큰을 로컬스토리지나 상태로 저장 후 리디렉션
            localStorage.setItem("accessToken", data.token);
            router.push("/"); // 홈 페이지로 리디렉션
          } else {
            alert("카카오 로그인에 실패했습니다.");
            router.push("/signin"); // 로그인 페이지로 리디렉션
          }
        })
        .catch((error) => {
          console.error("카카오 로그인 오류:", error);
          alert("로그인 처리에 실패했습니다.");
          router.push("/signin"); // 로그인 페이지로 리디렉션
        });
    }
  }, [router]); // router를 종속성 배열에 추가

  return (
    <div>
      <h2>카카오 로그인 중...</h2>
    </div>
  );
};

export default KakaoCallbackPage;
