import { useMutation } from "@tanstack/react-query";
import { authApi } from "../auth-api";
import { useNotificationContext } from "../../context/notification";
import { useNavigate } from "react-router-dom";

export function useSignUp() {
  const notification = useNotificationContext();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: authApi.signUp,
    onSuccess(data) {
      notification.success("Sign up successfully");
      const accessToken = data.data.accessToken;
      localStorage.setItem("accessToken", accessToken);
      navigate("/");
    },
  });
}

export function useSignIn() {
  const notification = useNotificationContext();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: authApi.signIn,
    onSuccess(data) {
      notification.success("Sign in successfully");
      const accessToken = data.data.accessToken;
      localStorage.setItem("accessToken", accessToken);
      navigate("/");
    },
  });
}

export function useSignUpArtist() {
  const notification = useNotificationContext();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: authApi.signUpArtist,
    onSuccess(data) {
      notification.success("Sign up successfully");
      const accessToken = data.data.accessToken;
      localStorage.setItem("accessToken", accessToken);
      navigate("/");
    },
  });
}

export function useSignInArtist() {
  const notification = useNotificationContext();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: authApi.signInArtist,
    onSuccess(data) {
      notification.success("Sign in successfully");
      const accessToken = data.data.accessToken;
      localStorage.setItem("accessToken", accessToken);
      navigate("/");
    },
  });
}
