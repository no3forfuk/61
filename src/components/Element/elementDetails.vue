<template>
    <div class="element-datils">
        <ele-header v-bind:rank="rank"></ele-header>
        <div style="width: 100%; height: 2px;backgroundColor: #d3d3d3;"></div>
        <div class="element-info">
            <div>
                <div>
                    <i class="iconfont icon-caomei"
                       style="display: inline-block;transform: rotate(55deg);"></i>
                    <span>{{ele.exponent || parseInt(Math.random()*1000)}}</span>
                </div>
            </div>
            <div v-text="ele.element_desc || '暂时没有描述信息哦'" ref="details">
            </div>
            <span>
                <i class="iconfont icon-jiantou" @click="toggleWidth($event)"
                   style="transform: rotate(90deg);display: block;"></i>
            </span>
        </div>
        <ele-neck></ele-neck>
        <ul>
            <mt-loadmore :bottom-method="loadNextPage"
                         :bottom-all-loaded="allLoaded"
                         :bottomDistance="pullHeight"
                         :auto-fill="false"
                         ref="loadmore">
                <li v-for="(item,index) in postList" :key="index">
                    <ele-text v-if="isText(item.type)" v-bind:postinfo="item" v-bind:argments="$route.query"></ele-text>
                    <ele-textimage v-if="isTextImage(item.type)" v-bind:postinfo="item"
                                   v-bind:argments="$route.query"></ele-textimage>
                    <ele-image v-if="isImage(item.type)"></ele-image>
                </li>
            </mt-loadmore>
        </ul>
    </div>

</template>

<script>
    import {getElement, getSecondRank} from '@/api/api'
    import {timeAgo, getWindowHeight} from '@/utils/utils'

    export default {
        data() {
            return {
                title: '',
                flag: '@',
                ele: {},
                postList: [],
                rank: {},
                allLoaded: false,
                pullHeight: 30,
                page: 1,
                totalPage: 0
            }
        },
        mounted() {
            this.$nextTick(function () {
                (() => {
                    let widowHeight = getWindowHeight($);
                    $('.element-datils').css({height: widowHeight - 81});
                })()
            })
        },
        created() {
            this.getElementInfo();
            this.getSecondRank();
        },
        methods: {
            loadNextPage() {
                this.page++;
                if (this.page >= this.totalPage) {
                    this.$refs.loadmore.onBottomLoaded();
                } else {
                    this.$refs.loadmore.onBottomLoaded();
                    this.getElementInfo()
                }
            },
            getSecondRank() {
                var params = {};
                params.level = this.$route.query.rank_level;
                params.id = this.$route.query.rank_id;
                getSecondRank(params).then(res => {
                    if (res.status == 200 && res.data.status_code == 1) {
                        this.rank = res.data.data
                    }
                }).catch(err => {
                    throw err;
                })
            },
            getElementInfo() {
                var params = {};
                params.id = this.$route.query.id
                params.page = this.page
                return new Promise((resolve, reject) => {
                    getElement(params).then(res => {
                        this.ele = res.data.data;
                        var data = res.data.data.data.data;
                        for (let i = 0; i < data.length; i++) {
                            var str = data[i].updated_at;
                            str = str.replace(/\-/g, '/');
                            str = timeAgo(str);
                            data[i].updated_at = str + '前';
                        }
                        this.postList = this.postList.concat(res.data.data.data.data);
                        this.totalPage = res.data.data.data.last_page;
                    }).catch(err => {
                        throw err
                    })
                })
            },
            toggleWidth(e) {
                let dom = this.$refs.details;
                let str = window.getComputedStyle(dom).height;
                let num = parseInt(str);
                if (num == 60) {
                    this.$refs.details.style.height = 'auto';
                    e.target.style.transform = 'rotate(-90deg)';
                    str = window.getComputedStyle(dom).height;
                    num = parseInt(str);
                    if (num < 60) {
                        this.$refs.details.style.height = '60px';
                        e.target.style.transform = 'rotate(90deg)';
                    } else {
                        this.$refs.details.style.height = 'auto';
                        e.target.style.transform = 'rotate(-90deg)';
                    }
                } else {
                    this.$refs.details.style.height = '60px';
                    e.target.style.transform = 'rotate(90deg)';
                }
            },
            isText(type) {
                return type == 1 ? true : false
            },
            isTextImage(type) {
                return type == 2 ? true : false
            },
            isImage(type) {
                return type == 3 ? true : false
            }
        },
        computed: {}
    }

</script>

<style scoped lang="less">
    .element-datils {
        width: 100%;
        overflow-x: hidden;
        .element-info {
            width: 100%;
            display: flex;
            flex-direction: row;
            overflow: hidden;
            flex-wrap: nowrap;
            position: relative;
            align-items: center;
            padding: 10px;
            div:nth-child(1) {
                flex: 0 0 60px;
                display: flex;
                flex-direction: row;
                align-items: center;
                div:nth-child(1) {
                    display: inline-flex;
                    flex-direction: row;
                    flex-wrap: nowrap;
                    height: 20px;
                    justify-content: center;
                    box-shadow: 0px 0px 5px 0px #d3d3d3;
                    border-radius: 2px;
                }
            }
            div:nth-child(2) {
                height: 60px;
                padding-top: 3px;
                padding-left: 10px;
                text-align: justify;
            }
            span:nth-child(3) {
                position: absolute;
                right: 8px;
                bottom: 0;
            }
        }
        ul {
            width: 100%;
            li {
                width: 100%;
                border-bottom: 1px solid #D3D3D3;
            }
            li:nth-last-child(1) {
                border-bottom: 0 none;
            }
        }
    }


</style>