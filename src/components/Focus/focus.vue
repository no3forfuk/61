<template>
    <div>
        <div class="focus-header">
            <span class="fl text-size-20 text-weight400">关注</span>
            <i class="iconfont icon-jiantou fr text-size-12"></i>
        </div>
        <div class="focus-body">
            <div class="focus-l fl">
                <p>#飞行器</p>
                <p style="color: #8B8B8B;" class="text-size-12 text-grey">@旅行者一号</p>
            </div>
            <div class="focus-r fr">
                <a href="javascript:;">
                    <img src="../../static/images/2018-04-25_153441.png" alt="">
                </a>
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        data() {
            return {}
        },
        created(){

        }
    }

</script>

<style scoped>
    .focus-l p {
        padding: 5px 0;
    }

    .focus-header {
        overflow: hidden;
        padding: 8px;
    }

    .focus-body {
        overflow: hidden;
        padding: 8px;
    }

    .focus-r a,img {
        display: block;
        width: 80px;
        height: 50px;
        overflow: hidden;
        border-radius: 4px;
    }
</style>