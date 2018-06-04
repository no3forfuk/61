<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>
<script>
    import {getWindowHeight} from './utils/utils'

    export default {
        data() {
            return {};
        },
        created() {
        },
        mounted() {
            var height = getWindowHeight($);
            $('#app').css({height: height});
        }
    };
</script>
<style>
    #app {
        width: 100%;
        overflow: hidden;
    }


</style>

