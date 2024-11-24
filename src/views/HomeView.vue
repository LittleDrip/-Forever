<script setup lang="ts">
import router from '@/router';
import { ref } from 'vue';
import Avatar from '@/components/head/avatar.vue';
//菜单
const menuItems = ["心理常识", "诊断测试", "慰藉中心", "青少年心理", "论坛信息", "热点新闻"];
// 搜索框内容
const searchQuery = ref("");

// 保存选中的菜单索引
const activeIndex = ref(0);
// 用户菜单显示状态
const userMenuVisible = ref(false);

// 切换用户菜单显示状态
const toggleUserMenu = () => {
  userMenuVisible.value = !userMenuVisible.value;
};

// 登录操作
const handleLogin = () => {
  console.log("跳转到登录页面");
  router.push({ name: "login" });
};

// 点击菜单时，更新选中的索引
const handleMenuClick = (index: number, item: any) => {
  activeIndex.value = index;
  // TODO: 进行路由跳转
  router.push({ name: item });
};
const handleSearch = () => {
  console.log("搜索内容:", searchQuery.value);
  // TODO: 执行搜索逻辑
};
</script>

<template>
  <div class="home">
    <div class="header">

      <div class="title">
        跃动Forever
      </div>
      <!-- 菜单栏 -->
      <div class="menu-bar">
        <div v-for="(item, index) in menuItems" :key="index" :class="{ active: activeIndex === index }"
          @click="handleMenuClick(index, item)">
          {{ item }}
        </div>

        <!-- 搜索框 -->
        <div class="search-box">
          <div class="search-container">
            <div class="search-bar">
              <input type="text" class="search-input" placeholder="Search..." />
              <div class="search-icon">

                <img src="../assets/svg/search.svg" alt="">
              </div>
            </div>
            <div class="glow"></div>
          </div>
        </div>
      </div>

      <!-- 登录头像 -->
      <div class="avatar-container">
        <Avatar />
      </div>
    </div>

    <div class="main-container">
      <div class="content">
        <transition name="el-fade-in-linear">
          <router-view />
        </transition>
        <!-- <router-view></router-view> -->
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.home {
  width: 100%;
  height: 100%;
  overflow: hidden; // 防止超出滚动
  font-family: "MiSans";
}

.header {




  z-index: 1000;
  /* 确保导航栏位于最上方 */
  display: flex;
  align-items: center; // 垂直居中
  // justify-content: center; // 水平居中（可选，根据需求调整）
  font-size: 1em;
  min-height: 7.5vh;
  width: 100%;
  position: fixed;
  background-color: #ffffff; // 示例背景色

  .title {
    margin-left: 2em;
    flex: 0 0 10%;
    /* 占 20% */
    font-size: 20px; // 根据需求设置字体大小
    font-weight: bold;
    color: #333; // 字体颜色
  }

  .menu-bar {
    flex: 0 0 40%;
    /* 占 60% */
    font-size: 1.5em;
    justify-content: center;
    // margin-left: 2em;
    display: flex;
    flex-wrap: nowrap;
    /* 不允许换行 */
    align-items: center; // 垂直居中

    div {
      margin-left: 1.5em;
      color: var(--gray-2);
      white-space: nowrap;
      /* 防止文本换行 */
      cursor: pointer;

      &.active {
        font-weight: bold;
        color: var(--black); // 高亮颜色
        border-bottom: 4px solid var(--lightblue); // 下划线高亮
      }
    }
  }



  .search-box {
    /* 占 20% */
    margin-left: 2em;


    /* From Uiverse.io by themrsami */
    .search-container {
      position: relative;
      width: 18em;
    }

    .search-bar {
      border: #000 1px solid;
      position: relative;
      display: flex;
      align-items: center;
      background-color: #fff;
      border-radius: 4em;

      overflow: hidden;
      transition: all 0.3s ease;
    }

    .search-input {
      width: 100%;
      border: none;
      background: none;
      color: #000;
      font-size: .8em;
      padding: 10px;
      outline: none;
    }



    .search-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 4px;
      background-color: #fff;
      border-radius: 50%;
      margin-left: 10px;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }

    .search-icon svg {
      fill: #000;
    }



  }

}

.avatar-container {
  position: relative;
  margin-left: auto; // 推到右侧
  margin-right: 2em;
}


.main-container {
  flex: 1; // 占满剩余空间
  background-color: #f5f5f5; // 灰色背景
  display: flex; // 可以用于子元素的布局
  flex-direction: column; // 子元素垂直排列
  overflow: auto; // 如果内容超出容器，允许滚动
  width: 100%; // 添加此行
  margin-top: 7.5vh;
  // min-height: 100vh;

  .content {
    // margin: 0 15em; // 设置左右两边的空白距离
    padding: 0; // 内容的内边距（可选）
    // background-color: #ffffff; // 内容区域的白色背景s
    flex: 1; // 子元素撑满父容器

  }



  .el-fade-in-linear-enter-active,
  .el-fade-in-linear-leave-active {
    transition: opacity 0.3s linear; // 设置过渡效果
  }

  .el-fade-in-linear-enter-from,
  .el-fade-in-linear-leave-to {
    opacity: 0; // 初始状态或消失状态
  }
}
</style>
