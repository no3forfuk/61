<template>
    <div class="rank2-comment">
        <div class="slipt">
            <span style="color: #fff;font-size: 12px;margin-left: 10px;">精彩评论</span>
        </div>
        <div style="margin: 20px auto;" class="text-center" v-if="tips">该榜单还没有评论，需要您的助攻哦</div>
        <ul>
            <li v-for="(item,index) in comment" :key="index">
                <div>
                    <span class="iconfont icon-ai-like"></span>
                    <span>{{item.like}}</span>
                </div>
                <div>
                    <div class="content-user">
                        <img :src="user[index].avatar" alt="">
                        <div>
                            <p>{{user[index].name}}</p>
                            <p>
                                <span>#动漫</span> |
                                <!--<span>听到SD的歌还想回去打球怎么破</span>-->
                            </p>
                        </div>
                        <span class="times">{{item.updated_at}}</span>
                    </div>
                    <div class="content-info">
                        <p>{{item.content}}</p>
                    </div>
                </div>
            </li>
        </ul>
        <div class="placeholder" v-if="!inputIsFocus"></div>
        <!--v-if="!inputIsFocus"-->
        <div class="comment-box" v-if="!inputIsFocus">
            <div class="input-box">
                <input type="text" @focus="getInputFocus" @blur="lostInputFocus" placeholder="评论" v-model="commentText">
            </div>
            <span @click="sendComment">发送</span>
        </div>
        <div v-if="inputIsFocus" class="textarea-box">
            <div class="visitor">
                <img src="http://p8rk87lub.bkt.clouddn.com/visitor.jpg" alt="">
                <span>游客</span>
            </div>
            <div class="textarea-text">
        <textarea ref="textareas" @blur="lostTextareaFocus" v-model="commentText"
                  @focus="getTextareaFocus"></textarea>
            </div>
            <span class="word-length">{{wordLength}}/350</span>
            <mt-button type="default" style="height: 30px;position: absolute;right: 2%;bottom: 23px;" size="small"
                       @click="sendComment"
            >发送
            </mt-button>
        </div>
    </div>
</template>

<script>
    import {getDiscuss, addComment, getSecondRank} from '@/api/api'
    import {timeAgo, getWindowHeight, phoneType} from '@/utils/utils'
    import {Indicator} from 'mint-ui';

    export default {
        data() {
            return {
                title: '',
                flag: '#',
                comment_type: 2,
                comment: [],
                userPhoto: [],
                user: [],
                inputIsFocus: false,
                commentText: '',
                wordLength: 0,
                tips: false,
                andriod: false
            }
        },
        mounted() {
            this.$nextTick(function () {
                (() => {
                    let widowHeight = getWindowHeight($);
                    $('.rank2-comment').css({height: widowHeight - 81});
                })()
            })
        },
        created() {
            this.getDiscussList();
            if (phoneType() == 'Android') {
                this.andriod = true;
            } else {
                this.andriod = false;
            }
        },
        methods: {
            sendComment() {
                var params = {};
                params.content = this.commentText;
                params.comment_type = 2;
                params.comment_type = 2;
                params.ranking_id = this.$route.query.id;
                if (params.content == '') {
                    return
                }
                addComment(params).then(res => {
                    if (res.status == 200 && res.data.status_code == 1) {
                        this.$toast({
                            message: '评论成功',
                            duration: 1000
                        })
                        this.commentText = ''
                        this.getDiscussList()
                        return
                    }
                    if (res.data.message == '操作太快！') {
                        this.$toast({
                            message: '请休息一下，一分钟以后再试',
                            duration: 1000
                        })
                        return
                    }
                    this.getDiscussList()

                }).catch(err => {
                    this.$toast('系统异常')
                })
            },
            getTextareaFocus() {
                this.inputIsFocus = true
            },
            lostTextareaFocus() {
                this.inputIsFocus = false
            },
            lostInputFocus() {

            },
            getInputFocus() {
                this.inputIsFocus = true
                this.$nextTick(function () {
                    this.$refs.textareas.focus()
                })
            },
            getDiscussList() {
                var params = {};
                params.level = 2;
                params.id = this.$route.query.id;
                Indicator.open({
                    text: '加载中...',
                    spinnerType: 'fading-circle'
                });
                getDiscuss(params).then(res => {
                    if (res.status == 200 && res.data.status_code == 1) {
                        Indicator.close()
                        var data = res.data.data.data;
                        if (data.length == 0) {
                            this.tips = true
                            return
                        }
                        for (let i = 0; i < data.length; i++) {
                            var str = data[i].updated_at;
                            str = str.replace(/\-/g, '/');
                            str = timeAgo(str);
                            data[i].updated_at = str + '前';
                            if (data[i].user_type == 1) {
                                this.user[i] = data[i].user;
                            }
                            if (data[i].user_type == 2) {
                                data[i].visitor.avatar = 'http://p8rk87lub.bkt.clouddn.com/visitor.jpg';
                                this.user[i] = data[i].visitor;
                                data[i].visitor.name = '猎人 - ' + data[i].visitor.area;
                                this.user[i] = data[i].visitor
                            }
                        }
                        this.comment = data;
                    }
                }).catch(err => {
                    throw err;
                })
            },
            addFixed() {

            }
        },
        watch: {
            commentText(n, o) {
                this.wordLength = n.length;
            }
        }
    }

