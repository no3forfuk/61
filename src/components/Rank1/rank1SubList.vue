<template>
    <div>
        <ul>
            <li v-for="(item,index) in listInfo" :key="index">
                <router-link :to="{name:'rank2list',query:{level:item.ranking_level,id:item.id}}">
                    <div class="b-top">
                        <span class="text-white sort-number">{{index+1}}</span><span class="b-title rank-title-fs">#{{item.ranking_name}}</span>
                    </div>
                    <div class="b-bottom">
                        <div class="hot">
                            <!--<div class="b-hot">-->
                            <!--<span>222</span>-->
                            <!--</div>-->
                        </div>
                        <p class="b-content">{{item.ranking_desc}}</p>
                    </div>
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        data() {
            return {}
        },
        created() {

        },
        mounted() {

        },
        methods: {},
        props: ['listInfo']
    }

</script>

<style scoped lang="less">
    ul {
        width: 100%;
        overflow: hidden;
        padding: 10px;
        box-sizing: border-box;
        li {
            width: 100%;
            height: 90px;
            border-bottom: #D4D4D4 solid 1px;
            margin-bottom: 10px;
            .sort-number {
                display: block;
                width: 20px;
                height: 20px;
                background-color: #f0882c;
                border-radius: 2px;
                line-height: 20px;
                text-align: center;
                position: absolute;
                top: 1px;
                left: 4px;
            }
            .b-top {
                position: relative;
                width: 100%;
                line-height: 22px;

            }

            .b-title {
                width: 100%;
                padding-left: 40px;
                color: black;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }

            .b-bottom {
                margin-top: 10px;
                width: 100%;
                position: relative;
            }

            .b-content {
                width: 100%;
                height: 44px;
                overflow: hidden;
                color: #8b8b8b;
                padding-left: 45px;
                line-height: 22px;
                box-sizing: border-box;
            }

            .b-hot {
                position: relative;
                overflow: visible;

            }

            .b-hot span {
                position: absolute;
                top: 0px;
                right: -30px;
                z-index: 10;
            }

            .hot {
                color: black;
                position: absolute;
                top: 2px;
                left: 0px;
                overflow: visible;
            }
        }
    }
</style>