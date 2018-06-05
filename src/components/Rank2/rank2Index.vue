<template>
    <div class="rank2-list">
        <!--<rank2-header></rank2-header>-->
        <div class="details">
            <div>
                <i>{{info.rating || 'A+'}}</i>
                <i>{{info.exponent || '25'}}</i>
            </div>
            <div ref="father">
                <router-link :to="{name:'rank2Details',query:{id:info.id}}">
                    <div ref="details" v-text="info.ranking_desc|| '暂时没有描述信息哦'"></div>
                </router-link>
                <span>
                <i class="iconfont icon-jiantou"
                   style="transform: rotate(90deg);display: block;"
                   ref="sanjiao"
                   @click="toggleWidth($event)"></i>
            </span>
            </div>
        </div>
        <rank2-neck v-bind:rank_id="info.id"></rank2-neck>
        <mt-loadmore :bottom-method="loadNextPage"
                     :bottom-all-loaded="allLoaded"
                     :bottomDistance="pullHeight"
                     :auto-fill="false"
                     ref="loadmore">
            <rank2-sublist :listInfo="subInfo" :rankInfo="info"></rank2-sublist>
        </mt-loadmore>

    </div>
</template>

<script>
    import {getSecondRank, getWXConfig} from '@/api/api'
    import {getWindowHeight} from '../../utils/utils'


    export default {
        data() {
            return {
                info: {},
                flag: '#',
                subInfo: [],
                query: this.$route.query,
                allLoaded: false,
                pullHeight: 30,
                page: 1,
                element: {
                    totalPage: 0
                }

            };
        },
        created() {
            this.getRankList(this.$route.query);


        },
        mounted() {
            this.$nextTick(function () {
                (() => {
                    let widowHeight = getWindowHeight($);
                    $('.rank2-list').css({height: widowHeight - 81});
                })()

            })
        },
        computed: {},
        methods: {

            loadNextPage() {
                this.page++;
                if (this.page > this.element.totalPage) {
                    this.$refs.loadmore.onBottomLoaded();
                } else {
                    this.getRankList(this.$route.query);
                    this.$refs.loadmore.onBottomLoaded();
                }

            },
            toggleWidth(e) {
                let height = $(this.$refs.details).height();
                if (height > 65 && $(this.$refs.father).height() == 65) {
                    $(this.$refs.father).css({
                        height: 'auto'
                    })
                    $(this.$refs.sanjiao).css({
                        transform: 'rotate(-90deg)'
                    })
                    return;
                }
                if ($(this.$refs.father).height() > 65) {
                    $(this.$refs.father).css({
                        height: '65'
                    })
                    $(this.$refs.sanjiao).css({
                        transform: 'rotate(90deg)'
                    })
                }

            },
            getRankList(query) {
                return new Promise((resolve, reject) => {
                    var params = {}
                    params.id = query.id
                    params.level = query.level
                    params.page = this.page
                    getSecondRank(params).then(res => {
                        this.info = res.data.data;

                        this.element.totalPage = res.data.data.data.last_page;
                        if (res.data.data.data.data.length !== 0) {
                            this.subInfo = this.subInfo.concat(res.data.data.data.data);
                        } else {
                            return;
                        }
                    }).catch(err => {
                        throw err
                    })
                })
            }
        },
        watch: {},
        props: ['rank2Info']
    };
</script>

<style scoped lang="less">
    .rank2-list {
        width: 100%;
        .details {
            display: flex;
            padding: 10px 0;
            flex-direction: row;
            flex-wrap: nowrap;
            div:nth-child(1) {
                display: flex;
                flex: 0 0 45px;
                flex-direction: column;
                align-items: center;
                i:nth-child(1) {
                    color: #DF955A;
                }
            }
            div:nth-child(2) {
                flex: 1;
                position: relative;
                padding-right: 10px;
                height: 65px;
                overflow: hidden;
                > a {
                    color: #8B8B8B;
                    display: block;
                }
                > span {
                    color: #666;
                    position: absolute;
                    right: 0;
                    bottom: 0;
                }
            }

        }

    }

</style>