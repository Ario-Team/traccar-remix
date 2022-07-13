<script setup lang="ts">
import { nanoid } from "nanoid";
const email = reactive({ value: "" });
const password = reactive({ value: "" });
const isPending = reactive({ value: false });
const loginStatus = reactive({ value: "" });

useHead({
  title: "Traccar Remix | Login",
});
definePageMeta({
  pageTransition: {
    name: "auth",
    duration: 1000,
    mode: "out-in",
    appear: true,
  },
});
const login = async (e: SubmitEvent) => {
  e.preventDefault();
  isPending.value = true;
  const { data } = await useAsyncData(`login_${nanoid()}`, () =>
    $fetch("/api/auth/login", {
      method: "POST",
      body: {
        email: email.value,
        password: password.value,
      },
    })
  );
  isPending.value = false;
  loginStatus.value = data.value;
  if (loginStatus.value == "ok") {
    setTimeout(() => {
      (async () => {
        await navigateTo("/");
      })();
    }, 1500);
  } else if (loginStatus.value == "faild") {
    setTimeout(() => {
      loginStatus.value = "";
    }, 4000);
  }
};
</script>

<template>
  <div>
    <form class="px-4 py-5 flex flex-col gap-6" @submit="login">
      <div
        v-if="loginStatus.value == 'faild'"
        class="bg-red-500 text-white text-center font-bold py-5 errorAnimation"
      >
        Username/Password is Wrong
      </div>
      <Input
        type="email"
        placeholder="Enter your email"
        @updated-value="(e) => (email.value = e)"
      />
      <Input
        type="password"
        placeholder="Enter your password"
        @updated-value="(e) => (password.value = e)"
      />
      <AuthButton
        :disabled="email.value == '' && password.value == ''"
        :status="loginStatus.value"
        :isPending="isPending.value"
        text="Login"
      />
      <div class="w-full flex justify-center opacity-60">
        <NuxtLink
          to="/auth/register"
          class="text-gray-500 font-semibold text-sm opacity-70 transition-all duration-200 hover:text-blue-800 hover:opacity-100"
          >You don't have account? Register</NuxtLink
        >
      </div>
    </form>
  </div>
</template>

<style scoped lang="scss">
.errorAnimation {
  animation: errorAnimatioFrame 4s ease forwards;
}
@keyframes errorAnimatioFrame {
  0% {
    height: 0;
    padding: 0;
  }
  20% {
    height: auto;
    padding: 1.25rem 0;
  }
  100% {
    height: 0;
    padding: 0;
  }
}
</style>
