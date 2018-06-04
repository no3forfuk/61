<template>
    <router-link
            :to="{name:'postDetails',query:{id:postinfo.id,ele_id:argments.id,rank_level:argments.rank_level,rank_id:argments.rank_id}}">
        <div class="left">
            <p class="iconfont icon-xiaoxi"></p>
            <span>{{postinfo.comment_num}}</span>
        </div>
        <div class="right">
            <p>{{postinfo.post_content}}</p>
            <img :src="postinfo.img" alt="">
            <div class="user-info">
                <img src="../../static/images/visitor.jpg" alt="">
                <span class="name">游客</span>
                <span class="time fr">{{postinfo.updated_at}}</span>
            </div>
        </div>
    </router-link>
</template>

<script>

    export default {
        data() {
            return {}
        },
        created() {

        },
        props: ['postinfo', 'argments']
    }

</script>

<style scoped lang="less">
    a {
        width: 100%;
        padding: 10px;
        position: relative;
        display: flex;
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
            p {
                color: #222;
            }
            > img {
                margin-top: 5px;
                max-width: 260px;
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