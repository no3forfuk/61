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
    import {getWindowHeight, sharePage} from '@/utils/utils'
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
                }
            }
        },
        mounted() {
            this.$nextTick(function () {

            })
        },
        created() {
            this.getElementInfo();
            Indicator.open({
                text: '加载中...',
                spinnerType: 'fading-circle'
            })

        },
        updated() {
            Indicator.close()
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