<template>
  <tabbar
    v-model="active"
    @change="toggleTabBar"
    v-if="$route.path !== '/login'"
  >
    <tabbar-item icon="home-o">外卖</tabbar-item>
    <tabbar-item icon="search">搜索</tabbar-item>
    <tabbar-item icon="friends-o">订单</tabbar-item>
    <tabbar-item icon="setting-o">我的</tabbar-item>
  </tabbar>
</template>

<script>
import { Tabbar, TabbarItem } from "vant";
export default {
  data() {
    return {
      msg: "App Component",
      active: 0,
    };
  },
  created() {
    this.toggleTabBar(this.$route.path);
  },
  methods: {
    toggleTabBar(index) {
      switch (index) {
        case 0:
          this.$router.push("/");
          break;
        case 1:
          this.$router.push("/search");
          break;
        case 2:
          this.$router.push("/order");
          break;
        case 3:
          this.$router.push("/personal");
          break;
        default:
          this.$router.push("/");
          break;
      }
    },
  },
  components: {
    Tabbar,
    TabbarItem,
  },
};
</script>

<style>
</style>