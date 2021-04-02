<template lang="html">
  <el-dialog :close-on-click-modal="false" class="users-dialog" :title="title" center append-to-body
             :visible.sync="dialogVisible" width="700px" :before-close="handleClose">
    <el-row>
      <el-col :span="12">
        <div>
          <el-card class="box-card" shadow="never" border-radius="2px">
            <div style="height:344px;margin-top:0px" v-loading="!data.length">
              <Tree :data="data" ref="tree" @handleSelect="getListById" :expand-on-click-node="false" :isShow="isShow"
                    :defaultUnCheck="true"></Tree>
            </div>
          </el-card>
        </div>
      </el-col>
      <el-col :span="12">
        <div style="height:344px ">
          <el-card class="box-card" shadow="never" border-radius="2px">
            <div class="elinput" style="width: 100%">
              <el-input class="input" placeholder="输入关键字进行搜索" @input="seachUser"
                        v-model="filterText"></el-input>
            </div>
            <div class="userScroll" ref="userScroll">
              <el-scrollbar style="height:310px">

                <div v-show="personList.length == 0" style="padding: 100px 0;text-align: center;color:#888888">该部门暂无人员
                </div>

                <el-checkbox v-show="personList.length > 0" v-model="selectAll" @change="handleSelectAll">全选
                </el-checkbox>
                <div class="item" v-for="(item, index) in personList" :key="item.id">
                  <div class="item-time">
                    <el-checkbox v-model="userSelectIdS" @change="userSelectC($event,item)" :label="item.id">
                      {{item.name}}
                    </el-checkbox>
                  </div>
                </div>
              </el-scrollbar>
            </div>

          </el-card>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div>
          <el-card class="box-card" shadow="never" border-radius="2px">
            <div>已选择({{ userSelect.length }})：
              <el-button style="float:right;margin-top: -10px" size="mini" @click="handleClear">清空</el-button>
            </div>
            <el-scrollbar style="height:100px ">
              <el-tag :key="tag.id" v-for="(tag,index) in userSelect" closable :disable-transitions="false"
                      @close="handleRemove(tag.id,index)">
                {{ tag.name }}
              </el-tag>
            </el-scrollbar>
          </el-card>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24"></el-col>
    </el-row>
    <div class="Qfooter" style="margin-top: 15px">
      <el-button @click="handleClose">取消</el-button>
      <el-button type="primary" @click="handleSave">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
    import request from '@lib/axios.js';
    import Tree from '@/ui/components/Tree/index';
    import {formatTreeData} from '@lib/tools.js';
    import {getUserInfo} from '@lib/auth.js';
    import {extend, get, cloneDeep, filter, some, flow, concat, map} from 'lodash';

    export default {
        name: 'Users',
        data() {
            return {
                timer: null,
                timer1: null,
                filterText: '',
                listPageNum: 1,
                personNodeIdObj: {},//节点ID 对应的该节点下的人员 的对象
                userSelect: [],
                userSelectIdS: [],
                title: '选择人员',
                isShow: {input: true},
                first: true,
                selectAll: false,
                dialogVisible: false,
                personList: [],// 当前节点下或者条件筛选 的人
                deptList: [],
                data: [],
                selectNode: {},// 当前被选中的节点对象
                type: "",
                orgObj: {
                    ORG: 'orgId',
                    DEPT: 'deptId',
                    GROUP: 'groupId',
                },
                param: {pageNum: 1, pageSize: 10},
            };
        },
        components: {
            Tree,
        },
        props: {
            dataRequire: {
                type: Boolean,
                default: false
            }
        },
        methods: {
            seachUser() {
                if (this.timer1) {
                    clearTimeout(this.timer1)
                }
                this.timer1 = setTimeout(() => {
                    this.fuzzyUser()
                }, 300)
            },
            // 模糊搜索人员
            fuzzyUser() {
                let val = this.filterText;
                if (!val) {
                    this.personList = this.personNodeIdObj[this.selectNode.id]
                    this.selectAll = this.isAllSelect();
                    return false
                }
                let obj = {
                    name: val,
                }
                if (this.type == 'ORG') {
                    obj.orgId = this.selectNode.id;
                } else {
                    obj.deptId = this.selectNode.id;
                }
                return request({
                    headers: {'Content-Type': 'text/plain'},
                    url: this.$ip + '/sys/user/getUsersByDeptIdOrOrgIdAndLikeName',
                    method: 'get',
                    params: obj,
                }).then((d) => {
                    if (d.responseCode == 1000) {
                        this.selectAll = false
                        this.personList = []
                        if (d.data) {
                            let obj = {}
                            let arr = [...this.personNodeIdObj[this.selectNode.id]]
                            d.data.map((k, l) => {
                                // let s= arr.findIndex((q,w)=>{
                                //    return k.id===q.id
                                //  })
                                // if(s<0){
                                //   // this.personNodeIdObj[this.selectNode.id].push(k)
                                // }
                                if (!obj[k.id]) {
                                    this.personList.push(k)
                                    obj[k.id] = 1
                                } else {
                                    obj[k.id] = 1
                                }
                            })
                            this.selectAll = this.isAllSelect();
                        }
                    }

                })
            },
            handleScroll($event) {
                if (this.filterText) {
                    return false
                }
                var e = $event.target; // 获取滚动条的dom
                var scrollTop = e.scrollTop;//  获得滚动的像素数
                var windowHeight = e.clientHeight; // 获取可视区的高度
                var scrollHeight = e.scrollHeight;  // 获取滚动条的总高度
                var tag = e.parentElement.__vue__.refTag; //获取滚动元素标识
                if (scrollTop + windowHeight + 1 >= scrollHeight) {
                    if(this.listPageNum<this.param.pageNum){
                        return false
                    }
                    if (this.timer) {
                        clearTimeout(this.timer)
                    }
                    this.timer = setTimeout(() => {
                        this.getAllUserByOrgId('scroll')
                    }, 20)
                }
            },

            isAllSelect() {
                let flag = true
                this.personList.map((k, l) => {
                    const idx = this.userSelect.findIndex((d) => d.id === k.id);
                    if (idx == -1) {
                        flag = false
                    }
                })
                return flag
            },
            userSelectC(e, item) {
                console.log(e, item);
                if (e) {
                    this.personList.map((k, l) => {
                        if (k.id == item.id) {
                            this.userSelect.push(k)
                        }
                    })

                } else {
                    let index = this.userSelect.findIndex((d) => d.id === item.id)
                    console.log(index, 1);
                    this.userSelect.splice(index, 1)
                }

                this.selectAll = this.isAllSelect();
            },
            handleClear() {
                this.userSelectIdS = [];
                this.userSelect = [];
                this.selectAll = false;

            },
            handleRemove(id, index) {
                this.userSelect.splice(index, 1)
                let indexItem= this.userSelectIdS.indexOf(id)
                this.userSelectIdS.splice(indexItem, 1)
                this.selectAll = this.isAllSelect();
            },

            // 查询人员
            getAllUserByOrgId(ss) {
                if(ss=='scroll'){
                    this.param.pageNum = ++this.param.pageNum;

                }
                let url = ''
                let param = {...this.param}
                if (this.type == 'ORG') {
                    url = '/sys/user/getAllUserByOrgIdByPage' //分頁
                    param.orgId = this.selectNode.id;
                } else {
                    url = '/sys/user/getUsersByDeptIdAndPage' //分頁
                    param.deptId = this.selectNode.id;
                }
                return request({
                    headers: {'Content-Type': 'text/plain'},
                    url: this.$ip + url,
                    method: 'get',
                    params: param,
                }).then((d) => {
                    if (d.responseCode === 1000) {
                        if (ss == 'scroll') {
                            if (d.data && d.data.list && d.data.list.length) {
                                if(d.data.pageNum){
                                    this.listPageNum=d.data.pageNum
                                }
                                if(this.param.pageNum!==d.data.pageNum){
                                    return false
                                }
                                this.personNodeIdObj[this.selectNode.id].push(...d.data.list)
                                this.personList = this.personNodeIdObj[this.selectNode.id]
                                this.selectAll = false
                            }
                        } else {
                            return Promise.resolve(d, null);
                        }
                    } else {
                        this.$message.error(d.responseMessage)
                    }
                });
            },
            getListById(node) {
                this.listPageNum=1
                this.param = {pageNum: 1, pageSize: 10};
                this.filterText = ''
                if (node && node.id) {
                    this.selectNode = node;
                    this.type = node.type;
                }
                // if (this.personNodeIdObj[this.selectNode.id]) {
                //   this.personList = this.personNodeIdObj[this.selectNode.id]
                //   return false
                // }
                this.getAllUserByOrgId().then((d) => {
                    let arr = d.data.list

                    this.personNodeIdObj[node.id] = arr
                    this.personList = this.personNodeIdObj[node.id]
                    this.selectAll = this.isAllSelect();
                });
            },
            dealData(d, arr, node) {
                if (node.user && node.user.length) {
                    arr = node.user
                } else {
                    d.map((k, l) => {
                        if (node['id'] == k[this.orgObj[this.type]]) {
                            arr.push(k)
                        }
                    })
                }
            },
            handleSelectAll(val) {
                this.personList.map((k, l) => {
                    const idx = this.userSelect.findIndex((d) => d.id === k.id);
                    if (this.selectAll) {
                        if (idx == -1) {
                            this.userSelect.push(k)
                        }
                    } else {
                        if (idx > -1) {
                            this.userSelect.splice(idx, 1)
                        }
                    }
                    this.userSelectIdS = this.userSelect.map((k, l) => {
                        return k.id
                    })
                })
            },

            getTree() {
                let orgId = getUserInfo().orgId//this.$store.getters.userInfo.orgId;
                request({
                    url: this.$ip + '/sys/org/getOrgById',
                    method: 'get',
                    params: {id: orgId},
                }).then((d1) => {
                    if (d1.responseCode == 1000) {
                        request({
                            url: this.$ip + '/sys/department/getAllDepartmentByOrgId',
                            method: 'get',
                            params: {orgId: orgId},
                        }).then((d) => {
                            this.data = [
                                {
                                    name: d1.data.name,
                                    type: 'ORG',
                                    id: d1.data.id,
                                    children: d.data || []
                                }
                            ]
                        });
                    }
                });
            },
            handleClose() {
                this.type = 'ORG'
                this.personList = []
                this.data = []
                this.param = {pageNum: 1, pageSize: 10}
                this.userSelectIdS = []
                this.selectNode = {}
                this.personNodeIdObj = {}
                this.dialogVisible = false;
                this.$nextTick(() => {
                    if (this.$refs.userScroll) {
                        this.$refs.userScroll.removeEventListener('scroll', this.handleScroll, true);//监听函数
                    }
                })

            },
            handleSave() {
                if (!this.userSelect.length) {
                    this.$message({
                        message: '请选择需要推送的对象',
                        type: 'warning'
                    })
                    return
                }
                this.$emit('onSelected', this.userSelect, this.deptList);
                this.handleClose();
            },
            open(inputList, title, currentDept) {
                this.dialogVisible = true;
                this.$nextTick(() => {
                    if (this.$refs.userScroll) {
                        this.$refs.userScroll.addEventListener('scroll', this.handleScroll, true);//监听函数
                    }
                })

                this.getTree();
                this.selectAll = false;
                this.title = title || '选择人员';
                this.userSelect = inputList || [];
                this.userSelectIdS = inputList&&inputList.map((k, l) => {
                    return k.id
                })
            },
        },

    };
