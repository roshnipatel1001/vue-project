<template>
  <section class="signup-view">
    <form @submit.prevent novalidate class="ui form">
      <NameField v-model="user.name" />
      <EmailField v-model="user.email" />
      <PhoneField v-model="user.phone" />
      <PasswordField v-model="user.password" />
      <button
        class="ui button red fluid big"
        :disabled="isSignupButtonDisabled"
        @click="signUpButtonPressed"
      >
        SIGN UP
      </button>
    </form>
  </section>
</template>

<script>
import NameField from "./NameField.vue";
import EmailField from "./EmailField.vue";
import PhoneField from "./PhoneField.vue";
import PasswordField from "./PasswordField.vue";
import useFormValidation from "./useFormValidation";
import useSubmitButtonState from "./useSubmitButtonState";
import { reactive } from "vue";

export default {
  components: {
    NameField,
    EmailField,
    PhoneField,
    PasswordField,
  },
  setup() {
    let user = reactive({
      name: "",
      email: "",
      phone: "",
      password: "",
    });

    const { errors } = useFormValidation();
    const { isSignupButtonDisabled } = useSubmitButtonState(user, errors);
    console.log(isSignupButtonDisabled);

    const signUpButtonPressed = () => {
      console.log(user);
    };
    return { user, isSignupButtonDisabled, signUpButtonPressed };
  },
};
</script>
<style scoped>
.signup-view {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
.form {
  width: 450px;
}
</style>
