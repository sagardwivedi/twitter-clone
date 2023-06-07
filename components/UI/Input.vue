<template>
  <div>
    <label
      v-if="props.label"
      class="ml-px block pl-3 text-sm font-medium text-gray-700"
      >{{ props.label }}</label
    >
    <input
      class="block w-full mt-2 rounded-full border-gray-300 px-4 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
      @input="(event) => emits('update:modelValue', event.target.value)"
      :value="props.modelValue"
      :placeholder="props.placeholder"
      :type="props.type"
    />
  </div>
</template>

<script setup>
const emits = defineEmits(["update:modelValue"])

const props = defineProps({
  label: {
    type: String,
    default: null,
  },
  type: {
    type: String,
    default: "text",
  },
  placeholder: {
    type: String,
    default: "",
  },
  modelValue: {
    type: String,
    required: true,
  },
});
</script>