</script>

<style scoped lang="scss">
  .Qfooter {
    text-align: center;
  }

  /deep/ .el-tree-node__expand-icon {
    display: none;
  }
   .el-tree-node__expand-icon {
    display: none;
  }

  .el-scrollbar__wrap {
    overflow-x: hidden;
  }

  .el-card__body {
    padding: 10px;
    .item {
      margin: 20px 0;
    }
    .el-checkbox__label {
      padding-left: 15px;
    }
    .el-scrollbar__wrap {
      overflow-x: hidden;
    }

  }

  /deep/ .el-scrollbar {
    margin-top: 0px !important;

  }
   .el-scrollbar {
    margin-top: 0px !important;

  }

  .el-card__body > div:first-child {
    padding: 0px;
    margin-top: 5px;
    line-height: 15px;
  }

  /deep/ .elinput {
    margin: 10px 0;
    height: 30px;
    // width: 100%;
  }

  /deep/ .el-input__inner {
    height: 30px;
    width: calc(100% - 2px);
  }

  /deep/ .el-tag {
    margin: 5px;
  }

  /deep/ .el-tag:first-child {
    margin-left: 0px;
  }

    .elinput {
    margin: 10px 0;
    height: 30px;
    // width: 100%;
  }

    .el-input__inner {
    height: 30px;
    width: calc(100% - 2px);
  }

    .el-tag {
    margin: 5px;
  }

    .el-tag:first-child {
    margin-left: 0px;
  }
</style>
