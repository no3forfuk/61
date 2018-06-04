<template>
    <ul>
        <li>
            <router-link :to="{}" class="text-black">
                <span class="pre">#</span>
                <p>
                    <span class="text">日本动漫</span>
                    <span class="placeholder">日本动漫</span>
                </p>
            </router-link>
        </li>
    </ul>
</template>

<script>

    export default {
        data() {
            return {}
        }
    }

</script>

<style scoped lang="less">
    ul {
        width: 100%;
        padding: 10px 0;
        height: 40px;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        li:nth-child(1) {
            padding-left: 15px;
        }
        li {
            padding: 0 5px;
            a {
                display: flex;
                flex-direction: row;
                flex-wrap: nowrap;
                align-items: flex-end;
                .pre {
                    flex: 0 0 12px;
                    white-space: nowrap;
                }
                p:nth-child(2) {
                    flex: 1;
                    height: 8px;
                    background-color: #E8E8E8;
                    overflow: visible;
                    position: relative;
                    white-space: nowrap;
                    width: 100%;
                    .text {
                        position: absolute;
                        left: 0;
                        top: -13px;
                    }
                    .placeholder {
                        opacity: 0;
                    }
                }
            }
        }

    }
</style>