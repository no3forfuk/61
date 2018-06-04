<template>
    <div class="post-details">
        <div class="top">
            <img :src="user.avatar" alt="">
            <div>
                <p><b>{{user.name}}</b></p>
                <p>
                    <span>#{{rank.ranking_name}}</span> |
                    <!--<span>听到SD的歌还想回去打球怎么破</span>-->
                </p>
            </div>
            <span class="times">{{postInfo.updated_at}}</span>
        </div>
        <div class="post-content">
            <p ref="content"></p>
            <img :src="img" alt="" v-if="is_text" style="max-width: 300px;border-radius: 4px;margin-top: 10px;">
        </div>
        <div style="background-color: #d3d3d3;height: 14px;line-height: 12px;">
            <span style="color: #fff;font-size: 12px;margin-left: 10px;">精彩评论</span>
        </div>
        <ul class="comment-content">
            <li v-for="(item,index) in discussList" :key="index">
                <div>
                    <span class="iconfont icon-ai-like"></span>
                    <span>{{item.like}}</span>
                </div>
                <div>
                    <div class="content-user">
                        <img :src="userList[index].avatar" alt="">
                        <div>
                            <p>{{userList[index].name}}</p>
                            <p>
                                <span>#{{rank.ranking_name}}</span> |
                                <!--<span>{{item.content}}</span>-->
                            </p>
                        </div>
                        <span>{{item.updated_at}}</span>
                    </div>
                    <p class="content-info">{{item.content}}</p>
                </div>
            </li>
        </ul>
        <div class="placeholder" v-if="!isInputFocus"></div>
        <div class="comment-box" v-if="!isInputFocus">
            <div class="input-box">
                <input type="textarea" placeholder="评论" @click="getInputFocus" v-model="commentText">
            </div>
            <span @click="submitComment">发送</span>
        </div>
        <div class="textarea-box" v-if="isInputFocus">
            <div class="visitor">
                <img src="http://p8rk87lub.bkt.clouddn.com/visitor.jpg" alt="">
                <span>游客</span>
            </div>
            <div class="input-box">
                <textarea ref="textareas" @blur="lostTextareaFocus" v-model="commentText"
                          @focus="getTextareaFocus"></textarea>
            </div>

            <span class="word-length">{{wordLength}}/350</span>
            <mt-button type="default" style="height: 30px;position: absolute;right: 2%;bottom: 23px;" size="small"
                       @click="submitComment"
            >发送
            </mt-button>
        </div>
    </div>
</template>

