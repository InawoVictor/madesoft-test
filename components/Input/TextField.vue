<template>
    <!-- Base Input (text, email, password) -->
    <div class="relative">
        <label class="label-style" :for="label" v-if="label">{{ label }}</label>
        <div class="">
            <input
            :id="label"
            :type="type"
            :value="modelValue"
            :placeholder="placeholder"
            v-bind="$attrs"
            @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
            class="base-input"
            :class="{ err: error }"
            :required="required"
            />
            <Icon
            v-if="password"
            class="mdi absolute top-[55%]  text-slate-600 right-4 cursor-pointer"
            :class="{ 'err-message': error }"
            :name="type === 'password' ? 'mdi:eye-off-outline' : 'mdi:eye-outline'"
            @click="$emit('changeType')"
            />
        </div>
        <small
            :class="{ 'err-message': error }"
            v-if="error && errorMessage"
            aria-live="assertive"
            :id="`${label}-error`"
            >{{ errorMessage }}</small
        >
        <small
            :class="{ 'err-message': error }"
            v-else-if="error && !errorMessage"
            aria-live="assertive"
            :id="`${label}-error`"
            >{{ label }} is required</small
        >
    </div>
  </template>
  
  <script setup lang="ts">
//   import { Icon } from '@iconify/vue'
//   interface Props {
//     type: string
//     modelValue: string | number | object
//     label?: string
//     placeholder?: string
//     password?: boolean
//     error?: string | boolean
//     errorMessage?: string | boolean
//   }
  
  const props = defineProps({
    type: {
        type: String,
        default: 'text',
    },
    modelValue: {
        type: [String, Number, Object],
        default: '',
    },
    label: {
        type: String,
        default: '',
    },
    placeholder: {
        type: String,
        default: '',
    },
    password: {
        type: Boolean,
        default: false,
    },
    error: {
        type: [String, Boolean],
        default: false,
    },
    errorMessage: {
        type: [String, Boolean],
        default: false,
    },
    required: {
        type:  Boolean,
        default: false,
    },
})
const emit = defineEmits(['changeType', 'update:modelValue'])
</script>

<style lang="scss" scoped></style>