<template>
    <router-link :to="{name:'postDetails',query:{id:item.id}}">
        <div class="left">
            <p class="iconfont icon-xiaoxi"></p>
            <span>333</span>
        </div>
        <div class="right">
            <img src="" alt="">
            <div class="user-info">
                <img src="" alt="">
                <span class="name">稀奇三人</span>
                <span class="time fr">三小时前</span>
            </div>
        </div>
    </router-link>
</template>

<script>

    export default {
        data() {
            return {}
        }
    }

</script>

<style scoped lang="less">
    a {
        width: 100%;
        border-bottom: 1px solid #d3d3d3;
        padding: 10px;
        position: relative;
        box-sizing: border-box;
        .left {
            position: absolute;
            top: 10px;
            left: 16px;
            p {
                font-size: 20px;
                color: #222;
            }
            span {
                color: #aaa;
            }
        }
        .right {
            width: 100%;
            padding-left: 50px;
            > img {
                margin-top: 5px;
                width: 230px;
                height: 120px;
                display: block;
                background-color: #ccc;
                border-radius: 4px;
            }
            .user-info {
                position: relative;
                img {
                    width: 20px;
                    height: 20px;
                    border-radius: 50%;
                }
                width: 100%;
                margin-top: 10px;
                padding-bottom: 5px;
                padding-top: 5px;
                .name {
                    font-size: 12px;
                    position: absolute;
                    top: 8px;
                    left: 24px;
                    color: #333;
                }
                .time {
                    font-size: 12px;
                    position: absolute;
                    top: 8px;
                    right: 10px;
                    color: #aaa;
                }
            }
        }
    }
</style>