<template>
    <ul>
        <router-link :to="{name:'rank2Details',query:{id:this.rank_id}}">
            <li><i class="iconfont icon-bianji"></i></li>
        </router-link>
        <router-link :to="{name:''}">
            <li class="center" @click="addElement"><i class="iconfont icon-tianjia"></i>添加元素</li>
        </router-link>
        <router-link :to="{name:''}">
            <li><i class="iconfont icon-biaoqian" @click="addElement"></i>关注</li>
        </router-link>
    </ul>
</template>

<script>

    export default {
        data() {
            return {}
        },
        created() {

        },
        methods: {
            addElement() {
                this.$toast({
                    message: '开发中，敬请期待',
                    duration: 1000
                })
            }
        },
        props: ['rank_id']
    }

</script>

<style scoped lang="less">
    ul {
        width: 100%;
        border-top: solid 1px #D4D4D4;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        box-shadow: 0px 5px 16px -10px #8b8b8b;
        a {
            color: #000;
            display: block;
            flex: 1/3;
            li {
                text-align: center;
                height: 50px;
                line-height: 50px;
            }
            .center {
                border-left: 1px solid #D4D4D4;
                border-right: 1px solid #D4D4D4;
            }
        }

    }

</style>