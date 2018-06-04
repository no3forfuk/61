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
            <div class="footer">
                <mt-loadmore
                        :bottom-method="loadBeforeDay"
                        :bottom-all-loaded="allLoaded"
                        :bottomDistance="pullHeight"
                        :auto-fill="false"
                        ref="loadmore">
                    <y-homelist v-bind:day="day"
                                v-for="(day,index) in days"
                                :key="index">
                    </y-homelist>
                </mt-loadmore>
            </div>
        </div>
    </div>
</template>

<script>
    import {timeFormat, getWindowHeight} from "../../utils/utils";
    import {getWXConfig} from '@/api/api';
    import {SWITCH} from '@/config'
    import text from "./text"

    export default {
        data() {
            return {
                text: '',
                time: timeFormat("."),
                scrollBoxHeight: 0,
                days: [0],
                dayNum: 0,
                allLoaded: false,
                pullHeight: 30,
                GLOBAL_SWITCH: {}
            }
        },
        mounted() {
            //设置固定高度
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
            $(document)[0].title = '首页'
        },
        updated() {

        },
        created() {
            const vm = this;
            //初始化文本
            (() => {
                this.text = text;
                this.GLOBAL_SWITCH = SWITCH;
            })();
            getWXConfig().then(res => {
                if (res.status == 200 && res.data.status_code == 1) {
                    var opts = res.data.data;
                    this.$wx.config({
                        debug: true,
                        appId: opts.app_id,
                        timestamp: opts.timestamp,
                        nonceStr: opts.noncestr,
                        signature: opts.signature,
                        jsApiList: ['onMenuShareAppMessage']
                    })
                    this.$wx.onMenuShareAppMessage({
                        title: 'asdasd', // 分享标题
                        desc: 'asdasd', // 分享描述
                        link: 'http://www.rcm.ink/Home/Index#/', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                        imgUrl: '', // 分享图标
                        type: '', // 分享类型,music、video或link，不填默认为link
                        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                        success: function () {
                            alert('a')
                        },
                        complete: function () {
                            alert('b')
                        }
                    });
                }
            }).catch(err => {
                throw err
            })
        },
        methods: {
            login() {
                this.$router.push('login')
            },
            loadBeforeDay() {
                this.dayNum++;
                this.days.push(this.dayNum);
                this.$refs.loadmore.onBottomLoaded();
            },
            openSideBar() {
                this.$refs.sidebar.style.left = "0";
                this.$refs.sidebar.style.opacity = 0.95;
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