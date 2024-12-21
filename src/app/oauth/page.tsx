const KAKAO_CLIENT_ID = "1dda610b59313ba1798ad40bbd30d8d5";
const REDIRECT_URI = "http://localhost:3000/oauth/kakao";

// https://kauth.kakao.com/oauth/authorize?client_id=1dda610b59313ba1798ad40bbd30d8d5&redirect_uri=http://localhost:3000/oauth/kakao
export default function AuthPage() {
  return (
    <div>
      <h1 className="mb-12">Auth Playground</h1>
      <div>
        <a
          href={`https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`}
          className="bg-gray-500 p-4 text-3xl"
        >
          Kakao Login
        </a>
      </div>
    </div>
  );
}
