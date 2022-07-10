<script setup>
useHead({
  title: "Traccar Remix | Authentication",
});

const router = useRouter();
const authCookie = useCookie("JSESSIONID");
if (authCookie.value != undefined) {
  await navigateTo("/");
} else if (!router.currentRoute.value.fullPath.includes("login")) {
  await navigateTo("/auth/login");
}
</script>

<template>
  <div
    class="bg-white w-screen h-screen flex flex-col justify-center items-center"
  >
    <h1
      class="font-poppins font-extrabold text-5xl text-transparent bg-clip-text bg-gradient-to-tr from-blue-500 to-blue-300"
    >
      Traccar Remix
    </h1>
    <div
      class="animation flex flex-col justify-center items-center p-2 bg-gradient-to-br from-blue-900 via-blue-500 to-blue-200 border-[1px] w-10/12 rounded-md mt-5 sm:w-9/12 md:w-8/12 lg:w-6/12 lg:max-w-xl"
    >
      <div class="bg-white w-full rounded-sm">
        <NuxtPage />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.animation {
  animation: rotate_background 4s ease infinite;
  background-size: 400% 400%;
}

@keyframes rotate_background {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style>
