export default function useLogin() {
  const loginCookie = useCookie("JSESSIONID");
  return {
    isLoggedIn: loginCookie.value != undefined,
  };
}
