<template>
    <div>
        <el-dialog title="弹窗" :visible.sync="dialogFormVisible">
            <el-form>
                
                <el-form-item v-for='(i, index) in radioInputList' :key='index' label="添加名称" :label-width="formLabelWidth">
                    <el-input v-model="i.value" autocomplete="off"></el-input>
                </el-form-item>
                <el-button type="primary" @click="addRadioFn">增加选项</el-button>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="addConfirmFn">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
export default {
    data() {
        return {
            type: "",
            dialogFormVisible: false,
            radioInputList:[
                {
                    name:"input0",
                    value:""
                }
            ],
            formLabelWidth: '120px'
        };
    },
    methods:{
        init(){
            this.radioInputList = [
                {
                    name:"input0",
                    value:""
                }
            ]
        },
        open(type){
            this.init()
            if(type){
                this.dialogFormVisible = true;
                this.type = type
            }else{
                this.$message({
                    type: 'warning',
                    message: 'Function open arguments[0] is required！'
                });
            }
        },
        addConfirmFn(){
            this.radioInputList = this.radioInputList.filter(i=>i.value)
            this.radioInputList =  this.unique(this.radioInputList)
            this.$emit('addConfirmFn', this.radioInputList, this.type)
            this.dialogFormVisible = false
        },
        addRadioFn(){
            this.radioInputList.push({
                name:"input"+(this.radioInputList.length),
                value:""
            })
        },
        unique(list) {
            var arr = [];
            for (var i = 0; i < list.length; i++) {
                if (i == 0){
                    arr.push(list[i]);
                } 
                var b = false;
                if (arr.length > 0 && i > 0) {
                    for (var j = 0; j < arr.length; j++) {
                        if (arr[j].value == list[i].value) {
                            b = true;
                            //break;
                        }
                    }
                    if (!b) {
                        arr.push(list[i]);
                    }
                }
            }
            return arr;
        }
    }
};
</script>
<style lang="scss" scoped>
    
</style>