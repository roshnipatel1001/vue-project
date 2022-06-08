<template>
  <div>Message:{{ message }}</div>
  <button @click="changeMessage()">Change Text</button>
</template>

<script>
export default {
  props: ["message"],
  data() {
    return {
      text: "hy child!!!!!!!",
    };
  },
  methods: {
    changeMessage() {
      this.$emit("changeMessage", this.text);
    },
  },
};
</script>
