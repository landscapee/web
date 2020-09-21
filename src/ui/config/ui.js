/*
 * @Descripttion: 
 * @version: 
 * @Author: xdh.ss
 * @Date: 2020-05-13 13:00:10
 * @LastEditors: xdh.ss
 * @LastEditTime: 2020-05-13 13:19:02
 */
import Vue from 'vue';
import ScrollBox from'@components/Scroll/scroll';
import AdvTable from '@components/AdvTable/advTable';
import UploadFile from '@components/upload/index';
import SeeImg from '@components/seeImg/index';
import Download from '@components/download/index';
Vue.component('Download',Download);
Vue.component('ScrollBox',ScrollBox);
Vue.component('UploadFile',UploadFile);
Vue.component('SeeImg',SeeImg);
Vue.component('AdvTable',AdvTable);