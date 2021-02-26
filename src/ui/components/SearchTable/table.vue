<template>
    <div>
        <table border="1" cellspacing="0" :key="$route.path">
           <thead>
               <tr>
                   <th v-for="(opt,index) in tableConfig" :key="index">
                       <span class="cell"> {{opt.label}}</span>
                   </th>
               </tr>
           </thead>
           <tbody>
               <tr v-if="noSearch">
                   <td :width="con.width" v-for="(con,index) in tableConfig" :key="index" v-bind="con">
                        <span v-if="con.search">
                            <el-input v-model="form[con.prop]"></el-input>
                        </span>
                       <span v-else class="cell"></span>
                   </td>
               </tr>
               <tr v-for="(opt,id) in data.records||data" :key="id" >
                   <td  :width="con.width" v-for="(con,index) in tableConfig" :key="index" v-bind="con">
                       <!--<slot    name="radio1"  ></slot>-->

                       <slot v-if="con.slot" :name="con.slot"  :opt="opt" ></slot>
                       <span v-else class="cell">{{opt[con.prop]}}</span>
                   </td>
               </tr>

           </tbody>
        </table>
    </div>
</template>

<script>
    export default {
        name: "tableCon",
        components: {},

        props: [ 'tableRowClassName', 'offsetTop', 'page', 'noSearch', 'refTag', 'spanMethod'],

        data() {
            return {
                form:{},
                data:[
                    {name:1111,sex:'asdas',mm:'asdasd'},
                    {name:1111,sex:'asdas',mm:'asdasd'},
                    {name:1111,sex:'asdas',mm:'asdasd'},
                    {name:1111,sex:'asdas',mm:'asdasd'},
                    {name:1111,sex:'asdas',mm:'asdasd'},
                    {name:1111,sex:'asdas',mm:'asdasd'},
                ],
                tableConfig:[
                    {slot:'radio1',prop:'name1',align: 'center' ,width:200,label:'sx'},
                    // {slot:'radio2',prop:'name2',width:200,label:'sx',search:{}},
                    {prop:'name',width:200,label:'姓名'},

                    {prop:'sex', width:200,label:'xingbie',search:{}},
                    {prop:'mm',width:200,label:'mm'},
                ]
            }
        },
        methods: {},
        created() {
        },
    }
</script>

<style lang="scss" scoped>
       table{
            height:200px;
           overflow-y: auto;
           position: relative;
    }
    tbody{

        tr{

        }
    }

    thead{
        /*position: absolute;*/
        th{

         }

    }


</style>