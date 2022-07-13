import axios from "axios";

export default defineEventHandler(async (event) => {
  const { public: publicRuntime } = useRuntimeConfig();
  if (event.req.method == "POST") {
    const {
      name,
      email,
      password,
    }: { name: string; email: string; password: string } = await useBody(event);
    try {
      await axios
        .post(`${publicRuntime.apiURL}/api/users`, {
          name,
          email,
          password,
        })
        .catch((e) => {
          throw Error("Request faild");
        });
    } catch (e) {
      console.error(e);
      return "faild";
    }
    return "ok";
  }

  event.res.statusCode = 404;
  return "Page not found";
});
