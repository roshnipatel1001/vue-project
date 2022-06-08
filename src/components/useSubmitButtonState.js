import { computed } from "vue";

export default function useSubmitButtonState(user, errors) {
  const isSignupButtonDisabled = computed(() => {
    let disabled = true;
    console.log(user);
    console.log(errors);
    for (let prop in user) {
      if (!user[prop] || errors[prop]) {
        console.log(prop);
        disabled = true;
        break;
      }
      console.log(disabled);

      disabled = false;
    }
    return disabled;
  });

  return { isSignupButtonDisabled };
}
