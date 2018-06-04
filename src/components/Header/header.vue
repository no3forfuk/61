<template>
    <div class="text-white theme-color-bg header">
        <div class="header-icon">
            <i class="iconfont icon-jiantou fl" @click="back" style="transform: rotate(-180deg)"></i>
            <i class="iconfont icon-tubiaozhizuomoban" @click="goHome"></i>
            <!--<i class="iconfont icon-fenxiang"></i>-->
        </div>
        <div class="header-title">
            <slot name="title">
                <p>标题</p>
            </slot>
        </div>
    </div>
</template>

<script>

    export default {
        data() {
            return {}
        },
        created() {

        },
        methods: {
            back() {
                this.$router.back();
            },
            goHome() {
                this.$router.replace('/');
            }
        },
        props: ['title', 'flag']
    }

</script>

<style scoped lang="less">
    .header {
        width: 100%;
        height: 81px;
        background-color: #2D394C;
        box-shadow: 0px 0px 10px #080808;
        display: flex;
        flex-direction: column;
        .header-icon {
            padding: 5px 8px;
            height: 30px;
            line-height: 30px;
            i {
                font-size: 24px;
                margin-right: 10px;
            }
        }
        .header-title {
            height: 45px;
            padding: 5px 15px;
            font-size: 24px;
            line-height: 45px;
        }
    }

</style>