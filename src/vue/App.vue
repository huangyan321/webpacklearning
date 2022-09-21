<template>
  <div class="box">{{ name }}</div>
  <button @click="reverseName">反转</button>
</template>
<script>
import { ref } from 'vue';
export default {
  name: 'App',
  setup() {
    const name = ref('hello world');
    const reverseName = () => {
      name.value = name.value.split('').reverse().join('');
    };
    return { name, reverseName };
  },
};
</script>
<style lang="scss" scoped>
.box {
  color: red;
}
</style>
