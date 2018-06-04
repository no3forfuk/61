<template>
    <ul>
        <li>
            <router-link :to="{}" class="text-black">
                <span class="pre">{{parseInt(Math.random()*10)}}#</span>
                <p>
                    <span class="text">{{rank.ranking_name}}</span>
                    <span class="placeholder">{{rank.ranking_name}}</span>
                </p>
            </router-link>
        </li>
    </ul>
</template>

<script>

    export default {
        data() {
            return {}
        },
        props: ['rank']
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
                    display: block;
                }
                p:nth-child(2) {
                    flex: 1;
                    height: 8px;
                    margin-left: 4px;
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