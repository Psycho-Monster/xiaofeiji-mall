<template>
  <section class="msite">
    <!--首页头部-->
    <Header :title="address.name || '正在定位中'">
      <span
        class="header_search"
        slot="left"
        @click="$router.replace('/search')"
      >
        <i class="iconfont icon-sousuo"></i>
      </span>

      <span class="header_login" slot="right">
        <i v-if="user._id" class="iconfont icon-geren"></i>
        <span class="header_login_text" v-else @click="$router.push('/login')"
          >登录|注册</span
        >
      </span>
    </Header>
    <!--首页导航-->
    <nav class="msite_nav">
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <!-- categorysArr -->
          <div
            class="swiper-slide"
            v-for="(categorys, index) in categorysArr"
            :key="index"
          >
            <a
              href="javascript:"
              class="link_to_food"
              v-for="(c, index) in categorys"
              :key="index"
            >
              <div class="food_container">
                <img :src="'https://fuss10.elemecdn.com' + c.image_url" />
              </div>
              <span>{{ c.title }}</span>
            </a>
          </div>
        </div>
        <!-- Add Pagination -->
        <div class="swiper-pagination"></div>
      </div>
    </nav>
    <!--首页附近商家-->
    <ShopList />
  </section>
</template>

<script type="text/ecmascript-6">
import { mapState } from "vuex";
import Swiper from "swiper";
import "swiper/dist/css/swiper.css";
import chunk from "lodash/chunk";
import ShopList from "../../components/ShopList/ShopList";

export default {
  name: "Msite",

  computed: {
    ...mapState({
      address: (state) => state.msite.address,
      categories: (state) => state.msite.categories,
      user: (state) => state.user.user,
    }),
    categorysArr() {
      const { categories } = this;
      return chunk(categories, 8);
    },
  },

  // 组件界面初始显示之后立即回调
  async mounted() {
    // 分发action, 异步获取商家列表
    this.$store.dispatch("getShops");
    await this.$store.dispatch("getCategories"); // 返回的promise在状态数据变化且界面更新后才成功
    new Swiper(".swiper-container", {
      loop: true, // 循环模式选项
      pagination: {
        el: ".swiper-pagination",
      },
    });
  },
  components: {
    ShopList,
  },
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../../common/stylus/mixins.styl';

.msite { // 首页
  width: 100%;

  .msite_nav {
    bottom-border-1px(#e4e4e4);
    margin-top: 45px;
    height: 200px;
    background: #fff;

    .swiper-container {
      width: 100%;
      height: 100%;

      .swiper-wrapper {
        width: 100%;
        height: 100%;

        .swiper-slide {
          display: flex;
          justify-content: center;
          align-items: flex-start;
          flex-wrap: wrap;

          .link_to_food {
            width: 25%;

            .food_container {
              display: block;
              width: 100%;
              text-align: center;
              padding-bottom: 10px;
              font-size: 0;

              img {
                display: inline-block;
                width: 50px;
                height: 50px;
              }
            }

            span {
              display: block;
              width: 100%;
              text-align: center;
              font-size: 13px;
              color: #666;
            }
          }
        }
      }

      .swiper-pagination {
        >span.swiper-pagination-bullet-active {
          background: #02a774;
        }
      }
    }
  }
}
</style>
