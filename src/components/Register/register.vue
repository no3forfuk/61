<template>
    <div class="register">
        <y-header>
            <p slot="title">加入RCM</p>
        </y-header>
        <div class="register-body">
            <div class="register-form">
                <div class="phone-number">
                    <input type="number" placeholder="手机号">
                </div>
                <div class="pass-word">
                    <input type="password" placeholder="密码">
                </div>
                <div class="short-msg">
                    <input type="nubmer" placeholder="短信验证码">
                    <span>获取验证码</span>
                </div>
            </div>
            <div class="register-opts">
                <div>
                    <button @click="goNext">下一步</button>
                </div>
            </div>
        </div>
        <div class="register-footer">
            <div class="protocol">
                <span>点击[下一步]，表示您已阅读并同意<i>用户使用协议</i></span>
            </div>
        </div>
    </div>
</template>

<script>
    import {getWindowHeight} from '@/utils/utils'

    export default {
        data() {
            return {}
        },
        created() {

        },
        mounted() {
            this.$nextTick(function () {
                !function () {
                    var height = getWindowHeight($);
                    $('.register').css({
                        height: height
                    })
                }()
            })
        },
        methods: {
            goNext() {
                this.$router.push('userInfo')
            }
        }
    }

</script>

<style scoped lang="less">
    .register {
        width: 100%;
        overflow: hidden;
        position: relative;
        .register-body {
            width: 100%;
            display: flex;
            flex-direction: column;
            flex-wrap: nowrap;
            padding: 0 10px;
            .register-form {
                width: 100%;
                padding: 0px 6px;
                margin-top: 40px;
                border-radius: 10px;
                border: 1px solid #DEDEDE;
                .phone-number {
                    width: 100%;
                    height: 49px;
                    border-bottom: 1px solid #DEDEDE;
                    padding: 6px 0;
                    input {
                        display: inline-block;
                        width: 100%;
                        height: 100%;
                        -webkit-appearance: none;
                        border: 0 none;
                    }
                }
                .pass-word {
                    width: 100%;
                    height: 49px;
                    border-bottom: 1px solid #DEDEDE;
                    padding: 6px 0;
                    input {
                        display: inline-block;
                        width: 100%;
                        height: 100%;
                        -webkit-appearance: none;
                        border: 0 none;
                    }
                }
                .short-msg {
                    width: 100%;
                    height: 49px;
                    padding: 6px 0;
                    display: flex;
                    flex-direction: row;
                    flex-wrap: nowrap;
                    justify-content: space-between;
                    align-items: center;

                    input {
                        display: inline-block;
                        height: 100%;
                        -webkit-appearance: none;
                        border: 0 none;
                    }
                    span:nth-child(2) {
                        white-space: nowrap;
                        text-align: center;
                        margin-right: 20px;
                    }
                }
            }
            .register-opts {
                width: 100%;
                margin-top: 25px;
                display: flex;
                flex-direction: row;
                flex-wrap: nowrap;
                justify-content: space-between;
                height: 37px;
                div:nth-child(1) {
                    flex: 0.46;
                    width: 100%;
                    button {
                        width: 100%;
                        border: 0 none;
                        background-color: #F0882C;
                        height: 100%;
                        border-radius: 6px;
                        color: #fff;
                        font-size: 18px;
                    }
                }
            }

        }
        .register-footer {
            width: 100%;
            position: absolute;
            bottom: 30px;
            left: 0;
            text-align: center;
            color: #8B8B8B;
            .protocol {
                span {
                    i {
                        text-decoration: underline;
                    }
                }
            }
        }
    }
</style>
