<template>
  <div class="field">
    <div class="ui left icon input big">
      <i class="phone icon"></i>

      <input
        type="text"
        placeholder="Phone"
        autocomplete="off"
        @input="$emit('update:modelValue', $event.target.value)"
        v-model="input"
        @keyup="validateInput"
        @blur="validateInput"
      />
    </div>
    <div class="ui basic label pointing red" v-if="errors.phone">
      {{ errors.phone }}
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import useFormValidation from "./useFormValidation";
export default {
  setup() {
    let input = ref("");
    const { validatePhoneField, errors } = useFormValidation();
    const validateInput = () => {
      validatePhoneField("phone", input.value);
    };
    return { input, errors, validateInput };
  },
};
</script>
