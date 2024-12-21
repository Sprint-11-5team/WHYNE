import SaveTokenLocalStorage from "./_components/save-token-localstorage";

async function fetchKakaoToken(code: string) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    redirectUri: "http://localhost:3000/oauth/kakao",
    token: code,
  });

  return fetch("https://winereview-api.vercel.app/10-4/auth/signIn/KAKAO", {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  })
    .then((response) => response.json())
    .then()
    .catch((error) => console.error(error));
}

export default async function KakaoAuthPage({
  searchParams,
}: {
  searchParams: {
    code: string;
  };
}) {
  const response = await fetchKakaoToken(searchParams.code);

  console.log("$$ response", response);

  return (
    <div>
      <h1 className="mb-12">Auth Callback</h1>
      <div>{JSON.stringify(searchParams)}</div>

      <SaveTokenLocalStorage token={response.accessToken} />
    </div>
  );
}

