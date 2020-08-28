<!-- 自定义 MessageBox 组件 -->
<template>
  <div class="message-box" v-show="isShowMessageBox">
    <div class="mask" @click="cancel"></div>
    <div class="message-content">
        <!-- <img class="icon" src="@/assets/img/close.svg" alt="关闭" @click="cancel"> -->
        <span class="icon" @click="cancel">x</span>
      <!-- <svg class="icon" aria-hidden="true" >
        <use xlink:href="#icon-delete"></use>
      </svg> -->
      <h3 class="title">{{ title }}</h3>
      <p class="content">{{ content }}</p>
      <div class="main">
        <!--<input type="text" v-model="inputValue" v-if="isShowInput" ref="input" > @keyup.enter="confirm"-->
            <!-- <el-radio v-model="inputValue" size='medium' label="1">签字</el-radio>
            <el-radio v-model="inputValue" label="2">签章</el-radio> -->
            <el-select v-model="inputValue" placeholder="请选择" style="width:100%">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
      </div>
      <div class="btn-group">
        <button class="btn-default" @click="cancel" v-show="isShowCancelBtn">{{ cancelBtnText }}</button>
        <button class="btn-primary btn-confirm" @click="confirm" v-show="isShowConfimrBtn">{{ confirmBtnText }}</button>
      </div>
    </div>
  </div>
</template>
 
<script>
  export default {
    props: {
      title: {
        type: String,
        default: '标题'
      },
      content: {
        type: String,
        default: '请选择签名类型'
      },
      isShowInput: false,
      inputValue: '',
      psdValue:'',
      isShowCancelBtn: {
        type: Boolean,
        default: true
      },
      isShowConfimrBtn: {
        type: Boolean,
        default: true
      },
      cancelBtnText: {
        type: String,
        default: '取消'
      },
      confirmBtnText: {
        type: String,
        default: '确定'
      }
    },
    data () {
      return {
        isShowMessageBox: false,
        resolve: '',
        reject: '',
        promise: '', // 保存promise对象
        options:[
            {
                label:"签字",
                value:"1"
            },
             {
                label:"签章",
                value:"2"
            }
        ]
      }
    },
    methods: {
      // 确定,将promise断定为resolve状态
      confirm: function () {
        this.isShowMessageBox = false;
        if (this.isShowInput) {
          this.resolve({val: this.inputValue});
        } else {
          this.resolve('confirm');
        }
        this.remove();
      },
      // 取消,将promise断定为reject状态
      cancel: function () {
        this.isShowMessageBox = false;
        this.reject('cancel');
        this.remove();
      },
      // 弹出messageBox,并创建promise对象
      showMsgBox: function () {
        this.isShowMessageBox = true;
        this.promise = new Promise((resolve, reject) => {
          this.resolve = resolve;
          this.reject = reject;
        });
        // 返回promise对象
        return this.promise;
      },
      remove: function () {
        setTimeout(() => {
          this.destroy();
        }, 300);
      },
      destroy: function () {
        this.$destroy();
        document.body.removeChild(this.$el);
      }
    }
  };
</script>
 
<style lang="scss" scoped>
    .main{
        height:48px;
        line-height: 48px;
        margin-bottom: 30px;
        /deep/ .el-radio__label{
            font-size:20px;
        }
    }

  .message-box {
    position: relative;
    .mask {
      position: fixed;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      z-index: 500;
      background: rgba(0, 0, 0, 0.5);
    }
    .message-content {
      position: fixed;
      box-sizing: border-box;
      padding: 1em;
      min-width: 50%;
      left: 50%;
      top: 50%;
      box-shadow: 0 0 8px rgba(0, 0, 0, 0.1), 0 0 256px rgba(255, 255, 255, .3);
      transform: translate(-50%, -50%);
      border-radius: 4px;
      background: #fff;
      z-index: 501;
      .icon {
        position: absolute;
        font-size:34px;
        top: 12px;
        right: 30px;
        width: 12px;
        height: 12px;
        color: #878d99;
        cursor: pointer;
        &:hover {
          color: #2d8cf0;
        }
      }
      .title {
        height:50px;
        line-height: 50px;
        font-size: 20px;
        font-weight: 600;
        margin-bottom: 24px;
        border-bottom:1px solid #ccc;
        color: #333;
      }
      .content {
        font-size: 18px;
        line-height: 24px;
        color: #555;
        margin-bottom:16px;
      }
      input {
        width: 100%;
        margin: 12px 0;
        background-color: #fff;
        border-radius: 0.4em;
        border: 1px solid #d8dce5;
        box-sizing: border-box;
        color: #5a5e66;
        display: inline-block;
        font-size: 18px;
        height: 40px;
        line-height: 1;
        outline: none;
        padding: 0 12px;
        &:focus {
          border-color: #2d8cf0;
        }
      }
      .btn-group {
        margin-top: 12px;
        display:flex;
        justify-content: center;
        overflow: hidden;
        .btn-default {
            letter-spacing: 5px;
            text-indent: 5px;
            color: #333333;
            background-color: #ffffff;
            width: auto;
            overflow: visible;
            display: inline-block;
            padding: 10px 20px;
            _margin-left: 5px;
            margin-bottom: 0;
            font-size: 18px;
            font-weight: normal;
            line-height: 1.428571429;
            text-align: center;
            white-space: nowrap;
            vertical-align: middle;
            cursor: pointer;
            background-image: none;
            border: 1px solid #cccccc;
            border-radius: 4px;
        }
        .btn-primary {
            letter-spacing: 5px;
            text-indent: 5px;
            width: auto;
            overflow: visible;
            display: inline-block;
            padding: 10px 20px;
            _margin-left: 5px;
            margin-bottom: 0;
            font-size: 18px;
            font-weight: normal;
            line-height: 1.428571429;
            text-align: center;
            white-space: nowrap;
            vertical-align: middle;
            cursor: pointer;
            background-image: none;
            border: 1px solid #ca2121;
            border-radius: 4px;
            background-color: #C62929;
            color: #ffffff;
        }
        .btn-confirm {
          margin-left: 12px;
        }
      }
    }
  }
</style>