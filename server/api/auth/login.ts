import axios from "axios";

export default defineEventHandler(async (e) => {
  const { public: publicRuntime } = useRuntimeConfig();
  let error = false;
  const { email, password } = await useBody(e);
  const res = await axios
    .post(`${publicRuntime.apiURL}/api/session`, null, {
      params: {
        email,
        password,
      },
    })
    .catch(() => {
      error = true;
    });
  if (error) {
    return "faild";
  }
  if (typeof res == "object") {
    setCookie(
      e,
      "JSESSIONID",
      res.headers["set-cookie"].toString().split(";")[0].split("=")[1]
    );
    return "ok";
  }
});
