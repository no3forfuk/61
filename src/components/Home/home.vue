<template>
    <div class="root">
        <div class="side-bar text-white" ref="sidebar">
            <span class="text-white close-btn"
                  @click="closeSideBar">&times;</span>
            <div class="slogan">
                <p class="more">{{text.slogan1}}</p>
                <p class="only">{{text.slogan2}}</p>
            </div>
            <div class="erweima">
                <img src="../../static/images/erweima.jpg" alt="">
            </div>
            <mt-button type="default" style="margin-top: 30px;width: 100%;" @click="login" v-if="GLOBAL_SWITCH.LOGIN">
                登陆
            </mt-button>
        </div>
        <div class="side-content" ref="content">
            <div class="theme-color-bg text-white header">
                <div class="header-icon">
                    <i class="iconfont icon-caidan" @click="openSideBar"></i>
                    <!--<i class="iconfont icon-sousuo" @click="share"></i>-->
                    <!--<i class="iconfont icon-caidan1"></i>-->
                    <!--<i class="iconfont icon-iconshitu"></i>-->
                </div>
                <p class="header-title">{{text.title}}</p>
            </div>
            <!--<div class="text-black focus body">-->
            <!--<y-focus></y-focus>-->
            <!--</div>-->
            <div class="footer" @click="clickTimes">
                <mt-loadmore
                        :bottom-method="loadBeforeDay"
                        :bottom-all-loaded="allLoaded"
                        :bottomDistance="pullHeight"
                        :auto-fill="false"
                        ref="loadmore">
                    <y-homelist v-bind:day="day"
                                v-for="(day,index) in days"
                                @hasData="loadBeforeDay"
                                :key="index">
                    </y-homelist>
                </mt-loadmore>
            </div>
        </div>
    </div>
</template>

<script>
    import {timeFormat, getWindowHeight, sharePage, statistics} from "../../utils/utils";
    import {getWXConfig} from '@/api/api';
    import {SWITCH} from '@/config'
    import text from "./text"

    export default {
        data() {
            return {
                text: '',
                days: [0],
                dayNum: 0,
                allLoaded: false,
                pullHeight: 30,
                GLOBAL_SWITCH: {},
                enterTime: '',
                leaveTime: ''
            }
        },
        mounted() {
            //设置页面固定高度
            (() => {
                let height = getWindowHeight($);
                $('.root').css({height: height});
                $('.side-bar').css({height: height});
                $('.side-content').css({height: height});
                //设置可滚动区域的固定高度
                let headerHeight = $('.header').height();
                $('.footer').css({height: height - headerHeight});
            })();
            //设置标题
            $(document)[0].title = '首页';
        },
        beforeDestroy() {
            //记录离开首页时间
            this.getLeaveTime();
            //统计首页浏览时长
            (() => {
                let time = Math.abs(this.leaveTime - this.enterTime);
                time = parseInt(time / 1000);
                statistics('01005', time, 1, 2)
            })()
        },
        created() {
            (() => {
                //初始化文本
                this.text = text;
                //初始化开关
                this.GLOBAL_SWITCH = SWITCH;
            })();
            this.sharePage();
            //记录打开首页开始时间
            this.getEnterTime();
            //记录首页打开次数
            statistics('01006', 1, 1, 2)
        },
        methods: {
            //记录打开榜单次数
            clickTimes() {
                statistics('01004', 1, 1, 2)
            },
            getLeaveTime() {
                let time = new Date();
                this.leaveTime = time.getTime();
            },
            getEnterTime() {
                let time = new Date();
                this.enterTime = time.getTime();
            },
            sharePage() {
                let vm = this;
                let url = location.href;
                let title = '首页';
                let desc = 'RCM';
                let type = 'link';
                sharePage(vm, url, title, desc, type)
            },
            login() {
                this.$router.push('login')
            },
            loadBeforeDay() {
                //到最早一天不再加载
                let time = new Date('2018/05/20').getTime();
                let nowTime = new Date().getTime();
                let gap = Math.abs(nowTime - time);
                gap = gap / 3600 / 24 / 1000;
                if (this.dayNum > parseInt(gap)) {
                    this.$refs.loadmore.onBottomLoaded();
                    return
                }
                this.dayNum++;
                this.days.push(this.dayNum);
                this.$refs.loadmore.onBottomLoaded();
            },
            openSideBar() {
                this.$refs.sidebar.style.left = "0";
                this.$refs.sidebar.style.opacity = 0.95;
                //记录打开个人中心次数
                statistics('01001', 1, 1, 2)
            },
            closeSideBar() {
                this.$refs.sidebar.style.left = "-100%";
                this.$refs.sidebar.style.opacity = 0;
            }
        }
    };
</script>

<style scoped lang="less">
    .root {
        width: 100%;
        position: relative;
        overflow: hidden;
        .side-bar {
            position: absolute;
            top: 0;
            left: -100%;
            z-index: 100;
            display: flex;
            width: 100%;
            flex-direction: column;
            background-color: #ccc;
            align-items: center;
            background-color: #000;
            transition: all 0.5s;
            .slogan {
                margin-top: 100px;
                display: flex;
                flex-direction: column;
                align-items: center;
                font-size: 20px;
            }
            .close-btn {
                position: absolute;
                top: 10px;
                right: 15px;
                font-size: 24px;
                z-index: 101;
                display: block;
                width: 20px;
                height: 20px;
            }
            .erweima {
                display: flex;
                align-items: center;
                margin-top: 20px;
                img {
                    width: 200px;
                    height: 200px;
                }
            }
        }
        .side-content {
            position: relative;
            width: 100%;
            .header {
                width: 100%;
                display: flex;
                flex-direction: column;
                .header-icon {
                    padding: 5px 8px;
                    height: 30px;
                    line-height: 30px;
                    i {
                        font-size: 24px;
                    }
                }
                .header-title {
                    padding: 0px 8px;
                    font-size: 30px;
                }
            }
            .footer {
                width: 100%;
                overflow-y: auto;
                overflow-x: hidden;
            }
        }
    }

</style>