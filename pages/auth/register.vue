<script setup lang="ts">
import { nanoid } from "nanoid";

definePageMeta({
  pageTransition: {
    name: "auth",
    duration: 1000,
    mode: "out-in",
    appear: true,
  },
});

const name = reactive({ value: "" });
const email = reactive({ value: "" });
const password = reactive({ value: "" });
const isPending = reactive({ value: false });
const requestStatus = reactive({ value: "" });

const formSubmit = async (e: SubmitEvent) => {
  e.preventDefault();
  isPending.value = true;
  const { data } = await useAsyncData(`${nanoid()}-register`, () =>
    $fetch("/api/auth/register", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: {
        name: name.value,
        email: email.value,
        password: password.value,
      },
    })
  );
  requestStatus.value = data.value;
  console.dir(requestStatus.value);
  isPending.value = false;
  const timeout = setTimeout(() => {
    requestStatus.value = "";
    clearTimeout(timeout);
  }, 5000);
  const timer = setInterval(async () => {
    await navigateTo("/auth/login", { replace: true });
  }, 5300);
};
</script>

<template>
  <div>
    <form class="px-4 py-5 flex flex-col gap-6" @submit="formSubmit">
      <div
        v-show="requestStatus.value == 'faild'"
        class="bg-red-500 text-white font-bold h-10 flex justify-center items-center"
      >
        User already exists
      </div>
      <div class="w-full flex flex-row justify-center gap-3">
        <Input
          type="text"
          placeholder="Enter your full name"
          @updated-value="(e) => (name.value = e)"
        />
        <Input
          type="email"
          placeholder="Enter your email"
          @updated-value="(e) => (email.value = e)"
        />
      </div>
      <Input
        type="password"
        placeholder="Enter your password"
        @updated-value="(e) => (password.value = e)"
      />
      <AuthButton
        :status="requestStatus.value"
        :isPending="isPending.value"
        :disabled="
          (name.value == '' && email.value == '' && password.value == '') ||
          requestStatus.value == 'faild'
        "
        text="Register"
      />
    </form>
  </div>
</template>
