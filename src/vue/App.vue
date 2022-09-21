<template>
  <div class="box" @click="reverseName">{{ name }}</div>
</template>
<script>
import { ref } from 'vue';
export default {
  name: 'App',
  setup() {
    const name = ref('hello world');
    const reverseName = () => {
      console.log(123);
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
