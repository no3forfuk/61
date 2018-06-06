<template>
    <div class="root">
        <y-header>
            <p slot="title" v-text="'@'+ ele.element_name"></p>
        </y-header>
        <router-view class="view"></router-view>
    </div>
</template>

<script>
    import {getElement} from '@/api/api'
    import {getWindowHeight, sharePage, statistics} from '@/utils/utils'
    import {Indicator} from 'mint-ui'

    export default {
        data() {
            return {
                flag: '@',
                title: '',
                ele: {},
                share: {
                    title: '',
                    desc: ''
                },
                enterTime: '',
                leaveTime: ''
            }
        },
        mounted() {
            this.$nextTick(function () {

            })
        },
        beforeRouteLeave(to, from, next) {
            if (to.name == 'rank2list') {
                //返回榜单页面次数
                statistics('04007', 1, 1, 2);
            }
            next()
        },
        beforeRouteUpdate(to, from, next) {
            if (to.path == '/elementDetails/post') {
                //打开POST页面次数
                statistics('04004', 1, 1, 2);
            }
            next()
        },
        beforeDestroy() {
            this.leaveTime = this.getNowMs();
            let time = this.getBrowseTime()
            //跳出元素页面次数
            statistics('04008', 1, 1, 2);
            //浏览元素页面时长
            statistics('04003', time, 1, 2);
        },
        created() {
            this.getElementInfo();
            Indicator.open({
                text: '加载中...',
                spinnerType: 'fading-circle'
            })
            this.enterTime = this.getNowMs();
            //元素页面打开次数
            statistics('04011', 1, 1, 2);
        },
        updated() {
            Indicator.close()
        },
        methods: {
            getBrowseTime() {
                let time = Math.abs(this.leaveTime - this.enterTime)
                time = parseInt(time / 1000)
                return time
            },
            sharePage() {
                let vm = this;
                let url = location.href;
                let title = this.share.title;
                let desc = this.share.desc;
                let type = 'link';
                sharePage(vm, url, title, desc, type)
            },
            getElementInfo() {
                var params = {};
                if (this.$route.query.ele_id) {
                    params.id = this.$route.query.ele_id
                } else {
                    params.id = this.$route.query.id
                }
                return new Promise((resolve, reject) => {
                    getElement(params).then(res => {
                        if (res.status == 200 && res.data.status_code == 1) {
                            this.ele = res.data.data;
                            this.$set(this.share, 'title', res.data.data.element_name);
                            this.$set(this.share, 'desc', res.data.data.element_desc || '暂时没有描述信息');
                            this.sharePage()
                        }
                    }).catch(err => {
                        throw err
                    })
                })
            }
        }
    }

</script>

<style scoped lang="less">
    .root {
        width: 100%;
        position: relative;
    }

    .view {
        overflow-y: auto;
    }

</style>