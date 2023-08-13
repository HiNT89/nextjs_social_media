import { useAuth } from "@/hooks/index";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import Loading from "./loading";
export interface AuthProps {
  children: any;
}
export function Auth({ children }: AuthProps) {
  const { user, firstLoading } = useAuth();
  const router = useRouter();
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!firstLoading && !user?._id) router.push("/login");
    }, 3000);
    return () => {
      clearTimeout(timeout);
    };
  }, [router, user, firstLoading]);
  if (!user?._id) return <Loading />;
  return <div>{children}</div>;
}
