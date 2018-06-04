<template>
    <div class="rank2-index">
        <y-header v-bind:title="info.ranking_name" v-bind:flag="flag">
            <p slot="title" v-text="'#'+ info.ranking_name"></p>
        </y-header>
        <router-view class="view" v-bind:rank2Info="info"></router-view>
    </div>
</template>

<script>
    import {getSecondRank} from '../../api/api'
    import {getWindowHeight, sharePage} from '../../utils/utils'
    import {Indicator} from 'mint-ui';

    export default {
        data() {
            return {
                info: {},
                flag: '#',
                subInfo: {},
                query: this.$route.query,
                page: 1,
                share: {
                    title: '',
                    desc: ''
                }
            }
        },
        created() {
            this.getRankList(this.page);


        },
        beforeMount() {

        },
        mounted() {
            this.$nextTick(function () {
                (() => {
                    let widowHeight = getWindowHeight($);
                    $('.rank2-index').css({height: widowHeight});
                })()
            })
        },
        methods: {
            sharePage() {
                let vm = this;
                let url = location.href;
                let title = this.share.title;
                let desc = this.share.desc;
                let type = 'link';
                sharePage(vm, url, title, desc, type)
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