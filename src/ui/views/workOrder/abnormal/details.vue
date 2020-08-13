<template>
    <div class="index1">

        <div style="height: 68px"></div>
        <div class="page_t">
            <div>工单流水编号-{{workorder.serialNo}}</div>
            <div>{{template.airlineCompany}} {{template.title}}</div>
        </div>
        <div>
            <InfoTop ref="InfoTop" :form="orderModule"></InfoTop>
        </div>
        <div class="order_content">
            <div class="order_c_main">
                <div class="item1 flex">
                    <div style="width:10%;">项次</div>
                    <div style="width:50%;">内容</div>
                    <div style="width:20%;">维修人员</div>
                    <div style="width:20%;">放行人员</div>
                </div>
                <div class="order_c_b">
                    <div v-for='(item, index) in contentVOListMap' :key='item.id'>
                        <!-- <div class="flex">
                            <div class="item" style="width:10%;">{{index+1}}</div>
                            <div class="item" style="width:50%;">{{item.name}}</div>
                            <div class="item" style="width:20%;"><button class='sign' @click="fixedSignFn">签字</button></div>
                            <div class="item" style="width:20%;"><button class='sign' @click="travelSignFn">签字</button></div>
                        </div> -->
                        <div class="flex">
                            <div class="item" style="width:10%;">{{item.reduceIndex}}</div>
                            <div class="item" style="width:50%;">
                                <div v-if="item.reduceIndex.includes('.')" class="textContent" :class="item.id" v-html='item.content'></div>
                                <div v-else class="textContent" v-html='item.name'></div>
                                <div v-if="item.reduceIndex.includes('.')" class='checkbox_group flex'>
                                    <el-button @click="editContent($event,this,item)">更正</el-button>
                                </div>
                            </div>
                            <div  class="item" style="width:20%;position:relative">

                                <button v-if="item.reduceIndex.includes('.')" class='sign' @click="fixedSignFn(item,'fix_sign_'+item.reduceIndex)">签字</button>
                                <div v-if="item.reduceIndex.includes('.')" style="width:20%;position:absolute;left:0;top:40px;">
                                    <div :id='"fix_sign_"+item.reduceIndex' :pos='"fix_sign_"+item.reduceIndex' style="width:100%;height:30px;width:100%"></div>
                                </div>
                            </div>
                            <div  class="item" style="width:20%;position:relative">
                                <button v-if="item.reduceIndex.includes('.')" class='sign' @click="travelSignFn(item,'travel_sign_'+item.reduceIndex)">签字</button>
                                <div v-if="item.reduceIndex.includes('.')" style="width:20%;position:absolute;left:0;top:40px;">
                                    <div :id="'travel_sign_'+item.reduceIndex" :pos='"travel_sign_"+item.reduceIndex' style="width:100%;height:30px;width:100%"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div style="height:60px;"></div>
     </div>
</template>
<script>
    import $ from 'jquery'
    import request from '@lib/axios.js';
