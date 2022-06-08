<template>
  <section class="signup-view">
    <form @submit.prevent novalidate class="ui form">
      <div class="ui stacked segment">
        <EmailField v-model="user.email" />
        <PasswordField v-model="user.password" />
        <button
          class="ui button red fluid"
          :disabled="isSignupButtonDisabled"
          @click="loginButtonPressed"
        >
          LOG IN
        </button>
      </div>
    </form>
  </section>
</template>

<script>
import { reactive } from "vue";
import EmailField from "./EmailField.vue";
import PasswordField from "./PasswordField.vue";
import useFormValidation from "./useFormValidation";
import useSubmitButtonState from "./useSubmitButtonState";

export default {
  components: {
    EmailField,
    PasswordField,
  },
  setup() {
    let user = reactive({
      email: "",
      password: "",
    });
    const { errors } = useFormValidation();
    const { isSignupButtonDisabled } = useSubmitButtonState(user, errors);
    const loginButtonPressed = () => {
      console.log(user);
    };

    return {
      user,
      isSignupButtonDisabled,
      loginButtonPressed,
    };
  },
};
</script>
