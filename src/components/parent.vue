<template>
  <div>
    <child
      :message="messageForChild"
      @changeMessage="messageForChild = $event"
    ></child>
  </div>
</template>

<script>
import child from "./child.vue";
export default {
  data() {
    return {
      messageForChild: "hy parent......!!",
    };
  },
  components: {
    child,
  },
  methods: {
    changeText(e) {
      console.log(e);
      this.messageForChild = e;
    },
  },
};
</script>
