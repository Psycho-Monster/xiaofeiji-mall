<template>
  <div>
    <div class="goods">
      <div class="menu-wrapper" ref="menu">
        <ul>
          <!-- current -->
          <li
            class="menu-item"
            :class="{ current: currentIndex === index }"
            v-for="(good, index) in goods"
            :key="index"
            @click="selectItem(index)"
          >
            <span class="text bottom-border-1px">
              <img class="icon" :src="good.icon" v-if="good.icon" />
              {{ good.name }}</span
            >
          </li>
        </ul>
      </div>
      <div class="foods-wrapper" ref="foods">
        <ul ref="ulContainer">
          <li
            class="food-list-hook"
            v-for="(good, index) in goods"
            :key="index"
          >
            <h1 class="title">{{ good.name }}</h1>
            <ul>
              <li
                class="food-item bottom-border-1px"
                v-for="(food, index) in good.foods"
                :key="index"
                @click.stop="showFoodDetail(food)"
              >
                <div class="icon">
                  <img width="57" height="57" :src="food.icon" />
                </div>
                <div class="content">
                  <h2 class="name">{{ food.name }}</h2>
                  <p class="desc">{{ food.description }}</p>
                  <div class="extra">
                    <span class="count">月售{{ food.sellCount }}份</span>
                    <span>好评率{{ food.rating }}%</span>
                  </div>
                  <div class="price">
                    <span class="now">￥{{ food.price }}</span>
                    <span class="old" v-if="food.oldPrice"
                      >￥{{ food.oldPrice }}</span
                    >
                  </div>
                  <div class="cartcontrol-wrapper">
                    <CartControl :food="food" />
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <ShopCart />
    </div>
    <Food :food="food" ref="food" />
  </div>
</template>

<script>
import { mapState } from "vuex";
import BScroll from "@better-scroll/core";
import Food from "@/components/Food/Food.vue";
import ShopCart from "@/components/ShopCart/ShopCart.vue";

export default {
  data() {
    return {
      scrollY: 0,
      tops: [],
      food: {},
    };
  },
  mounted() {
    if (this.goods.length) {
      this.initScroll();
      this.initTops();
    }
  },
  computed: {
    ...mapState({
      goods: (state) => state.shop.goods,
    }),
    currentIndex() {
      // currentIndex的值依赖于this.scrollY
      return this.tops.findIndex(
        (top, index) =>
          this.scrollY >= top && this.scrollY < this.tops[index + 1]
      );
    },
  },
  watch: {
    goods() {
      this.$nextTick(() => {
        this.initScroll();
        this.initTops();
      });
    },
  },
  methods: {
    initScroll() {
      new BScroll(this.$refs.menu, {});
      this.rightScroll = new BScroll(this.$refs.foods, {
        probeType: 1,
        click: true,
      });
      this.rightScroll.on("scroll", ({ x, y }) => {
        this.scrollY = Math.abs(y);
        // probeType设为1只会触发一次，并没有达到理想的节流效果
      });
      this.rightScroll.on("scrollEnd", ({ x, y }) => {
        this.scrollY = Math.abs(y);
      });
    },
    initTops() {
      const { scrollY } = this;
      const tops = [0];
      let top = 0;
      const lis = Array.from(this.$refs.ulContainer.children);
      lis.forEach((li) => {
        top += li.clientHeight;
        tops.push(top);
      });
      this.tops = tops;
    },
    selectItem(index) {
      this.scrollY = this.tops[index];
      this.rightScroll.scrollTo(0, -this.scrollY, 300);
    },
    showFoodDetail(food) {
      console.log("showFoodDetail -> food", food);
      this.food = food;
      this.$refs.food.toggleShow();
    },
  },
  components: {
    Food,
    ShopCart,
  },
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixins.styl';

.goods {
  display: flex;
  position: absolute;
  top: 225px;
  bottom: 46px;
  width: 100%;
  background: #fff;
  overflow: hidden;

  .menu-wrapper {
    flex: 0 0 80px;
    width: 80px;
    background: #f3f5f7;

    .menu-item {
      display: table;
      height: 54px;
      width: 56px;
      padding: 0 12px;
      line-height: 14px;

      &.current {
        position: relative;
        z-index: 10;
        margin-top: -1px;
        background: #fff;
        color: $green;
        font-weight: 700;

        .text {
          border-none();
        }
      }

      .icon {
        display: inline-block;
        vertical-align: top;
        width: 12px;
        height: 12px;
        margin-right: 2px;
        background-size: 12px 12px;
        background-repeat: no-repeat;
      }

      .text {
        display: table-cell;
        width: 56px;
        vertical-align: middle;
        bottom-border-1px(rgba(7, 17, 27, 0.1));
        font-size: 12px;
      }
    }
  }

  .foods-wrapper {
    flex: 1;

    .title {
      padding-left: 14px;
      height: 26px;
      line-height: 26px;
      border-left: 2px solid #d9dde1;
      font-size: 12px;
      color: rgb(147, 153, 159);
      background: #f3f5f7;
    }

    .food-item {
      display: flex;
      margin: 18px;
      padding-bottom: 18px;
      bottom-border-1px(rgba(7, 17, 27, 0.1));

      &:last-child {
        border-none();
        margin-bottom: 0;
      }

      .icon {
        flex: 0 0 57px;
        margin-right: 10px;
      }

      .content {
        flex: 1;

        .name {
          margin: 2px 0 8px 0;
          height: 14px;
          line-height: 14px;
          font-size: 14px;
          color: rgb(7, 17, 27);
        }

        .desc, .extra {
          line-height: 10px;
          font-size: 10px;
          color: rgb(147, 153, 159);
        }

        .desc {
          line-height: 12px;
          margin-bottom: 8px;
        }

        .extra {
          .count {
            margin-right: 12px;
          }
        }

        .price {
          font-weight: 700;
          line-height: 24px;

          .now {
            margin-right: 8px;
            font-size: 14px;
            color: rgb(240, 20, 20);
          }

          .old {
            text-decoration: line-through;
            font-size: 10px;
            color: rgb(147, 153, 159);
          }
        }

        .cartcontrol-wrapper {
          position: absolute;
          right: 0;
          bottom: 12px;
        }
      }
    }
  }
}
</style>
