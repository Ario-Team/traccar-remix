<script>
export default {
  name: "AuthButton",
  props: {
    loginStatus: String,
    isPending: String,
    disabled: Boolean,
  },
};
</script>

<template>
  <button
    class="w-full flex justify-center items-center bg-white border-2 border-gray-200 h-12 font-bold text-gray-400 transition-colors duration-200 hover:bg-blue-500 hover:text-white hover:border-transparent"
    :class="{
      'bg-blue-600': isPending,
      'bg-green-400': loginStatus == 'ok',
      'text-white': loginStatus == 'ok' || loginStatus == 'faild',
      'bg-red-500': loginStatus == 'faild',
    }"
    :disabled="disabled"
  >
    <span v-if="loginStatus == 'faild'">Faild</span>
    <Tick v-else-if="loginStatus == 'ok'" />
    <span v-else-if="!isPending"> Login </span>
    <Spiner v-else />
  </button>
</template>
