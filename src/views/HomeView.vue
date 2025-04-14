<script setup lang="ts">
import router from '@/router';
import { ref, watch } from 'vue';
import Avatar from '@/components/head/avatar.vue';
import { useDarkMode } from '@/utils/useDarkMode';
const { isDarkMode, toggleDarkMode } = useDarkMode();
const value = ref(false)
//菜单
const menuItems = ["心理常识", "热点新闻", "诊断测试", "跃心助手", "论坛信息",];
// 搜索框内容
const searchQuery = ref("");

// 保存选中的菜单索引
const activeIndex = ref(0);
// 用户菜单显示状态
const userMenuVisible = ref(false);

watch(() => router.currentRoute.value, (to) => {
  const index = to.meta.menuIndex;
  activeIndex.value = typeof index === 'number' ? index : 0;
}, { immediate: true });


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
        心晴小屋
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
      <!-- 暗色模式 -->
      <div class="dark-mode">
        <div class="darkMode">
          <el-tooltip content="颜色主题" placement="bottom">
            <el-switch size="large" v-model="value" @click="toggleDarkMode"
              style="--el-switch-on-color: #2c2c2c; --el-switch-off-color: #f2f2f2">
              <template #active-action>
                <span class="custom-action">🌙</span>
              </template>
              <template #inactive-action>
                <span class="custom-action">🔆</span>
              </template>
            </el-switch>
          </el-tooltip>
        </div>
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
  overflow: hidden;
  font-family: "MiSans";
}

.header {
  z-index: 10;
  display: flex;
  align-items: center;
  font-size: 1em;
  min-height: 7.5vh;
  width: 100%;
  position: fixed;
  background-color: #ffffff;

  .darkMode {
    z-index: 999;
  }

  .custom-action {
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
  }

  .title {
    margin-left: 2em;
    flex: 0 0 10%;
    font-size: 20px;
    font-weight: bold;
    color: #333;
  }

  .menu-bar {
    flex: 0 0 40%;
    font-size: 1.5em;
    justify-content: center;
    display: flex;
    flex-wrap: nowrap;
    align-items: center;

    div {
      margin-left: 1.5em;
      color: var(--gray-2);
      white-space: nowrap;
      cursor: pointer;

      &.active {
        font-weight: bold;
        color: var(--black);
        border-bottom: 4px solid var(--lightblue);
      }
    }
  }

  .search-box {
    margin-left: 2em;

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
  }
}

.avatar-container {
  position: relative;
  margin-left: auto;
  margin-right: 10em;
}

// 媒体查询 - 手机横屏
@media screen and (max-width: 926px) {
  .header {
    padding: 0 1em;

    .title {
      margin-left: 0.5em;
      font-size: 16px;
      flex: 0 0 auto;
    }

    .menu-bar {
      flex: 1;
      font-size: 1em;
      margin-left: 1em;

      div {
        margin-left: 0.8em;
      }
    }

    .search-box {
      margin-left: 0.5em;

      .search-container {
        width: 8em;
      }

      .search-bar {
        height: 2.2em;
      }

      .search-input {
        padding: 4px 8px;
        font-size: 0.75em;

        &::placeholder {
          font-size: 0.9em;
        }
      }

      .search-icon {
        padding: 2px;
        margin-left: 4px;
        margin-right: 4px;

        img {
          width: 16px;
          height: 16px;
        }
      }
    }

    .avatar-container {
      margin-right: 1em;
    }

    .dark-mode {
      margin-right: 0.5em;
    }
  }
}

// 更小屏幕的适配
@media screen and (max-width: 768px) {
  .header {
    .search-box {
      display: none;
    }

    .menu-bar {
      font-size: 0.9em;

      div {
        margin-left: 0.5em;
      }
    }
  }
}

.main-container {
  flex: 1;
  background-color: #f5f5f5;
  display: flex;
  flex-direction: column;
  overflow: auto;
  width: 100%;
  margin-top: 7.5vh;

  .content {
    padding: 0;
    flex: 1;
  }

  .el-fade-in-linear-enter-active,
  .el-fade-in-linear-leave-active {
    transition: opacity 0.3s linear;
  }

  .el-fade-in-linear-enter-from,
  .el-fade-in-linear-leave-to {
    opacity: 0;
  }
}
</style>