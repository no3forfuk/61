<template>
    <div class="rank2-index">
        <y-header>
            <p slot="title" v-text="'#'+ info.ranking_name"></p>
        </y-header>
        <router-view class="view" v-bind:rank2Info="info"></router-view>
    </div>
</template>

<script>
    import {getSecondRank} from '../../api/api'
    import {getWindowHeight, sharePage, statistics, ctrlPageScrollSpeed} from '../../utils/utils'
    import {Indicator} from 'mint-ui';

    export default {
        data() {
            return {
                info: {},
                subInfo: {},
                page: 1,
                share: {
                    title: '',
                    desc: ''
                },
                enterTime: '',
                leaveTime: ''
            }
        },
        created() {
            this.getRankList(this.page)
            //记录进入页面时间
            this.enterTime = this.getNowMs();
            //榜单页面打开次数
            statistics('02013', 1, 1, 2)
        },
        beforeRouteLeave(to, from, next) {
            if (to.name == 'home') {
                //返回主页次数
                statistics('02007', 1, 1, 2)
                //离开当前页面次数
                statistics('02012', 1, 1, 2)
            }
            next();
        },
        beforeDestroy() {
            //记录离开页面时间
            this.leaveTime = this.getNowMs();
            (() => {
                let time = this.getBrowseTime()
                statistics('02003', time, 1, 2)
            })()

        },
        mounted() {
            this.$nextTick(function () {
                (() => {
                    let widowHeight = getWindowHeight($);
                    $('.rank2-index').css({height: widowHeight});
                })()
            })
            //控制页面滚动速度 target,speed
            ctrlPageScrollSpeed($('.view'), 2)
        },
        methods: {
            getBrowseTime() {
                let time = Math.abs(this.leaveTime - this.enterTime)
                time = parseInt(time / 1000)
                return time
            },
            sharePage() {
                sharePage(this, location.href, this.share.title, this.share.desc, 'link')
            },
            getRankList() {
                var params = {};
                params.level = 2;
                params.id = this.$route.query.id;
                params.page = this.page;
                Indicator.open({
                    text: '加载中...',
                    spinnerType: 'fading-circle'
                });
                return new Promise((resolve, reject) => {
                    getSecondRank(params).then(res => {
                        this.info = res.data.data;
                        this.subInfo = res.data.data.data.data;
                        this.$set(this.share, 'title', res.data.data.ranking_name);
                        this.$set(this.share, 'desc', res.data.data.ranking_desc);
                        this.sharePage();
                        $(document)[0].title = this.info.ranking_name;
                        Indicator.close()
                    }).catch(err => {
                        throw err;
                    })
                })
            }
        }
    }

</script>

<style scoped lang="less">
    .rank2-index {
        width: 100%;
        position: relative;
    }

    .view {
        overflow-x: hidden;
        overflow-y: auto;
    }
</style>