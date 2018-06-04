<template>
    <div class="reset-password">
        <y-header>
            <p slot="title">昵称</p>
        </y-header>
        <div class="user-info">
            <div class="user-photo">
                <img src="" alt="">
                <i class="iconfont icon-refresh_icon"></i>
            </div>
            <div class="user-name">
                <input type="text" placeholder="昵称">
                <i class="iconfont icon-refresh_icon"></i>
            </div>
        </div>
        <div class="goStart">
            <button @click="goStart">GO</button>
        </div>
    </div>
</template>

<script>

    export default {
        data() {
            return {}
        },
        methods: {
            goStart() {

            }
        }
    }

</script>

<style scoped lang="less">
    .reset-password {
        width: 100%;
        position: relative;
        .user-info {
            width: 100%;
            padding: 0 10px;
            padding-top: 30px;
            .user-photo {
                display: flex;
                flex-direction: row;
                flex-wrap: nowrap;
                justify-content: center;
                position: relative;
                img {
                    width: 97px;
                    min-height: 97px;
                    background-color: #ccc;
                    border-radius: 50%;
                    display: block;
                }
                i {
                    align-self: center;
                    position: absolute;
                    right: 0;
                }
            }
            .user-name {
                margin-top: 20px;
                display: flex;
                flex-direction: row;
                flex-wrap: nowrap;
                justify-content: space-between;
                border-bottom: 1px solid #DEDEDE;
                padding: 5px 0;
                input {
                    -webkit-appearance: none;
                    border: 0 none;
                    flex: 0.8;
                }
            }
        }
        .goStart {
            width: 100%;
            margin-top: 30px;
            padding: 0 10px;
            display: flex;
            flex-direction: row;
            button {
                flex: 0.5;
                border: 0 none;
                background-color: #F0882C;
                height: 40px;
                border-radius: 6px;
                color: #fff;
                font-size: 18px;
            }
        }
    }
</style>