<script>
    import {getPostDetailsById, getElement, getSecondRank, getDiscuss, addComment} from '../../api/api'
    import {timeAgo, phoneType, getWindowHeight} from '../../utils/utils'
    import {Indicator} from 'mint-ui'

    export default {
        data() {
            return {
                is_text: true,
                postInfo: {},
                rank: {},
                discussList: [],
                userList: [],
                commentText: '',
                isInputFocus: false,
                wordLength: 0,
                screenHeight: 0,
                img: '',
                andriod: false,
                user: {}
            }
        },
        mounted() {
            this.$nextTick(function () {
                (() => {
                    let widowHeight = getWindowHeight($);
                    $('.post-details').css({height: widowHeight - 81});
                })()
                this.screenHeight = $(window).height();
            })


        },
        updated() {

        },
        created() {
            this.getPostDetails();
            this.getRank();
            this.getDiscuss();

            if (phoneType() == 'Android') {
                this.andriod = true;
            } else {
                this.andriod = false;
            }
        },
        methods: {
            getTextareaFocus() {
                this.isInputFocus = true
            },
            lostTextareaFocus() {
                this.isInputFocus = false;
            },
            getInputFocus(e) {
                this.isInputFocus = true;
                this.$nextTick(function () {
                    this.$refs.textareas.focus();
                })
            },
            submitComment() {
                var params = {};
                params.content = this.commentText;
                params.comment_type = 3;
                params.post_id = this.$route.query.id;
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
                        this.getDiscuss();
                    } else {
                        this.$toast({
                            message: '系统异常请重试',
                            duration: 1000
                        })
                    }
                    this.getDiscuss()
                }).catch(err => {
                    throw err;
                })
            },
            getDiscuss() {
                var params = {};
                params.level = 3;
                params.id = this.$route.query.id;
                Indicator.open({
                    text: '加载中...',
                    spinnerType: 'fading-circle'
                })
                getDiscuss(params).then(res => {
                    if (res.status == 200 && res.data.status_code == 1) {
                        var data = res.data.data.data;
                        for (let i = 0; i < data.length; i++) {
                            var str = data[i].updated_at;
                            str = str.replace(/\-/g, '/');
                            this.$set(data[i], 'updated_at', new Date(str).getTime());
                        }
                        data = data.sort(function (a, b) {
                            return a.updated_at - b.updated_at < 0
                        })
                        for (let i = 0; i < data.length; i++) {
                            let time = data[i].updated_at;
                            let str = timeAgo(time) + '前';
                            data[i].updated_at = str;
                        }
                        this.discussList = data;
                        for (let i = 0; i < this.discussList.length; i++) {
                            if (data[i].user) {
                                this.userList.push(data[i].user)
                            } else {
                                var obj = {};
                                obj.avatar = 'http://p8rk87lub.bkt.clouddn.com/visitor.jpg';
                                obj.name = '猎人 - ' + data[i].visitor.area;
                                this.userList.push(obj);
                            }

                        }
                        Indicator.close();
                    }
                }).catch(err => {
                    throw err;
                })
            },
            getRank() {
                var params = {};
                params.level = this.$route.query.rank_level;
                params.id = this.$route.query.rank_id;
                getSecondRank(params).then(res => {
                    if (res.status == 200 && res.data.status_code == 1) {
                        this.rank = res.data.data;
                    }
                }).catch(err => {
                    throw err;
                })
            },
            getPostDetails() {
                let id = this.$route.query.id;
                getPostDetailsById(id).then(res => {
                    if (res.status == 200 && res.data.status_code == 1) {
                        this.title = res.data.data.post_content;
                        var str = res.data.data.post_content
                        str = str.replace(/\/n/g, '<br>');

                        this.$refs.content.innerHTML = str;
                        this.postInfo = res.data.data;
                        var str = res.data.data.updated_at;
                        str = str.replace(/\-/g, '/');
                        str = timeAgo(str) + '前'
                        res.data.data.updated_at = str;
                        this.postInfo = res.data.data;
                        this.img = this.postInfo.img;
                        this.user = res.data.data.user
                    }
                }).catch(err => {
                    throw err;
                });
            }
        },
        computed: {},
        watch: {
            commentText(n, o) {
                this.wordLength = n.length;
            }
        }
    }

</script>

<style scoped lang="less">
    .post-details {
        width: 100%;
        overflow-x: hidden;
        position: relative;
        .top {
            width: 100%;
            display: flex;
            flex-direction: row;
            flex-wrap: nowrap;
            padding: 10px;
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
        .post-content {
            padding: 0 10px;
            padding-bottom: 30px;
            p {
                font-size: 14px;
                text-align: justify;
            }
        }
        .comment-content {
            width: 100%;
            display: flex;
            flex-direction: column;
            li {
                width: 100%;
                padding: 10px 0;
                border-bottom: 1px solid #D3D3D3;
                display: flex;
                flex-direction: row;
                flex-wrap: nowrap;
                div:nth-child(1) {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    flex: 0 0 50px;
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
            .input-box {
                width: 85%;
                height: 80%;
                border: 1px solid #d6d6d6;
                border-radius: 7px;
                background-color: #fff;
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                flex-wrap: nowrap;
                align-items: center;
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
        .placeholder {
            width: 100%;
            height: 46px;
            background-color: #fff;
        }
    }


</style>