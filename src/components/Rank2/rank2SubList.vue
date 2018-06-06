<template>
    <ul @click="clickTimes">
        <li v-for="(item,index) in listInfo" :key="index">
            <router-link
                    :to="{name:'elementDetails',query:{id:item.id,rank_level:rankInfo.ranking_level,rank_id:rankInfo.id}}">
                <div class="rank-list-left">
                    <span>{{index+1}}</span>
                    <span>{{item.exponent || 10}}</span>
                </div>
                <div class="rank-list-right">
                    <p>@{{item.element_name}}</p>
                    <p>{{item.element_desc}}</p>
                </div>
            </router-link>
        </li>
    </ul>
</template>

<script>
    import {statistics} from '../../utils/utils'

    export default {
        data() {
            return {}
        },
        created() {

        },
        mounted() {

        },
        methods: {
            clickTimes() {
                statistics('02004', 1, 1, 2)
            }
        },
        props: ['listInfo', 'rankInfo']
    }

</script>

<style scoped lang="less">
    ul {
        li:nth-child(1) {
            .rank-list-left {
                span:nth-child(1) {
                    opacity: 1;
                    background-color: #F0882C;
                }
            }
        }
    }

    ul {
        li:nth-child(2) {
            .rank-list-left {
                span:nth-child(1) {
                    opacity: 0.8;
                    background-color: #F0882C;
                }
            }
        }
    }

    ul {
        li:nth-child(3) {
            .rank-list-left {
                span:nth-child(1) {
                    opacity: 0.5;
                    background-color: #F0882C;
                }
            }
        }
    }

    ul {
        width: 100%;
        li {
            width: 100%;
            border-bottom: #D4D4D4 solid 1px;
            a {
                display: flex;
                width: 100%;
                flex-direction: row;
                flex-wrap: nowrap;
                padding: 10px;
                color: #000;
            }
        }
        li:nth-last-child(1) {
            border-bottom: 0 none;
        }
    }

    .rank-list-left {
        display: flex;
        align-items: center;
        flex-direction: column;
        flex: 0 0 45px;
        span:nth-child(1) {
            color: #fff;
            display: block;
            background-color: #DBDBDB;
            width: 18px;
            height: 18px;
            border-radius: 2px;
            text-align: right;
            padding-right: 1px;
            margin-top: 5px;
        }
        span:nth-child(2) {
            margin-top: 2px;
        }
    }

    .rank-list-right {
        padding-left: 5px;
        p:nth-child(1) {
            font-size: 16px;
            padding: 2px 0;
        }
        p:nth-child(2) {
            max-height: 45px;
            text-align: justify;
            overflow: hidden;
            color: #8B8B8B;
        }
    }
</style>