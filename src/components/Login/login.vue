<template>
    <div class="login">
        <y-header>
            <p slot="title">欢迎来到RCM</p>
        </y-header>
        <div class="login-body">
            <div class="login-form">
                <div class="phone-number">
                    <input type="number" placeholder="手机号">
                </div>
                <div class="pass-word">
                    <input type="password" placeholder="密码">
                </div>
            </div>
            <div class="login-opts">
                <div>
                    <button>登入</button>
                </div>
                <div>
                    <span @click="goRegiser">注册RCM</span>
                    <span></span>
                    <span @click="resetPassword">忘记密码</span>
                </div>
            </div>
            <div class="login-tpye">
                <div class="wechat">
                    <span><i>微信登录</i><i>微信登录</i></span>
                </div>
                <span></span>
                <div class="tx-qq">
                    <span><i>QQ登录</i><i>QQ登录</i></span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {getWindowHeight} from '@/utils/utils'
    import {SWITCH} from '@/config'

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
                    $('.login').css({
                        height: height
                    })
                }()
            })
        },
        methods: {
            goRegiser() {
                this.$router.push('register')
            },
            resetPassword() {
                this.$router.push('resetPassword')
            }
        }
    }

</script>

<style scoped lang="less">
    .login {
        width: 100%;
        overflow: hidden;
        position: relative;
        .login-body {
            width: 100%;
            display: flex;
            flex-direction: column;
            flex-wrap: nowrap;
            padding: 0 10px;
            .login-form {
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
                    padding: 6px 0;
                    input {
                        display: inline-block;
                        width: 100%;
                        height: 100%;
                        -webkit-appearance: none;
                        border: 0 none;
                    }
                }
            }
            .login-opts {
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
                div:nth-child(2) {
                    flex: 0.46;
                    display: inline-flex;
                    flex-direction: row;
                    flex-wrap: nowrap;
                    justify-content: space-between;
                    align-items: center;
                    span:nth-child(1) {
                        flex: 0.49;
                        white-space: nowrap;
                        line-height: 37px;
                        text-align: center;
                        font-weight: 700;
                    }
                    span:nth-child(2) {
                        flex: 0 0 1px;
                        display: block;
                        height: 12px;
                        background-color: #ccc;
                    }
                    span:nth-child(3) {
                        flex: 0.49;
                        white-space: nowrap;
                        line-height: 37px;
                        text-align: center;
                        font-weight: 700;
                        color: #D3D3D3;
                    }
                }
            }
            .login-tpye {
                width: 100%;
                display: flex;
                flex-direction: row;
                align-items: flex-start;
                flex-wrap: nowrap;
                padding: 0 10px;
                height: 40px;
                position: absolute;
                bottom: 40px;
                left: 0;
                right: 0;
                justify-content: space-between;
                .wechat {
                    flex: 0.49;
                    text-align: center;
                    span {
                        border-bottom: 10px solid #5CC248;
                        position: relative;
                        i:nth-child(1) {
                            position: absolute;
                            bottom: -10px;
                            left: 0;
                            color: #8B8B8B;
                            font-weight: 700;
                        }
                        i:nth-child(2) {
                            opacity: 0;
                        }
                    }
                }
                span:nth-child(2) {
                    flex: 0 0 2px;
                    height: 20px;
                    border-radius: 1px;
                    background-color: #ccc;
                    align-self: center;
                }
                .tx-qq {
                    flex: 0.49;
                    text-align: center;
                    span {
                        border-bottom: 10px solid #2CABF2;
                        position: relative;
                        i:nth-child(1) {
                            position: absolute;
                            bottom: -10px;
                            white-space: nowrap;
                            left: 0;
                            color: #8B8B8B;
                            font-weight: 700;
                        }
                        i:nth-child(2) {
                            opacity: 0;
                        }
                    }
                }
            }
        }

    }
</style>