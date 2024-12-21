"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SaveTokenLocalStorage({ token }: { token: string }) {
  const router = useRouter();
  useEffect(() => {
    localStorage.setItem("accessToken", token);

    // 1. 상태를 변화 시켜주고.

    // Redirect

    router.push("/");
  }, [token, router]);

  return (
    <div>
      <h1 className="mb-12">Auth Callback</h1>
      <div>{JSON.stringify(token)}</div>
    </div>
  );
}
