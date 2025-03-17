import React, { useEffect } from "react";
import { useGetCurrentUser } from "../../apis/react-query/user-react-query";
import { useNavigate } from "react-router-dom";

interface IProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: IProtectedRouteProps) {
  const navigate = useNavigate();
  const { data, isError } = useGetCurrentUser();

  useEffect(() => {
    if (isError) {
      navigate("/sign-in");
    } else if (data && data.data.role === "user") {
      navigate("/sign-in");
    }
  }, [isError, data, navigate]);

  if (!data && isError) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
}
