<script lang="ts">
import { PropType } from "vue";

export default {
  name: "Input",
  props: {
    type: String,
    placeholder: String,
    value: String,
  },
};
</script>

<script setup lang="ts">
import replaceIcon from "~~/functions/replaceIcons";
onMounted(() => replaceIcon());
</script>

<template>
  <div class="relative">
    <input
      :type="type"
      :placeholder="placeholder"
      :value="value"
      autocomplete="off"
      @input="(e) => $emit('updated-value', (e.target as HTMLInputElement).value)"
      class="peer border-blue w-full h-10 pl-11 outline-none border-[2px] transition-colors duration-150 border-gray-200 focus:border-blue-300 hover:border-blue-300"
    />
    <i
      :data-feather="
        type == 'text' ? 'user' : type == 'password' ? 'key' : 'mail'
      "
      class="absolute top-2 text-sm left-3 text-gray-200 peer-focus:text-blue-300 peer-hover:text-blue-300"
    ></i>
  </div>
</template>
