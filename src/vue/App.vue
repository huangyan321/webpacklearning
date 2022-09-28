<template>
  <div class="box">{{ name }}</div>
  <button @click="reverseName">反转</button>
  <hr />
  <router-link to="/home">Home</router-link>
  <router-link to="/about">About</router-link>
  <router-view></router-view>
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
@import '../css/hello-scss.scss';
.box {
  color: red;
}
</style>
