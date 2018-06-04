<template>
    <div class="home-list">
        <div class="list-header">
            <span class="text-size-12 text-white" v-text="time"></span>
        </div>
        <ul class="list-body">
            <li v-for="(item,index) in homeList"
                class="outer"
                :key="index">
                <router-link
                        :to="{name:getRouter(item),query:{level:item.ranking_level,id:item.id}}">
                    <div>
                        <i class="number">{{index+1}}</i>
                        <i class="iconfont icon-ai215 upicon"
                           style="transform: rotate(-90deg)"></i>
                    </div>
                    <div>
                        <p v-text="item.ranking_name"></p>
                        <p class="text-size-12" v-text="item.ranking_desc || '暂时没有描述信息哦'">
                        </p>
                    </div>
                    <ul class="sub-list text-size-12">
                        <li v-for="(list,index) in item.data" :key="index" class="inner">
                            <span class="before-num" :opacity="index*0.08">{{index+1}}</span>
                            <router-link :to="{name:getSubRouter(list).router,query:getSubRouter(list).query}"
                                         class="text-black">
                                {{getListValue(item,list).pre + getListValue(item,list).text}}
                            </router-link>
                        </li>
                    </ul>
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
    import {getIendx} from "../../api/api";
    import {timeFormat} from "../../utils/utils";
    import {Indicator} from 'mint-ui';

    export default {
        data() {
            return {
                homeList: [],
                time: ''
            };
        },
        mounted() {

        },
        updated() {
            this.$nextTick(function () {
                this.sendValueToFather()
            })
        },
        methods: {
            sendValueToFather() {
                this.$emit('listionChildValue', this.UlHeight)
            },
            getListValue(n, m) {
                var pre = "";
                var text = "";
                if (n.ranking_level) {
                    pre = "#";
                    text = m.ranking_name;
                }
                if (n.ranking_level == 1) {
                    pre = "#";
                    text = m.ranking_name;
                }
                if (n.ranking_level == 2) {
                    pre = "@";
                    text = m.element_name;
                }
                return {pre, text};
            },
            getdata() {
                var time = this.day * (3600 * 1000 * 24);
                time = Date.now() - time;
                var params;
                params = timeFormat('-', time);
                this.time = params;
                Indicator.open({
                    text: '加载中...',
                    spinnerType: 'fading-circle'
                });
                getIendx(params).then(res => {
                    if (res.status == 200 && res.data.status_code == 1) {
                        this.homeList = res.data.data;
                        setTimeout(function () {
                            Indicator.close();
                        }, 100)
                    }
                }).catch(err => {
                    throw err;
                })
            },
            getRouter(obj) {
                var router = "";
                if (obj.ranking_level && obj.ranking_level == 2) {
                    return (router = "rank2list");
                } else if (obj.ranking_level && obj.ranking_level == 1) {
                    return (router = "rank1details");
                }
            },
            getSubRouter(obj) {
                if (obj.ranking_level && obj.ranking_level == 2) {
                    return {
                        router: "rank2list",
                        query: {
                            level: obj.ranking_level,
                            id: obj.id
                        }
                    };
                } else {
                    return {
                        router: "elementDetails",
                        query: {
                            id: obj.id,
                            rank_level: 2,
                            rank_id: obj.pivot.ranking_id
                        }
                    };
                }
            }
        },
        created() {
            this.getdata();
        },
        computed: {},
        props: ["day"]
    };
</script>

<style scoped lang="less">
    .home-list {
        width: 100%;
        .list-header {
            width: 100%;
            background-color: #d3d3d3;
            padding: 0 8px;
            line-height: 12px;
        }
        .list-body {
            width: 100%;
            display: flex;

            flex-direction: column;
            .outer {
                width: 100%;
                padding: 10px 10px;
                display: flex;
                flex-direction: row;
                flex-wrap: nowrap;
                > a {
                    display: flex;
                    width: 100%;
                    flex-direction: row;
                    flex-wrap: nowrap;
                    -webkit-justify-content: space-between;
                    justify-content: space-between;
                    color: #000;
                    div:nth-child(1) {
                        color: black;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        line-height: 18px;
                        i:nth-child(1) {
                            margin-top: 2px;
                            font-size: 16px;
                            font-weight: 700;
                        }
                    }
                    div:nth-child(2) {
                        width: 70%;
                        padding: 0 10px;
                        p:nth-child(1) {
                            white-space: nowrap;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            font-weight: 900;
                            font-size: 16px;
                        }
                        p:nth-child(2) {
                            color: #8b8b8b;
                            height: 60px;
                            overflow: hidden;
                            font-size: 12px;
                            line-height: 20px;
                            text-overflow: ellipsis;
                        }
                    }
                }
            }
        }
    }

    .sub-list {
        width: 25%;
        align-self: right;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 84px;
        .inner {
            width: 100%;
            height: 24px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            font-size: 12px;
            line-height: 12px;
            border-bottom: 1px dotted #E79953;
            padding-top: 12px;
            > span {
                display: inline-block;
                width: 12px;
                height: 20px;
                border-radius: 2px;
                background-color: #E79953;
                padding-right: 1px;
                color: #fff;
                text-align: right;
            }
        }
    }
</style>