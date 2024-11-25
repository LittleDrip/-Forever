<template>
    <u-comment-scroll style="padding: 0;" :disable="disable" @more="more">
        <u-comment :config="config" @submit="submit" @reply-page="replyPage" @before-data="beforeData">
            <!-- <template>导航栏卡槽</template> -->
            <template #header>
                <br>
                <h1>评论</h1>
            </template>
            <!-- <template #action="{ user }">动作卡槽{{ user.username }}</template> -->
            <!-- <template #avatar="{ id, user }">头像卡槽{{ user.avatar }}</template> -->
            <!-- <template #info>信息卡槽</template> -->
            <!-- <template #card>用户信息卡片卡槽</template> -->
            <!-- <template #func>功能区域卡槽</template> -->
        </u-comment>
    </u-comment-scroll>
</template>

<script setup lang="ts">
// 下载表情包资源emoji.zip https://gitee.com/undraw/undraw-ui/releases/tag/v0.0.0
// static文件放在public下,引入emoji.ts文件可以移动assets下引入,也可以自定义到指定位置
import emoji from '@/assets/emoji'
import { defineProps, reactive, ref, watch, toRef } from 'vue'
import { ConfigApi, UToast, CommentSubmitApi, CommentReplyPageApi } from 'undraw-ui'
import { AComment } from '@/api';
import { useUserStore } from '@/stores/user';
const userStore = useUserStore();
// 接收来自父组件的 articleId
const props = defineProps({
    articleId: {
        type: Number,
        required: true,
    },
});


defineOptions({
    name: 'comment'
})
const articleId = toRef(props, 'articleId'); // 将 articleId 映射为 ref
const config = reactive<ConfigApi>({
    user: {} as any, // 当前用户信息
    emoji: emoji,  // 表情包数据
    comments: [],  // 评论数据
    relativeTime: true,  // 开启人性化时间
    page: true, // 开启分页
    show: {
        likes: false,
        homeLink: false,
        address: false,
        level: false,

    }
})

// setTimeout(() => {
//     // 当前登录用户数据
//     config.user = {
//         username: userStore.userInfo.nickname,
//         avatar: userStore.userInfo.avatar || 'https://cdn.uviewui.com/uview/album/1.jpg',
//     } as any
// }, 500)
config.user = {
    username: "未登录",
    avatar: '',
} as any
watch(
    () => userStore.userInfo,
    (newUserInfo) => {
        if (newUserInfo.nickname) {
            config.user = {
                username: newUserInfo.nickname,
                avatar: newUserInfo.avatar,
            };
        }
    },
    { immediate: true } // 立即执行一次
);

const query = reactive({
    current: 1, // 当前页数
    size: 3, // 页大小
    total: 0,   // 评论总数 
    articleId: 1 // 文章id
})



// 评论数据加载函数
function fetchComments() {
    AComment.page(query).then((res) => {
        config.comments = res.data.list;
        query.total = res.data.total;
        query.current++;
    });
}

watch(
    () => articleId.value,
    (newId) => {
        query.articleId = newId; // 动态更新 articleId
        fetchComments(); // 重新加载评论数据

    },
    { immediate: true }
);

// 评论数据
// AComment.page(query).then(res => {
//     config.comments = res.data.list
//     query.total = res.data.total
//     query.current++
// })

// 提交评论事件
const submit = ({ content, parentId, finish }: CommentSubmitApi) => {
    // 做敏感词审核
    let str = '提交评论:' + content + ';\t父id: ' + parentId
    console.log(str)

    AComment.save({ articleId: query.articleId, content, parentId }).then(res => {
        if (res.code == 200) {
            finish(res.data)
            UToast({ message: '评论成功!', type: 'info' })
        } else {

            UToast({ message: '操作失败!', type: 'warn' })
        }
    })
}

// 是否禁用滚动加载评论
const disable = ref(false)

// 加载更多评论
const more = () => {
    if (query.current <= Math.ceil(query.total / query.size)) {
        AComment.page(query).then(res => {
            config.comments.push(...res.data.list)
            query.current++
        })
    } else {
        disable.value = true
    }
}

//回复分页
const replyPage = ({ parentId, pageNum, pageSize, finish }: CommentReplyPageApi) => {
    console.log(pageNum, pageSize)
    AComment.replyPage({ parentId, current: pageNum, size: pageSize, articleId: query.articleId }).then(res => {
        finish(res.data)
    })
}

// 加载前评论数据处理
function beforeData(val: any) {
    // console.log("123");
}
</script>

<style lang="scss" scoped>
.u-comment {
    padding: 0;
}

::v-deep(.scroll-btn) {



    bottom: 0% !important;
    left: 10% !important;
    font-size: 1.5em;
    // margin-top: 3em;
    // padding: 0.8em 1.5em;
    // font-weight: bold;
    color: #007bff;
    // background-color: #007bff;
    // border-radius: 5px;
    cursor: pointer;
    // transition: background-color 0.3s ease;

    // a {
    //     text-decoration: none;
    //     color: #ffffff;
    // }




}
</style>
