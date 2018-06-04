import Vue from 'vue'
import Mint from 'mint-ui';
// import {Field} from 'mint-ui';

Vue.use(Mint);


import Focus from '../components/Focus/focus.vue';
import HomeList from '../components/Home/homelist.vue';
import Header from '../components/Header/header.vue';

Vue.component('y-focus', Focus);
Vue.component('y-homelist', HomeList);
Vue.component('y-header', Header);
//二级榜单组件
import rank2Header from '../components/Rank2/rank2Header';
import rank2neck from '../components/Rank2/rank2Neck';
import rank2SubList from '../components/Rank2/rank2SubList';

Vue.component('rank2-header', rank2Header);
Vue.component('rank2-neck', rank2neck);
Vue.component('rank2-sublist', rank2SubList);
//一级榜单组件
import rank1Header from '../components/Rank1/rank1Header';
import rank1neck from '../components/Rank1/rank1Neck';
import rank1SubList from '../components/Rank1/rank1SubList';

Vue.component('rank1-header', rank1Header);
Vue.component('rank1-neck', rank1neck);
Vue.component('rank1-sublist', rank1SubList);
//元素组件
import elementHeader from '../components/Element/elementHeader';
import elementNeck from '../components/Element/elementNeck';
import elementText from '../components/Element/postText';
import elementTextImage from '../components/Element/textImage';
import elementImage from '../components/Element/image';

Vue.component('ele-header', elementHeader);
Vue.component('ele-neck', elementNeck);
Vue.component('ele-text', elementText);
Vue.component('ele-textimage', elementTextImage);
Vue.component('ele-image', elementImage);