import InfoTop from './infoTop'
    export default {
        components:{InfoTop,},
        data(){
            return{
                contentVOList:[],
                orderModule:{},
                workorder:{},
                workerCompleteData:[],
                template:{},
                templateSignObj:{}
            }
        },
        mounted(){
            let _this = this
            window.onload = function(){
                // var signs = [{
                // 	// extra : {
                // 	//     icon_move : function() {
                // 	//         //alert('禁止移动');
                // 	//         return false;
                // 	//     }
                // 	// },
                // 	signatureid : '147683973060447728',
                // 	//signatureid : '14768397306',
                // 	signatureData : 'eyJ0aW1lc3RhbXAiOnsidGltZSI6MTU1NzEyMTg4ODAwMCwic2lnbnRpbWUiOiIyMDE5LzUvNiDkuIvljYgxOjUxOjI4KOacjeWKoeWZqOaXtumXtCkifSwiYXBwbmFtZSI6Ik1vemlsbGEvNS4wIChXaW5kb3dzIE5UIDYuMTsgV09XNjQpIEFwcGxlV2ViS2l0LzUzNy4zNiAoS0hUTUwsIGxpa2UgR2Vja28pIENocm9tZS82NS4wLjMzMjUuMTgxIFNhZmFyaS81MzcuMzYiLCJkb2N1bWVudGlkIjoiS0cyMDE2MDkzMDAxIiwiZG9jdW1lbnRuYW1lIjoi5rWL6K+V5paH5qGjS0cyMDE2MDkzMDAxIiwibW92ZWFibGUiOnRydWUsImtleXNuIjoiMEU0RTQ1MTIwMjI3MTIxNCIsIm9yZ25hbWUiOiLph5HmoLznp5HmioDnlLXlrZDnrb7nq6DmtYvor5Xnu4QiLCJ1c2VyY29kZSI6IjBFNEU0NTEyMDIyNzEyMSIsInVzZXJuYW1lIjoiMEU0RTQ1MTIwMjI3MTIxNCIsInNlYWwiOnsic2lnbm5hbWUiOiJkZCIsImltZ2V4dCI6Ii5wbmciLCJpbWdkYXRhIjoiaVZCT1J3MEtHZ29BQUFBTlNVaEVVZ0FBQUpjQUFBQ1hDQVlBQUFBWW44bDVBQUFRU1VsRVFWUjQydTFkeVpXc09nelZqNGNsc1pBQ2NaQkdwVUFzYkluSHY2dGZxVm9ZZVpZSHdBdk9HN3FMQXZ0YXVwcEJLZlZmdi9xVjQ0TEhMOEsrcWQ5cmVTazF6VC9YcUJUOFhNUFAwa0RBTll6L1B2dSt4L3I2ZDg4T3JvY0JhZjJBNkEwR2dETFg4RXpRd2UzQjlON1VVaUFLdlpiNTFtQzdIN2pXN2FQYTRGclhXN3JkREdqUUFlWGdUejdYKy9jbDFleDBENGwyWVhBbHFydzNHTjVxYWQzeWJPU3UvbkdzSlpIZnZkK3hnNnR4SHZXV1JMK0VXcW5xQmtVTTJDNElNcmlVNmd2ZGxOYlZTOHhCdVJBM2cwdElxaUFMN0hWZHJoSUN0RGZJT3JnS0xQWjBNMHNyUkVvM3JDN2JCTmN5MzE5S1NSK3d0YjIxZ0V1cXdMVnhLWlVEOUcvd2VQRXhwVHE0WWs1bzd0T0pGbVdxaXlUbnMvcEk5YVVOVmRrR3VHcUQ2aTBKNmFhbFNCN2tTdm9HNC8xTGdhd0J3Zy9WMVVmcEJkcTNzMk1USGFySllON080TVMvNXpnb2J4VTR0RXNob0ZrMUtMMG95Rm0rR1FyYS9TY0J5WUtINWExZUYrSXNSWEJSaTFiU3VuWHhzVXBrSDVvajdiVXNRQW11Z3M4L2pDUzFSM3UzMy9mLzVJdVZQckMzQnRlNk5mWHlvbExyNjNQYXp2ZkNuMDFhZ0R0TFRMT2ROUzRITHB2b3JraytNWnNpeFlUSGQ5UC92aFBMRVROZGRjNVV3MGdxcENhaE9yK3E3ZnhEU1pJaVJlam44VjNwbnptc3hWU0RxY0M2UTFWZ3RlTHc1SjRGOCtwOXdFazN5cVQ2cHJuT085dlVaR2FBUVJHVnd3S3JFUzg3THY1dXNCNWpOb0RHL2RBcXhlVERGTGNEOSt5cFhEZWpBUVhaMVUwc3Y4TFBUOXJ2b3hVbVNZWVJDTCtxNi9POUEvd1ZWY1FBQzU5VnlpcWN4clBrQ3dXc0xmQi9HWENaVkdFb2NlZlVKejJGU1k1VUpta3Z0VG9IQVVCOWFGSldJVjFUL1FCS0VQME1LbEllWE1zc1p4R2k1WVduVStjUHNkd0RIYW43WjBGak5za2thWDMvMzdlZTBnUU9hbjFMV1pMQ2ptc29JckZTdUliSitvb0ZtTzFBcFBqdWFKRUc1cGNoaUdONDVzUllzUWlvWFVCNm0yaUxvQVNUQTVlSk5DYjdzRGJlNllqZko4RVg4RjZoSnhjM2lHNEl4aTRuTFZZWlNxQnBycjBlbnp4OS8vYkg4U1FrV0Z2ZzJtVGREZnVtVHZGQVRnS21XSFNwNFI4c3R0RC9qbG1rK3J0UXl6bjBlMHlxaTVNK1VpcXlHWEJKU3l4Nkg5d2M5RWZSRFpWY2pKUm5YcldRank1ZEVFeExoR1RCOTUyb2xOek9sbDdLT3JEN2w3Nm1rTTNsSUFWWUc1bWxDNXVxZnFkRVVxK0RDdzlGN0hvYzFLb215VTNxTlVXQ1o4alBUd09YS2J3ZzRTRFZMVVY5Y2FsNlFFS2U0aEEwZWVwajFDbyszOWNydjhWWnRyK1pzZHQ1SFlaUjNyb3pjZVlFTndxSXEwTkpmd2x1RG5JYXlyOTAzcEpxVHBzODlhR08ySFU3U3RjbHdjTlB2ZkltbW9CckpCSDhOMW43eGNGVnl0UExrVm5PZDdSdnh6NFBNYmxac1llREFoTjdSNnlSa2hEVk0yZUpVbmZNb0xra3BFck1PSm9UQ1Z4b2ltZTUvRWdtVHZaZGRDM3owMGVLWWFCNUdPUERVNWhTWStKZ3dabXM4OWxhdGtVb01IU1ZNMTBuQXJ3UXpZVktaamh3TGdlZEkreWFyMmZkL0ovclFKUTlGL0ZYVlRPOUh4Q3NkRE80dEdyNk0yNVRXVFc1bVdsQmlkeTc3T0NDc1U0cGsvNkNKbkxQVnVKNHFMcDlremtrSzhZdFBUZm5rUFAxYVpReVdWUmlxZldlMHRWakdMall1R0hCTEZJOXpPSUtnMGlFU1NRcmpseFNRbTEyS1ZZNmF6Y3gvZ2pKWDFZeUwydGhNZ1Ayelh5cU1xZVVaRkg5bUE3OWRXZU1ZcTZCRTZoZDkwcFVqNUJFNGwwa1QwZjVRWlc5bEpKeXJpNGFKenNzeWdXQXhhM1BnWXRsNEZtK0lFa2c5NUNGNEwxNWcwbFBjejZjNkVvYjVyN0QyRnhaZTd6ckJRL2dsdWEvTTYxVmlzYnlrS0FRTGJWV3oveHkvV0VrSEsybXorZFFIMFdMUllCM0dxT1ZHUE5PZXJacXpNR2J4aWpwQmQ1V1ZLeFpxcnNNcUNURFdqN0pIbE5YYmF1MHZKUlZJc2NjR0FTb0hpcDcvNytldlJIRnQxUEJKUlZ2bXBoZURQUkUzTDNQbHMvNm1LUkpURExqd2poZ2JlQnc3U3NYUjNhQUU4S2xsZ1B0cHFJRzZrSC9jaU10ZS9QcEFKTjJmL3hLcU5kZm9RbDE3dEsvKzVhOUJVb3ZFSlZhcHQvVEMwOFhMZjk3ZlYyK0xYWjFJMEFuOElmeXRoZlBkK21COTFsN3pzOXBFUW9RbklJUndyRm83d1FkY1BxL3AvazVyU2h6T1plNURhZEJmajBrUnYxcEdiZ1hCRmtJSVZhZW5yNnhhRlhKbkJSMHVqajZKRERqWnV1VjMxUTdUS1BaeTUrNnJ4YkxFeVN0QXk5LzEwNGFwSEg5NGswaU9pVS82bzU4NnB2SHBVbWVkVHQzdVVZQVVlbjJ6VzRsNlVLK0VzeVRoNE8zMHpUV0lZbWZwUkpNNXdpRElSZyt6ZWNoQUU4SDFnRWdMMlhkZE4zRGp3ZGNqNVNFcHRWdys4Vm9GZkQrc0VTbzV1QTlOK1NBdXdaRXJRK1dYTi9jTm0wekZ5WmpRcmZPZFFGQnBWdm9Ibk5lQkFhWTRDWDJvdDBFVE5Xd3owbFp0K3Q2MlhQN3duVGZFbllxMUxrVVY0NUhQZjY2R3BTb2VYU0Npek0zcFhrTzE2T0JEWVUwNlB1cUN2aU5IOTIza056OWc5VkkvRmVEc01PYUkvWWFad092Wk1BY3ZHSFE2dTMwRTdsdTdYR3M5ZFdHTDQ1THhUa1lQWWJzVnNudVFLeHFIRjNnS3BEQ2JNc3ExY1Y0U3h4TG9tRkpqcGdrTFJUK05sblo4a2MvSEZnQnAwb3N1Yms2dVh3L1QwdXVoOVlhMTVuQ2JxWDYwSE9xa1VoR2NEcE9hMWxFMUV4dXlWSnIxV0pGdDgweWw0dlZjcXFScUdRb3JoSkRIN2laelJ2YkhrTlhLem5Ta2lsaEIxZnBoNlhlNUZvTmFuMFhzU25lTmRlVHFCYWZLRmdEMWQzUFpCYi9lMk1OZzJzQm5vdm1uTURGa2JNT0xQUGF0RElHK051QVdLbG1wUHBIZ29KUnZMa1dMNVF3VHVOMUFkdHlILzBXSE1PR1VCQzRmaUdvQ1FrT1R0SWZ0cFhpVkNtVmVDZmFNSTFtUVVKOWFDRzg2M00vTTdoYy9oRk1vOFhzQmR2QWIvVEJ3QVVIbmRzbWdBeU5oYWRpTW5wdGhScUQ1d0V5VUNvUUlmTllKVXh6aEpiWGVVb1hKKzBRZUsyQ3pqWEZ0dVZLSWpxb2ROM01hMng2aitYbDU4UTJrSG93ZXVaanU5SFp4Q2ltMU5na1hVdUZHajREM1Z1V3hPdkxmcmhwbDJoalV4VVBLV2dRVGhCdEtickdwSnlTQU1lLzZMenBBVkYxWGtFbHR1eFF0WUdBRzQ1ZzIyOHZRY01MR1FoT0R1U2FnUnowTjIySU8vK1ZONjJPVTNKRmxTalU5VGhyTlpBdnFaZnVLZkdERTNDNThMMmJnUnhLeU5ReDR3RXJmRXVCQ3kzVzc2VXMvN2I4ekFkYzMvZWxuMVdPN3pMOFhGTGF1dW9ZVHpsMWdYek13eDBCVVptbk81TzB0c3pxMUVCdFlIS09wRnNzaHJiV2JQR1NzanIxUGJTcWMySk0yVndPc2VENmVTY0k5bkdaR3JGWjNSQmFPbTBwRTk0MXRiNkZTekllZUNMV0JFQ2NaTUwvMnkzdUNOOTZVZ1lIRUIyd1JzdVA5Yk9NN3BNNnpYOG5SbEl0eEhLbnEwb3JLZFZwNG83Zkh2K3pPMkxqQjY2WGlpS09xOVlMaXJhOXhvS0F4VkxoazNQQmw0YWtXSzIrWWJaSWljbXRzbTUrMHBXeHJNRVdlQXp1azRVRkF5YVJhZUp5Nk9uUDdZWll0L3JBcXVJWEl6bjNwZ09jZXNDOXdSV2JXbXdOR1pFcTRkcVpuRDcrSyttcmhqK001c1c1RExWVXpiRklTNjVvRGpUV0IxaEpzdDlDRXQrYVdXS3lrb3ZOZzM1UVZYTnVZTlVPWDVWU3c5blY0bFd2WmI0UGFXK0lhdFJSaTFmTDI3b0VhVy92Z0hiSkpVMzBuOW9ka2VkY3FpK1FOUC9xNExKSUxrbHd1VlFzYldSV0U5U1MxdU1UYVFXVDZod1h1STdwMS9sdDJZTlR2Y1p6NmtwTmNFa0d1bXVHZHBhWHU3ZC9EcmZFNEJ1NEhvVEJwYmYyUVRBaHQ1UHN2dEtLUzZJRjlXU1NvRG5hSkRBQ0tqeFpNRWJWWUtEYTlNTDdWamU5T1VmY3NaWnFwT3RzTTg2a0s5b1pvekErelprK3BNbW5BMXJYWnB1RW91MnNXMVdKT05xa1phdFJCNDJONWd5ampPdGt0NlU1VzBxeW8wZ3d6Zk9pSjVpVFVGZ0VVTE5Jd3p2Yk5QQXp0YmpqYVZMY2FKYW1FdjMvV1hCaGdRWmJ2ZUZSSGs0NzNDM3pYeHRGbTRyZzJsYnJreDVhc2hKdC9OUGxGNnNWVStRT3A4MGl4OE1keTdVWFcybVoydElXaHAzSzhEcFBPcVdiOFUyTlZxb3BFenJVbVd3RFp3MnIwUlo2c3ZVWVN4bTB1dGlLWW1OOFhmcHNIMWUxTHkwMU05NVRxYWdKWFMzMGdXaEZOWEpheHpTcGhBUFNOSVpuVWpqTCtVTWJrWmhPS3BiM0w2U0tHdHRaRDJTaXcwNnFzNmU1VG1ZR0ozVlNpUGhVcWUzblFxWnA0RHNNanRuWU5nRFJkZkVwNlhjMklnbXhHRkc4VHVOZkF4THNYNG8zUjVEUkZ0YVlBcklZNXNlVXRoUnpBRUVIYkNuVmVPS3duMzFSQ2VPTGZkZkUyVUpKb3NFWkFuVFhxbjI0b28yV0hLYzVBREE4WkZBcFIrWS8reXJidHZMYnFucFVSa3VxbGNZalM0RVpqOVBjWm00WEZzZ09vOTJWTkhsMDA1NTgybGJHTk56RmVDRmFoUnh2bzNPc0Q4T2lSbVh0RFZXRStCWUFPUExOVm5QV1VIMWlsYzlLS3JOOURwOTN3OTNRTU5EQURDN2FOeG5BN051emgwamxxZ0tTNUpkQnJjSTUvV2w3aU1GUWFJRldvd1JucWUwSHUyUE9tblJmQ2tNaENEaGI0Y1JJb2VTSDMzcnkzVldUSzhuUDY4eitjWUpUSFZzdURXTUgyQlZxRGdiWFlLbmE4MzlDUXhwZHhkWE52ckRnSlBNd3o0UzIxWnlwM0ljdUdOb2tORENXeFd1WVp3M1Z1TDZPL1RsMVFDMnZ6cjljbTF4YUFFU1BJZWFzeHB5eFBnb2tHaW82ZE1vQjFlUzh3eFphRWt4ejJjUG5NU1hXREs2YzBvdkdHTG52T2dTN05XQXZMOVVKUHBicHF5UFAyUXVPN1BQRUJnVGxPVWs4dE8yQnZ0bXIyL0ZFMEdCd1NFRDFMaFlaNVo4VVJCelh5cTFwcHRtN2RRR0VKY0VKU0F4WGpTSW54ZlIvTC9NektzTjF5MTBSaVdXem9GMjl1S1NsbHNIUkRjRTNTazJMb1NtMXVnWElTVW5USVBXbldJK21kWGRsWFhDSE5EV3RpWE5UV1F3SkNFK21TendOcHJuSTlEUXVwSzdPVmVENUtJdHdObWVOc2hWQTI1OVVrU2pFQ0d5NkF0STM5TDRmWnFyQ3lITzZZWHh1YVh4STdwbWUrNDcvcG51RWh6ZkZFYzBKR29mYWRZT0w3U002cG9GTGwzNDJjdHBEUDd4YUNzbUxsM0MwUmdnWmlMNXhqRVQ1NXMvckJIRGp4WDdMMDh4YWFKaXlHZ0JHMTVGVG02YSs5Q0hacGg3MENLSkZZb3pmeTFSVFp5cm03SmRibTFCVmg3VU1xK2FBdGptdFF6TlVBajRMU1dJeFJJZnJvMXRNTTJoYUhZL1hldHNpazdUUlFiRE1ZYndaeHVnS0tVald1OTZTenpMS2hZNFFvYTJXZXFKZ21QWE54ZjVpSzNwc3JUdzludzJTM1FnK1g4YWxRM2NyTUkrYVJJdVJzN1pEaVgxc0ZYb1V1R0xKL1RRZWc5SDl5cHNmYndzTHBRaVNRRTRNSXY2T25xblF0ajhzTkp0azMwUzZWSU9ZejZOYmVtMzZ3MElKdkdsL0kveGtvQ1NkYWxOUFJXN1NIeGF5THlhaksrSVo0c0VsSkRyN1ZjaVM5Tm1YUlpieWdKajQ3ZnlyNGNSQ0QyQ1poRVZDRmdXSUVjZ09zUHZWSUNZNnNTSGJnM1dDZjIxZ0NRZ0lFQk85SFdBZFdGbkFaZk4vZFlCZEl6YVp3U2lEYk5iSjAyZmhORzlKanRublJFSlc4N2RuT0Z4TFlna0xBU2g2S3JxS2JCZFlHUnpnVUp3b2RnbldIckF5SFhxNDA4djBLK2F3NXd2WlFUWGkyQjJ0dHdaV0dYRFpKRmlQUlpZTFhsZElNb0J5cHUvYzVtVFYyMHFyc2ZyQUsyam1KSFdBNVZlREV1MFltZ1dYQzJCUGFDNVNzbkZKWlFvQzFSWmlHdHVjRVgzMUFvMkdramloNnFLNGhtSDJ6TmIwUTFveDlBYlZGMmZmMmgxR2ZtVVYrTXRoNjFyaWNBa1NXb0dNWHRLOTBGZ1VCQzY1Y0UvMGpiMFAxdUF6NkwyZHRZRTJlY1NzdkNUWkV5ekxDNjhGWE5aZmMyZml2Mi9LRzFRTkp3TEFMVGdHSmJGWEp2KzJBWnNYNUtCd0cxL09GZFdtYWQ3M2hYalZQY0NWQXJKYUE5cE56ejlGQUFxdVo4akFwWG5KQUhGQUt6VnJHNmZkUm9IcCt0WXgzTWYzTThadjRJRzMwZG5jbjdibGkrVlAvTDFCNlB2eEdXN2cwNE43bWU3YWhMT3JYVGVMUk1DdGZVVExTMWFpU0Y5WHQyNGZEUzVPZmRZQ0hFNENlVkIwNFZuZ01uV0FXVDZrZXhybCtGcG9yL2NiWHY4REVoUE82ZFpQb3ZVQUFBQUFTVVZPUks1Q1lJST0iLCJ3aWR0aCI6IjQuMDAiLCJpbWd0YWciOiIyIiwic2lnbnNuIjoiSTh5YkVWaWgySnJ3bENLRlRYYVJNQjFRNStVdG5TTno3YzkvR3ZtTFlmRDZPdWczQWQwSHhwV2VqUD1zcVo0b2siLCJoZWlnaHQiOiI0LjAwIn0sInByb3RlY3RlZERhdGEiOlt7ImZpZWxkIjoiaXRlbTEiLCJkZXNjIjoi5L+d5oqk6aG5MSIsInZhbHVlIjoi5ZCM5Yib6L2v5Lu25YWs5Y+4In0seyJmaWVsZCI6Iml0ZW0yIiwiZGVzYyI6IuS/neaKpOmhuTIiLCJ2YWx1ZSI6IumHkeagvOenkeaKgOaciemZkOWFrOWPuCJ9LHsiZmllbGQiOiJpdGVtMyIsImRlc2MiOiLkv53miqTpobkzIiwidmFsdWUiOiLmoLnmja7jgIrlkIjlkIzms5XjgIvlj4rmnInlhbPop4TlrprvvIznu4/lj4zmlrnljY/llYbvvIzovr7miJDkuIDoh7TvvIznrb7orqLmnKzlkIjlkIzjgIJcclxu5LiA44CB55Sy5pa55aeU5omY5LmZ5pa55Yi25L2c5peg57q45YyW5Yqe5YWs57O75YiX5Lqn5ZOB44CCXHJcbuS6jOOAgeWFt+S9k+inhOagvOWei+WPt+OAgeaVsOmHj+OAgeWNleS7t+WPiuS7t+agvOivpuingemZhOWQjua4heWNleOAglxyXG7kuInjgIHkuqTotKfml7bpl7TvvJo2MOW3peS9nOaXpVxyXG7lm5vjgIHpqozmlLbmnJ/pmZDvvJoyMOW3peS9nOaXpeOAglxyXG7kupTjgIHlj4zmlrnlnKjlkIjlkIzkuIrnlLXlrZDnrb7lrZfnm5bnq6DlkI7nq4vljbPnlJ/mlYjjgIIifV0sInNlYWxUeXBlIjoic2VydmVyIiwidmVyIjp7Im5hbWUiOiIxLjAuMjAiLCJjb2RlIjoxMDB9LCJkYXRlVGltZSI6eyJmb250RGF0ZSI6eyJmb250Rm9ybWF0IjoieXl5eS9NTS9kZCIsImZvbnRGYW1pbHkiOiLmpbfkvZMiLCJmb250U2l6ZSI6MjAsImZvbnRDb2xvciI6IiMwMDAiLCJmb250UG9zaXRpb24iOlsicmlnaHQiLCJ0b3AiLCJvdXRzaWRlIiwiIiwiYmVsb3ciXX19LCJwb3NpdGlvbiI6eyJwb3MwIjp7fX0sInRpbWVpZCI6MTU1NzEyMTg5NDQyNX0='
                // }];
                //Signature.loadSignatures(signs);
                Signature.bind({
                    remove : function(fn) {//签章数据撤销时，将回调此方法，需要实现签章数据持久化（保存数据到后台数据库）,
                        console.log('获取删除的签章ID：' + this.getSignatureid());
                        fn(true);//保存成功后必须回调fn(true/false)传入true/false分别表示保存成功和失败

                    },
                    update : function(fn) {//签章数据有变动时，将回调此方法，需要实现签章数据持久化（保存数据到后台数据库）,执行后必须回调fn(true/false)，传入true/false分别表示保存成功和失败
                        console.log('获取更新的签章ID：' + this.getSignatureid());
                        //console.log('获取更新的签章数据：'+this.getSignatureData());
                        fn(true);
                    }
                });
                var invalidSignatureArray = Signature.verify();//返回无效签章
                console.log(invalidSignatureArray)
                if (invalidSignatureArray.length > 0) {
                    for (var i = 0; i < invalidSignatureArray.length; i++) {
                        var signature = invalidSignatureArray[i];
                        //console.log(signature.modifiedItems);//获取修改的保护项
                    }
                }else{
                    Signature.alert("当前文档所有签章有效");
                }
            }
        },
        computed:{
            contentVOListMap:{
                get:function(){
                    const result = [];
                    this.contentVOList.forEach((item,index) => {
                        const map = (item)=>{
                            result.push(item)
                            if(item.children && item.children.length){
                                item.children.forEach(item1=>{
                                    item1.contentDetails.forEach(item2=>{
                                        result.push(item2)
                                    })
                                })
                            }
                            if(item.contentDetails && item.contentDetails.length){
                                item.contentDetails.forEach(item1=>{
                                    result.push(item1)
                                })
                            }
                        }
                        map(item)
                    })
                    let reduceIndex= 0
                    let itemNumber = 0
                    result.forEach((item, index)=>{
                        if(item.number){
                            reduceIndex = 0
                            itemNumber = item.number
                            item.reduceIndex = itemNumber
                        }else{
                            reduceIndex++
                            item.reduceIndex = itemNumber+ '.' +(reduceIndex)
                        }
                    })
                    console.log(result)
                    return result
                },
                set:function(){}
            }
        },
        mounted(){
            this.init()
        },
        methods:{
            editContent(e,that,item){
                console.log(e,that, item);
            },
            async init(){
                await this.getTemplateById()
                this.getBySerialNoFn()
            },
            getTemplateById(){
                let _this = this
                return new Promise((resolve,reject)=>{
                    request({
                        url:`${this.$ip}/mms-workorder/workorder/execute/10001`,
                        method: 'get',
                    })
                        .then((data) => {
                            if(data.code==200){
                                this.orderModule= data.data.template
                                this.contentVOList = data.data.template.contentVOList
                                this.workorder = data.data.workorder
                                this.template = data.data.template.typeVO
                                this.$nextTick(()=>{
                                    //if($(".textContent button").innerText ==='签章'){
                                    $(".textContent button").on('click', function(){
                                        $(this).siblings("input").attr("pos", $(this).siblings("input").attr("id"))
                                        _this.signFn($(this).siblings("input").attr("id"))
                                        // $(this).parent("p").css({
                                        //     'position':'absolute'
                                        // })
                                    })
                                    //}
                                })
                                resolve()
                            }else{
                                this.$message({type: 'error', message: '新增失败，请重试'});
                            }
                        })
                })

            },
            signFn(type){
                var signatureCreator = Signature.create()
                var that = this
                signatureCreator.handWriteDlg({
                    image_height: "2",
                    image_width: "5",
                    onBegin: function() {
                        console.log('onbegin')
                    },
                    onEnd: function() {
                        console.log('onEnd')
                    }
                }, function(param){
                    signatureCreator.runHW(param, {
                        // protectedItems:[ 'item1', 'item2', 'item3','item4',
                        //                 'item5', 'item6','item7', 'item8',
                        //                 'item9','item10', 'item11', 'item12',
                        //                 'item13','item14', 'item15', 'item16',
                        //                 'item17'],//设置定位页面DOM的id，自动查找ID，自动获取保护DOM的kg-desc属性作为保护项描述，value属性为保护数据。不设置，表示不保护数据，签章永远有效。
                        position: type, //'pos3',//$("#pos3").attr('pos'),//设置盖章定位dom的ID，必须设置
                        okCall: function(fn) {//点击确定后的回调方法，this为签章对象 ,签章数据撤销时，将回调此方法，需要实现签章数据持久化（保存数据到后台数据库）,保存成功后必须回调fn(true/false)渲染签章到页面上
                            console.log("盖章ID："+this.getSignatureid());
                            console.log("盖章数据："+this.getSignatureData());
                            // if(type==='pos3'){
                            //     that.workerSignatureData[this.getSignatureid()] = this.getSignatureData()
                            // }else if(type==='pos4'){
                            //     that.customerSignatureData[this.getSignatureid()] = this.getSignatureData()
                            // }
                            // console.log(that.workerSignatureData)
                            // console.log(that.customerSignatureData)

                            that.templateSignObj[this.getSignatureid().toString()] = this.getSignatureData()
                            fn(true)
                        },
                        cancelCall : function() {//点击取消后的回调方法
                            console.log("取消！")
                        }
                    })
                })
            },
            getBySerialNoFn(){
                request({
                    url:`${this.$ip}/mms-workorder/operationInf/getBySerialNo/${this.workorder.serialNo}`,
                    method: 'get',
                })
                    .then((data) => {
                        if(data.code==200){
                            let infList = data.data.infList
                            this.workerCompleteData = data.data.infList
                            let map = data.data.map
                            $(".checkbox_group").find('input[type="checkbox"]').each((it,ele)=>{
                                $(ele).prop("checked",false).prop("disabled",false)
                            })
                            $(".textContent").find('input[type="checkbox"]').each((ite,ele)=>{
                                $(ele).prop("checked",false)
                            })
                            if(infList && infList.length){
                                infList.forEach(item=>{
                                    $("."+item.contentDetailId).siblings(".checkbox_group").find("#1"+item.contentDetailId).prop("checked", item.workerCompleted).prop("disabled",item.workerCompleted)
                                    $("."+item.contentDetailId).siblings(".checkbox_group").find("#2"+item.contentDetailId).prop("checked", item.commanderCompleted).prop("disabled",item.commanderCompleted)
                                    $("."+item.contentDetailId).siblings(".checkbox_group").find("#3"+item.contentDetailId).prop("checked", item.invalid).prop("disabled",item.invalid)
                                })
                            }
                            if(Object.keys(map).length){
                                let signs = []
                                for(let i in map){
                                    if(i.includes("sign") && map[i].includes("------")){
                                        signs.push(
                                            {
                                                // extra : {
                                                //     icon_move : function() {
                                                //         //alert('禁止移动');
                                                //         return false;
                                                //     }
                                                // },
                                                signatureid : map[i].split('------')[0],//'147683973060447728',
                                                //signatureid : '14768397306',
                                                signatureData : map[i].split('------')[1]
                                            }
                                        )
                                    }else{
                                        $("input[name='"+i+"']").prop('checked',map[i]=='true'?true:false)
                                    }
                                }
                                console.log(signs)
                                Signature.loadSignatures(signs)
                            }
                        }else{
                            this.$message({type: 'error', message: '新增失败，请重试'});
                        }
                    })
            },
            fixedSignFn(item,type){
                console.log($('#1'+item.id).is(':checked'))
                if(!$('#1'+item.id).is(':checked')){
                    this.$message({type: 'warning', message: '请先点击维修已完成'})
                    return
                }
                var signatureCreator = Signature.create();
                var that = this;
                signatureCreator.handWriteDlg({
                    image_height: "6.7",
                    image_width: "5",
                    onBegin: function() {
                        console.log('onbegin');
                    },
                    onEnd: function() {
                        console.log('onEnd');
                    }
                }, function(param){
                    //alert(param.imageData);
                    signatureCreator.runHW(param, {
                        // protectedItems:[ 'item1', 'item2', 'item3','item4',
                        //                 'item5', 'item6','item7', 'item8',
                        //                 'item9','item10', 'item11', 'item12',
                        //                 'item13','item14', 'item15', 'item16',
                        //                 'item17'],//设置定位页面DOM的id，自动查找ID，自动获取保护DOM的kg-desc属性作为保护项描述，value属性为保护数据。不设置，表示不保护数据，签章永远有效。
                        position: type, //'pos3',//$("#pos3").attr('pos'),//设置盖章定位dom的ID，必须设置
                        okCall: function(fn) {//点击确定后的回调方法，this为签章对象 ,签章数据撤销时，将回调此方法，需要实现签章数据持久化（保存数据到后台数据库）,保存成功后必须回调fn(true/false)渲染签章到页面上
                            console.log("盖章ID："+this.getSignatureid());
                            console.log("盖章数据："+this.getSignatureData());
                            that.postSignFn(item, type,this.getSignatureid()+'------'+this.getSignatureData())
                            // if(type==='pos3'){
                            //     that.workerSignatureData[this.getSignatureid()] = this.getSignatureData()
                            // }else if(type==='pos4'){
                            //     that.customerSignatureData[this.getSignatureid()] = this.getSignatureData()
                            // }
                            // console.log(that.workerSignatureData)
                            // console.log(that.customerSignatureData)
                            fn(true);
                        },
                        cancelCall : function() {//点击取消后的回调方法
                            console.log("取消！")
                        }
                    });
                });
            },
            travelSignFn(item,type){
                if(!$('#2'+item.id).is(':checked')){
                    this.$message({type: 'warning', message: '请先点击放行已完成'})
                    return
                }
                var signatureCreator = Signature.create();
                var that = this;
                signatureCreator.handWriteDlg({
                    image_height: "6.7",
                    image_width: "5",
                    onBegin: function() {
                        console.log('onbegin');
                    },
                    onEnd: function() {
                        console.log('onEnd');
                    }
                }, function(param){
                    //alert(param.imageData);
                    signatureCreator.runHW(param, {
                        // protectedItems:[ 'item1', 'item2', 'item3','item4',
                        //                 'item5', 'item6','item7', 'item8',
                        //                 'item9','item10', 'item11', 'item12',
                        //                 'item13','item14', 'item15', 'item16',
                        //                 'item17'],//设置定位页面DOM的id，自动查找ID，自动获取保护DOM的kg-desc属性作为保护项描述，value属性为保护数据。不设置，表示不保护数据，签章永远有效。
                        position: type, //'pos3',//$("#pos3").attr('pos'),//设置盖章定位dom的ID，必须设置
                        okCall: function(fn) {//点击确定后的回调方法，this为签章对象 ,签章数据撤销时，将回调此方法，需要实现签章数据持久化（保存数据到后台数据库）,保存成功后必须回调fn(true/false)渲染签章到页面上
                            console.log("盖章ID："+this.getSignatureid());
                            console.log("盖章数据："+this.getSignatureData());
                            that.postSignFn(item, type,this.getSignatureid()+'------'+this.getSignatureData())
                            // if(type==='pos3'){
                            //     that.workerSignatureData[this.getSignatureid()] = this.getSignatureData()
                            // }else if(type==='pos4'){
                            //     that.customerSignatureData[this.getSignatureid()] = this.getSignatureData()
                            // }
                            // console.log(that.workerSignatureData)
                            // console.log(that.customerSignatureData)
                            fn(true);
                        },
                        cancelCall : function() {//点击取消后的回调方法
                            console.log("取消！")
                        }
                    });
                });
            },
            postSignFn(item,type,getSignatureid){
                request({
                    url:`${this.$ip}/mms-workorder/operationInf/sign`,
                    method: 'post',
                    data:{
                        contentDetailId: item.id, //'42b51712b93254d2ede69d6ef251c68c', //item.id,
                        serialNo:this.workorder.serialNo,
                        key:type,
                        value:getSignatureid
                    }
                })
                    .then((data) => {
                        if(data.code == 200){
                            this.$message({type: 'success', message: '提交成功'})
                        }else{
                            this.$message({type: 'error', message: data.message})
                        }
                    })
            },
            fixCompleteFn(item,$event){
                let map = {}
                if($($event.target).parents('.checkbox_group').siblings('.textContent').find("input")){
                    let inputArr = $($event.target).parents('.checkbox_group').siblings('.textContent').find("input[disabled!='disabled']")
                    for(let i=0;i<inputArr.length;i++){
                        map[inputArr.eq(i).attr("name")] = inputArr.eq(i).is(':checked')
                    }
                    let inputSign = $($event.target).parents('.checkbox_group').siblings('.textContent').find("input[disabled='disabled']")
                    for(let i=0;i<inputSign.length;i++){
                        if($("div[elemid="+inputSign.eq(i).attr("id")+"]")){
                            let  signatureid = $("div[elemid="+inputSign.eq(i).attr("id")+"]").attr("signatureid")
                            map[inputSign.eq(i).attr("name")] = signatureid+'------'+this.templateSignObj[signatureid]
                        }
                    }
                    let inputText = $($event.target).parents('.checkbox_group').siblings('.textContent').find("input[type='text']")
                    for(let i=0;i<inputText.length;i++){
                        map[inputArr.eq(i).attr("name")] = inputArr.eq(i).val()
                    }
                }
                request({
                    url:`${this.$ip}/mms-workorder/operationInf/workerComplete`,
                    method: 'post',
                    data:{
                        contentDetailId: item.id, //内容id
                        serialNo: this.workorder.serialNo, // 工单流水号
                        signingTime: '', //签章时间
                        map
                    }
                })
                    .then((data) => {
                        if(data.code == 200){
                            this.$message({type: 'success', message: '提交成功'})
                            //this.workerCompleteData = data.data
                        }else{
                            this.$message({type: 'error', message: '接口调用失败，请重试'})
                        }
                        this.init()
                    })
            },
            commanderCompleteFn(item, $event){
                let inObj = this.workerCompleteData.find(i=>i.contentDetailId===item.id)
                if(!inObj){
                    this.$message({type: 'error', message: '操作有误，请检查'})
                    this.init()
                    return
                }
                request({
                    url:`${this.$ip}/mms-workorder/operationInf/commanderComplete`,
                    method: 'post',
                    data:{
                        id: inObj.id
                    }
                })
                    .then((data) => {
                        if(data.code == 200){
                            this.$message({type: 'success', message: '提交成功'})
                        }else{
                            this.$message({type: 'error', message: '接口调用失败，请重试'})
                        }
                    })
            },
            invalidFn(item, $event){
                let inObj = this.workerCompleteData.find(i=>i.contentDetailId===item.id)
                if(!inObj){
                    this.$message({type: 'error', message: '操作有误，请检查'})
                    this.init()
                    return
                }
                request({
                    url:`${this.$ip}/mms-workorder/operationInf/invalid`,
                    method: 'post',
                    data:{
                        id: inObj.id
                    }
                })
                    .then((data) => {
                        if(data.code == 200){
                            this.$message({type: 'success', message: '提交成功'})
                        }else{
                            this.$message({type: 'error', message: '接口调用失败，请重试'})
                        }
                        this.init()
                    })
            },
            backFn(){
                request({
                    url:`${this.$ip}/mms-workorder/operationInf/back`,
                    method: 'post',
                    data:{
                        serialNo: this.workorder.serialNo
                    }
                })
                    .then((data) => {
                        if(data.code == 200){
                            this.$message({type: 'success', message: '提交成功'})
                        }else{
                            this.$message({type: 'error', message: '接口调用失败，请重试'})
                        }
                        this.init()
                    })
            },
            cleanFn(){
                request({
                    url:`${this.$ip}/mms-workorder/operationInf/clean`,
                    method: 'post',
                    data:{
                        serialNo: this.workorder.serialNo
                    }
                })
                    .then((data) => {
                        if(data.code == 200){
                            this.$message({type: 'success', message: '提交成功'})
                        }else{
                            this.$message({type: 'error', message: '接口调用失败，请重试'})
                        }
                        this.init()
                    })
            },
            submitFn(){
                request({
                    url:`${this.$ip}/mms-workorder/workorder/submit/${this.workorder.id}`,
                    method: 'get',
                })
                    .then((data) => {
                        if(data.code == 200){
                            this.$message({type: 'success', message: '提交成功'})
                        }else{
                            this.$message({type: 'error', message: data.message})
                        }
                    })
            },

            routerPushFn(path){
                this.$router.push({ path})
            }
        }
    }

