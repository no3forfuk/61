<template>
    <router-link
            :to="{name:'postDetails',query:{id:postinfo.id,ele_id:argments.id,rank_level:argments.rank_level,rank_id:argments.rank_id}}">
        <div class="left">
            <i class="iconfont icon-xiaoxi"></i>
            <span>{{postinfo.comment_num}}</span>
        </div>
        <div class="right">
            <p v-text="postinfo.post_content"></p>
            <div class="user-info">
                <img :src="postinfo.user.avatar" alt="">
                <span class="name">{{postinfo.user.name}}</span>
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
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        padding: 10px 0;
        color: #000;
        .left {
            flex: 0 0 50px;
            display: inline-flex;
            flex-direction: column;
            align-items: center;
            i {
                margin-top: 5px;
                line-height: 16px;
            }
            span {
                line-height: 16px;
            }
        }
        .right {
            padding: 0 10px;
            padding-left: 4px;
            flex: 1;
            p {
                padding-left: 2px;
                max-height: 60px;
                overflow: hidden;
                text-align: justify;
            }
            .user-info {
                padding: 10px 0;
                color: #000;
                height: 40px;
                position: relative;
                img {
                    display: inline-block;
                    width: 20px;
                    height: 20px;
                    border-radius: 50%;
                }
                span:nth-child(2) {
                    display: inline-block;
                    position: absolute;
                    top: 12px;
                    margin-left: 10px;
                }
                span:nth-child(3) {
                    color: #8B8B8B;
                }
            }
        }
    }
</style>