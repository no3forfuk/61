<template>
    <div class="root">
        <ul>
            <li class="">
                <router-link :to="{}" class="text-black">
                    <span class="rd-pre">1#</span>
                    <p class="rd-t-content">
                        <span>日本动漫</span>
                        <span style="opacity: 0">日本动漫</span>
                        <i></i>
                    </p>
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>

    export default {
        data() {
            return {}
        }
    }

</script>

<style scoped>
    .root{
        padding-top: 10px;
        padding-left: 20px;
        padding-bottom: 10px;
        padding-right: 10px;
        box-sizing: border-box;
        width: 100%;
    }
    ul{
        height: 24px;
        width: 100%;
        line-height: 24px;
        white-space: nowrap;
        overflow-x: auto;
    }
    ul::-webkit-scrollbar {
        width: 0;
        height: 0;
    }
    li {
        position: relative;
        display: inline-block;
    }
    .rd-pre {
        position: absolute;
        top: 0px;
        left: 0px;

    }
    .rd-t-content {
        margin-left: 20px;
        position: relative;
        overflow: visible;
        padding-bottom: 3px;
    }

    .rd-t-content span:nth-child(1) {
        position: absolute;
        top: 0px;
        left: 0px;
        z-index: 1;
    }

    .rd-t-content i {
        display: block;
        width: 100%;
        height: 10px;
        background-color: #E8E8E8;
        position: absolute;
        bottom: 3px;
        left: 0px;
    }
</style>