</script>

<style scoped lang="less">
    .rank2-comment {
        width: 100%;
        overflow-x: hidden;
        overflow-y: auto;
        .slipt {
            width: 100%;
            background-color: #d3d3d3;
            height: 14px;
            line-height: 12px;
            margin-top: 20px;
        }
        ul {
            width: 100%;
            li {
                width: 100%;
                padding: 10px 0;
                border-bottom: 1px solid #D3D3D3;
                display: flex;
                flex-direction: row;
                flex-wrap: nowrap;
                div:nth-child(1) {
                    flex: 0 0 50px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    span:nth-child(1) {
                        margin-top: 5px;
                    }
                }
                div:nth-child(2) {
                    flex: 1;
                    .content-user {
                        display: flex;
                        flex-direction: row;
                        flex-wrap: nowrap;
                        position: relative;
                        img {
                            width: 30px;
                            height: 30px;
                            border-radius: 50%;
                        }
                        div:nth-child(2) {
                            padding-left: 10px;
                        }
                        span:nth-child(3) {
                            position: absolute;
                            right: 10px;
                            top: 10px;
                            color: #8B8B8B;
                            font-size: 12px;
                        }
                    }
                    .content-info {
                        padding-top: 5px;
                        min-height: 30px;
                    }
                }
            }
            li:nth-last-child(1) {
                border-bottom: 0 none;
            }
        }
        .placeholder {
            width: 100%;
            height: 46px;
            background-color: #fff;
        }
        .comment-box {
            width: 100%;
            background-color: #f8f8f8;
            height: 46px;
            padding: 8px 10px;
            position: fixed;
            display: flex;
            flex-direction: row;
            flex-wrap: nowrap;
            justify-content: space-between;
            bottom: 0;
            left: 0;
            .input-box {
                flex: 1;
                border-radius: 4px;
                border: 1px solid #D6D6D6;
                > input {
                    width: 100%;
                    height: 100%;
                    border: 0 none;
                    border-radius: 4px;
                    font-size: 14px;
                    line-height: 18px;
                }
            }
            span:nth-child(2) {
                color: #797979;
                line-height: 28px;
                margin-right: 5px;
                flex: 0 0 50px;
                padding-left: 15px;
            }
        }
        .textarea-box {
            width: 100%;
            height: 100px;
            background-color: #f8f8f8;
            position: relative;
            padding: 10px;
            .word-length {
                color: #8b8b8b;
                font-size: 12px;
                position: absolute;
                right: 18%;
                bottom: 7px;
            }
            .visitor {
                width: 100%;
                display: flex;
                flex-direction: row;
                align-items: center;
                img {
                    width: 15px;
                    height: 15px;
                    border-radius: 50%;
                }
                span {
                    color: #8B8B8B;
                }
            }
            .textarea-text {
                width: 85%;
                height: 80%;
                border: 1px solid #d6d6d6;
                border-radius: 7px;
                background-color: #fff;
                textarea {
                    display: block;
                    width: 100%;
                    height: 80%;
                    border: 0 none;
                    resize: none;
                    border-radius: 7px;
                    font-size: 14px;
                }
            }
        }

    }

</style>