</script>
<style scoped lang='scss'>
    .flex{
        display: flex;
    }
    .index1{
        padding:30px;
        .top_header{
            line-height: 68px;
            height:68px;
            position: fixed;
            font-size: 24px;
            left:0;
            top:0;
            right:0;
            background: #2D4157;
            color:#fff;
            padding:0 10px;
            z-index: 99;
        }
        .order_content{
            height:500px;
            width: 80%;
            overflow-y: auto;
            .order_c_main{
                .order_c_b{
                    border-right: 1px solid #333;
                }
                .textContentParent{
                    position: relative;
                }
                .item1 > div{
                    border-left:1px solid #333;
                    border-top:1px solid #333;
                    border-bottom:1px solid #333;
                    text-align: center;
                    padding:10px 0;
                    vertical-align: top;
                    &:last-child{
                        border-right:1px solid #333;
                    }
                }
                .item{
                    border-left:1px solid #333;
                    border-bottom:1px solid #333;
                    text-align: center;
                    padding:10px 0;
                    vertical-align: top;
                    .sign{
                        width:70px;
                        height:25px;
                        line-height: 25px;
                        border:1px solid #333;
                        background: #3280e7;
                        color:#fff;
                        font-size:14px;
                    }
                    .checkbox_group{
                        font-size:16px;
                        height: 40px;
                        line-height: 40px;
                        border-top:1px solid #979797;
                        border-bottom:1px solid #979797;
                        &:nth-last-child(1){
                            border-bottom:none;
                        }
                        input[type='checkbox']{
                            width: 24px;
                            height: 24px;
                            margin: 0 6px;
                        }
                    }
                    .textContent{
                        position: relative;
                        // position: absolute;
                        // left:0;
                        // top:0;
                        // height: 50px;
                    }
                }
            }
            .table{
                width:100%;
                thead{
                    tr{
                        th{
                            padding:5px;
                            text-align: center;
                        }
                    }
                }
                tbody{
                    tr{
                        td{
                            text-align: center;
                            padding:10px 0;
                            vertical-align: top;
                            .sign{
                                width:70px;
                                height:25px;
                                line-height: 25px;
                                border:1px solid #333;
                                background: #3280e7;
                                color:#fff;
                                font-size:14px;
                            }
                        }
                    }
                }
                .checkbox_group{
                    font-size:16px;
                    height: 40px;
                    line-height: 40px;
                    border-top:1px solid #979797;
                    border-bottom:1px solid #979797;
                    &:nth-last-child(1){
                        border-bottom:none;
                    }
                    input[type='checkbox']{
                        width: 24px;
                        height: 24px;
                        margin: 0 6px;
                    }
                }
            }
        }
        .page_t{
            line-height: 40px;
            font-size: 24px;
        }
        .bottom_fix{
            position: fixed;
            left: 0;
            bottom:68px;
            background: #fff;
            height: 60px;
            line-height: 60px;
            width:100%;
            border-top: 1px solid #979797;
            button{
                width:100px;
                height: 44px;
                line-height: 44px;
                outline: none;
                border:1px solid #979797;
                font-size:16px;
                color:#222222;
                letter-spacing: 2px;
                border-radius: 3px;
            }
            .active{
                background: #3280e7;
                color:#fff;
            }
        }
    }
</style>
