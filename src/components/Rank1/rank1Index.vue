<template>
    <div class="root">
        <y-header v-bind:title="info.ranking_name" v-bind:flag="flag"></y-header>
        <div class="rank-details">
            <div class="rd-center">
                <div class="c-left">
                <div class="utils">
                <div class="c-level">S+</div>
                <div class="c-hot fr">8W</div>
                </div>
                </div>
                <div class="c-right">
                    <p ref="details" v-text="info.ranking_desc || '暂时没有描述信息哦'"></p>
                    <span class="up-down"><i class="iconfont icon-jiantou" @click="toggleWidth($event)"></i></span>

                </div>
            </div>
            <rank1-neck></rank1-neck>

        </div>
        <rank1-sublist :listInfo="info.data"></rank1-sublist>

    </div>
</template>

<script>
    import {getFirstRank} from '../../api/api'

    export default {
        data() {
            return {
                info: {},
                title: "",
                lists: [],
                rankOrEle: '',
                flag: '#'
            };
        },
        created() {
            //获取当前信息
            this.getListInfo(this.$route.query);

        },
        computed: {},
        methods: {
            getListInfo(params) {
                return new Promise((resolve, reject) => {
                    getFirstRank(params).then(res => {
                        this.info = res.data.data
                    }).catch(err => {
                    })
                })
            },
            toggleWidth(e) {
                let dom = this.$refs.details;
                let str = window.getComputedStyle(dom).height;
                let num = parseInt(str);
                if (num == 55) {
                    this.$refs.details.style.height = 'auto';
                    e.target.style.transform = 'rotate(-90deg)';
                    str = window.getComputedStyle(dom).height;
                    num = parseInt(str);
                    if (num < 55) {
                        this.$refs.details.style.height = '55px';
                        e.target.style.transform = 'rotate(90deg)';
                    } else {
                        this.$refs.details.style.height = 'auto';
                        e.target.style.transform = 'rotate(-90deg)';
                    }
                } else {
                    this.$refs.details.style.height = '55px';
                    e.target.style.transform = 'rotate(90deg)';
                }
            }
        }
    };
</script>

<style scoped>

    /*brief*/
    .rd-center {
        padding: 10px;
        width: 100%;
        position: relative;
    }

    .c-left {
        position: absolute;
        top: 15px;
        left: 18px;
        overflow: visible;
    }

    .c-left .utils {
        position: relative;
        overflow: visible;
    }

    .c-left .c-level {
        font-size: 20px;
        color: #DF955A;
        font-weight: bold;
    }

    .c-left .c-hot {
        margin-top: 2px;
        position: absolute;
        top: 18px;
        right: 0px;
        z-index: 10;
    }

    .c-right {
        padding-left: 44px;
        /*padding-left: 20px;*/
    }

    .c-right p {
        color: #8B8B8B;
        line-height: 18px;
        height: 55px;
        overflow: hidden;
        position: relative;
    }

    .c-right .up-down {
        display: block;
        position: absolute;
        right: 16px;
        bottom: 12px;
        background-color: #fff;
    }

    .up-down .icon-jiantou {
        display: block;
        transform: rotate(90deg);
    }

    /*list*/
    .root {
        width: 100%;
    }

    .rank-details {
        margin-top: 89px;
        width: 100%;
        background-color: #fff;
        box-shadow: 1px 5px 16px -10px #8b8b8b;
    }

</style>