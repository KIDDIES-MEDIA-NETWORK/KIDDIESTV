import { apiSetup } from "./apiService";

export const authService = apiSetup.injectEndpoints({
  endpoints(build) {
    return {
      registerUser: build.mutation({
        query: (body) => ({ url: "register", method: "post", body: body }),
      }),
      loginUser: build.mutation({
        query: (body) => ({ url: "login", method: "post", body: body }),
      }),
      verifyOtp: build.mutation({
        query: (body) => ({ url: "verify/otp", method: "post", body }),
      }),
      resetPassword: build.mutation({
        query: (body) => ({ url: "password/reset", method: "post", body }),
      }),
      forgotPassword: build.mutation({
        query: (body) => ({ url: "password/forgot", method: "post", body }),
      }),
     
    };
  },
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useVerifyOtpMutation,
  useResetPasswordMutation,
  useForgotPasswordMutation,
} = authService;
