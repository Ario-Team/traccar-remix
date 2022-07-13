<script>
export default {
  name: "AuthButton",
  props: {
    status: String,
    isPending: String,
    disabled: Boolean,
    text: String,
  },
};
</script>

<template>
  <button
    class="w-full flex justify-center items-center bg-white border-2 border-gray-200 h-12 font-bold text-gray-400 transition-colors duration-200 hover:bg-blue-500 hover:text-white hover:border-transparent"
    :class="{
      'bg-blue-600': isPending,
      'bg-green-400': status == 'ok',
      'text-white': status == 'ok' || status == 'faild',
      'bg-red-500': status == 'faild',
    }"
    :disabled="disabled"
  >
    <span v-if="status == 'faild'">Faild</span>
    <Tick v-else-if="status == 'ok'" />
    <span v-else-if="!isPending">{{ text }}</span>
    <Spiner v-else />
  </button>
</template>
