<template>
  <div class="kindeditor">
    <textarea :id="id" name="content" v-model="outContent"></textarea>
    <AddInput ref='AddInput' @addConfirmFn='AddInput'></AddInput>
    <add-radio-dialog ref='addRadioDialog' @addConfirmFn='addConfirmFn'></add-radio-dialog>
  </div>
</template>
 
<script>
  import '../../../../node_modules/kindeditor/kindeditor-all.js'
import '../../../../node_modules/kindeditor/lang/zh-CN.js'
import '../../../../node_modules/kindeditor/themes/default/default.css'
import addRadioDialog from './addRadioDialog.vue';
import AddInput from './addInput.vue';
function newSignFn(){
    alert("333")
}
export default {
    components:{
        addRadioDialog,AddInput
    },
    name: 'kindeditor',
    data () {
        return {
             editor: null,
            outContent: this.content,
            radioInputList:[],
            inputIndex:0,
        }
    },
  props: {
      serialNumber:String,
    content: {
      type: String,
      default: ''
    },
    id: {
      type: String,
      required: true
    },
    width: {
      type: String
    },
    height: {
      type: String
    },
    minWidth: {
      type: Number,
      default: 650
    },
    minHeight: {
      type: Number,
      default: 100
    },
    items: {
      type: Array,
      default: function () {
        return [
          'source', '|', 'undo', 'redo', '|', 'preview',  'code', 'cut', 'copy', 'paste',
          'plainpaste', 'wordpaste', '|', 'justifyleft', 'justifycenter', 'justifyright',
          'justifyfull', 'insertorderedlist', 'insertunorderedlist', 'indent', 'outdent', 'subscript',
          'superscript', 'clearhtml', 'quickformat', 'selectall', '|', 'fullscreen', '/',
          'formatblock', 'fontname', 'fontsize', '|', 'forecolor', 'hilitecolor', 'bold','Zimage',
          'italic', 'underline', 'strikethrough', 'lineheight', 'removeformat', '|',
          'table', 'hr', 'emoticons', 'baidumap', 'pagebreak',
          'anchor', 'link', 'unlink', '|', 'about', "inpt", "checkbox",   "sign"
        ]
          // "na",'checkradio','print', 'template','image', 'multiimage', 'flash', 'media', 'insertfile',
      }
    },
    noDisableItems: {
      type: Array,
      default: function () {
        return ['source', 'fullscreen']
      }
    },
    filterMode: {
      type: Boolean,
      default: false
    },
    htmlTags: {
      type: Object,
      default: function () {
        return {
          font: ['color', 'size', 'face', '.background-color'],
          span: ['style'],
          div: ['class', 'align', 'style'],
          table: ['class', 'border', 'cellspacing', 'cellpadding', 'width', 'height', 'align', 'style'],
          'td,th': ['class', 'align', 'valign', 'width', 'height', 'colspan', 'rowspan', 'bgcolor', 'style'],
          a: ['class', 'href', 'target', 'name', 'style'],
          embed: ['src', 'width', 'height', 'type', 'loop', 'autostart', 'quality',
            'style', 'align', 'allowscriptaccess', '/'],
          img: ['src', 'width', 'height', 'border', 'alt', 'title', 'align', 'style', '/'],
          hr: ['class', '/'],
          br: ['/'],
          'p,ol,ul,li,blockquote,h1,h2,h3,h4,h5,h6': ['align', 'style'],
          'tbody,tr,strong,b,sub,sup,em,i,u,strike': []
        }
      }
    },
    wellFormatMode: {
      type: Boolean,
      default: true
    },
    resizeType: {
      type: Number,
      default: 2
    },
    themeType: {
      type: String,
      default: 'default'
    },
    langType: {
      type: String,
      default: 'zh-CN'
    },
    designMode: {
      type: Boolean,
      default: true
    },
    fullscreenMode: {
      type: Boolean,
      default: false
    },
    basePath: {
      type: String
    },
    themesPath: {
      type: String
    },
    pluginsPath: {
      type: String,
      default: ''
    },
    langPath: {
      type: String
    },
    minChangeSize: {
      type: Number,
      default: 5
    },
    loadStyleMode: {
      type: Boolean,
      default: true
    },
    urlType: {
      type: String,
      default: ''
    },
    newlineTag: {
      type: String,
      default: 'p'
    },
    pasteType: {
      type: Number,
      default: 2
    },
    dialogAlignType: {
      type: String,
      default: 'page'
    },
    shadowMode: {
      type: Boolean,
      default: true
    },
    zIndex: {
      type: Number,
      default: 811213
    },
    useContextmenu: {
      type: Boolean,
      default: true
    },
    syncType: {
      type: String,
      default: 'form'
    },
    indentChar: {
      type: String,
      default: '\t'
    },
    cssPath: {
      type: [ String, Array ]
    },
    cssData: {
      type: String
    },
    bodyClass: {
      type: String,
      default: 'ke-content'
    },
    colorTable: {
      type: Array
    },
    afterCreate: {
      type: Function
    },
    afterChange: {
      type: Function
    },
    afterTab: {
      type: Function
    },
    afterFocus: {
      type: Function
    },
    afterBlur: {
      type: Function
    },
    afterUpload: {
      type: Function
    },
    uploadJson: {
      type: String
    },
    fileManagerJson: {
      type: Function
    },
    allowPreviewEmoticons: {
      type: Boolean,
      default: true
    },
    allowImageUpload: {
      type: Boolean,
      default: true
    },
    allowFlashUpload: {
      type: Boolean,
      default: true
    },
    allowMediaUpload: {
      type: Boolean,
      default: true
    },
    allowFileUpload: {
      type: Boolean,
      default: true
    },
    allowFileManager: {
      type: Boolean,
      default: false
    },
    fontSizeTable: {
      type: Array,
      default: function () {
        return ['9px', '10px', '12px', '14px', '16px', '18px', '24px', '32px']
      }
    },
    imageTabIndex: {
      type: Number,
      default: 0
    },
    formatUploadUrl: {
      type: Boolean,
      default: true
    },
    fullscreenShortcut: {
      type: Boolean,
      default: false
    },
    extraFileUploadParams: {
      type: Array,
      default: function () {
        return []
      }
    },
    filePostName: {
      type: String,
      default: 'imgFile'
    },
    fillDescAfterUploadImage: {
      type: Boolean,
      default: false
    },
    afterSelectFile: {
      type: Function
    },
    pagebreakHtml: {
      type: String,
      default: '<hr style=”page-break-after: always;” class=”ke-pagebreak” />'
    },
    allowImageRemote: {
      type: Boolean,
      default: true
    },
    autoHeightMode: {
      type: Boolean,
      default: true
    },
    fixToolBar: {
      type: Boolean,
      default: false
    },
    tabIndex: {
      type: Number
    }
  },
  watch: {
    content (val) {
      this.editor && val !== this.outContent && this.editor.html(val)
    },
    outContent (val) {
      this.$emit('update:content', val)
      this.$emit('on-content-change', val)
    }
  },
  mounted () {
    var _this = this
    // input
    KindEditor.plugin('inpt', function(K) {
        var editor = this, name = 'inpt';
        editor.clickToolbar(name, function() {
            _this.$refs.AddInput.open('input')
            })
    });
    KindEditor.plugin('Zimage', function(K) {
        var editor = this, name = 'Zimage';
        editor.clickToolbar(name, function() {
            _this.$refs.AddInput.open('input')
            })
    })

    // 多选
    KindEditor.plugin('checkbox', function(K) {
        var editor = this, name = 'checkbox'
        editor.clickToolbar(name, function() {
            _this.$refs.addRadioDialog.open('checkbox')
            // editor.insertHtml('<input type="checkbox" name="1">是<input type="checkbox"  name="1">否')
        })
    })

    // 签章
    KindEditor.plugin('sign', function(K) {
        var editor = this, name = 'sign'
        editor.clickToolbar(name, function() {
            _this.inputIndex+=1
            let d=new Date()
            let num=d.getHours()+'' + d.getMinutes() + d.getSeconds() + d.getMilliseconds()

            editor.insertHtml(`<p><button style="width:80px;"  >签章</button><input type="text" disabled style="background:#fff;outline:none;width:200px;height:30px;border:none;border-bottom:1px solid #d9d9d9;" pos='${'$$$'+num+'_'+'sign'+_this.inputIndex}' id='${'$$$'+num+'_'+'sign'+_this.inputIndex}'  name='${'$$$'+num+'_'+'sign'+_this.inputIndex}' /></p>`)
        })
    })
    KindEditor.lang({
        inpt : '输入',
        checkbox : '多选',
        // na:'NA',
        // checkradio:'单选',
        sign:'签章',
        Zimage:'文件上传'
    })

    _this.editor = window.KindEditor.create('#' + this.id, {
        width: _this.width,
        height: _this.height,
        minWidth: _this.minWidth,
        minHeight: _this.minHeight,
        items: _this.items,
        allowImageRemote: false,
        afterUpload: function(url, data, name) {
            alert(url);
            alert(data);
            alert(name);//如果是单张图片，则 name="image"
        },
        noDisableItems: _this.noDisableItems,
        filterMode: _this.filterMode,
        htmlTags: _this.htmlTags,
        wellFormatMode: _this.wellFormatMode,
        resizeType: _this.resizeType,
        themeType: _this.themeType,
        langType: _this.langType,
        designMode: _this.designMode,
        fullscreenMode: _this.fullscreenMode,
        basePath: _this.basePath,
        themesPath: _this.cssPath,
        pluginsPath: _this.pluginsPath,
        langPath: _this.langPath,
        minChangeSize: _this.minChangeSize,
        loadStyleMode: _this.loadStyleMode,
        urlType: _this.urlType,
        newlineTag: _this.newlineTag,
        pasteType: _this.pasteType,
        dialogAlignType: _this.dialogAlignType,
        shadowMode: _this.shadowMode,
        zIndex: _this.zIndex,
        useContextmenu: _this.useContextmenu,
        syncType: _this.syncType,
        indentChar: _this.indentChar,
        cssPath: require('./kindeditor.css'),
        cssData: `

        input[eType='ycha']:checked,
        input[eType='fcha']:checked,
        input[eType='radio']:checked {
    background:#1673ff;
    border:solid 0px #888888;
 }
input[eType='ycha']:focus,
        input[eType='fcha']:focus,
 input[eType='radio']:focus{
    -webkit-appearance:none;
    -webkit-user-select:none;
    outline: none;
}
input[eType='fcha'],
input[eType='ycha'],
 input[eType='radio'] {
    width:13px;
    height:13px;
    background-color:#ffffff;
    border:solid 1px #888888;
    -webkit-border-radius:50%;
    border-radius:50%;
      margin:3px 4px;
    padding:0;
    position:relative;
    display:inline-block;
    vertical-align:top;
    cursor:default;
    -webkit-appearance:none;
    -webkit-user-select:none;
    user-select:none;
    -webkit-transition:background-color ease 0.1s;
    transition:background-color ease 0.1s;
}

 input[eType='radio']:checked::after {
    content:'';
    top:3px;
    left:2px;
    position:absolute;
    background:transparent;
    border:#fff solid 2px;
    border-top:none;
    border-right:none;
    height:3px;
    width:7px;
    -moz-transform:rotate(-45deg);
    -ms-transform:rotate(-45deg);
    -webkit-transform:rotate(-45deg);
    transform:rotate(-45deg);
}
input[eType='fcha'] {
  -webkit-border-radius:2px;
      border-radius:2px;
}
input[eType='fcha']:checked::after,
input[eType='ycha']:checked::after {
    content:'×';
    left:2px;
    top:-1px;
    font-size: 14px;
    position:absolute;
    color:#fff;
    font-weight: bold;
    border-top:none;
    border-right:none;
}
input[eType='fcha']:checked::after {

}
body{
  overflow-y:auto!important;
  height:calc(100vh - 10px);
}
 ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
    border-radius: 4px;
    background-color: rgba(0,0,0,0.3);
    float: right;
}

 ::-webkit-scrollbar-track {
    border-radius: 4px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0);
    background-color: rgba(255,255,255,0.4);
     float: right;

}

 ::-webkit-scrollbar-thumb {
    border-radius: 4px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0);
    background-color: rgba(0,0,0,0.3);
    float: right;
}

        `,
        bodyClass: _this.bodyClass,
        colorTable: _this.colorTable,
        afterCreate: _this.afterCreate,
        afterChange: function () {
            _this.afterChange
            _this.outContent = this.html()
        },
        afterTab: _this.afterTab,
        afterFocus: _this.afterFocus,
        afterBlur: _this.afterBlur,
        afterUpload: _this.afterUpload,
        uploadJson: _this.uploadJson,
        fileManagerJson: _this.fileManagerJson,
        allowPreviewEmoticons: _this.allowPreviewEmoticons,
        allowImageUpload: _this.allowImageUpload,
        allowFlashUpload: _this.allowFlashUpload,
        allowMediaUpload: _this.allowMediaUpload,
        allowFileUpload: _this.allowFileUpload,
        allowFileManager: _this.allowFileManager,
        fontSizeTable: _this.fontSizeTable,
        imageTabIndex: _this.imageTabIndex,
        formatUploadUrl: _this.formatUploadUrl,
        fullscreenShortcut: _this.fullscreenShortcut,
        extraFileUploadParams: _this.extraFileUploadParams,
        filePostName: _this.filePostName,
        fillDescAfterUploadImage: _this.fillDescAfterUploadImage,
        afterSelectFile: _this.afterSelectFile,
        pagebreakHtml: _this.pagebreakHtml,
        allowImageRemote: _this.allowImageRemote,
        autoHeightMode: _this.autoHeightMode,
        fixToolBar: _this.fixToolBar,
        tabIndex: _this.tabIndex,

    })
  },
  methods:{
      upfile(file,style){

      },
      AddInput(type,width){
          let _this=this;
          _this.inputIndex+=1;
          let d=new Date();
          // let width1=width?width+'px':'96%';
          let width1=width?width+'px':'';
          let num=d.getHours()+'' + d.getMinutes() + d.getSeconds() + d.getMilliseconds()
          this.editor.insertHtml('<input type="text"  style="width:'+width1+'"  inputtype="'+type+'" id="$$$'+num+'input' + _this.inputIndex +'" name="$$$'+num+'input' + _this.inputIndex +'"/>')

         },
        addConfirmFn(val, form){
            let className=''
            let type=form.type
            let obj={
                '1':'radio',
                '2':'checkBox',
                '3':'NA',
                '4':'ycha',
                '5':'fcha',
            }
             if(form.style==1){
                 if(form.type==1){
                        className='Wtui-checkbox'
                }else{
                    className='Wtui-checkbox_zc'
                }
            }else{
                if(form.type==1){
                    type='4'
                    className='Wtui-radioCC'
                }else{
                   type='5'
                    className='Wtui-radioCC Wtui-checkboxCC'
                }

            }
            this.radioInputList = val
            let str=``
            let html = this.radioInputList.map(i=>{
                this.inputIndex++
                let d=new Date()
                let num=d.getHours()+'' + d.getMinutes() + d.getSeconds() + d.getMilliseconds()
                if(type=='1'||type=='4'){
                    return `<input type='radio' inputType="number" eType='${obj[type]}' class='${className}'

                    id='${'$$$'+num+'_'+obj[type] +this.inputIndex}'
                     name='${'$$$'+num+'_'+obj[type]}' /> ${type==3?'N/A':i.value} `
                }
                return `<input type='checkbox' inputType="number" eType='${obj[type]}' class='${className}'

                    id='${'$$$'+num+'_'+obj[type] +this.inputIndex}' name='${'$$$'+num+'_'+obj[type]
                     +this.inputIndex}' /> ${type==3?'N/A':i.value} `
            })
            this.editor.insertHtml(html.join(""));
        }
    }
}
</script>
 
<style   lang="scss">
.kindeditor{
    .ke-icon-inpt {
    background-image: url(./assets/img/add.svg);
    width: 22px;
    height: 22px;
  }
  .ke-icon-Zimage {
    background-image: url(./assets/img/Efileupload.svg);
    background-size: 100%;
    width: 18px;
    height: 18px;
  }
    .ke-icon-checkbox{
    background-image: url(./assets/img/edit.svg);
    width: 22px;
    height: 22px;
  }
    .ke-icon-na{
    background-image: url(./assets/img/info.svg);
    width: 22px;
    height: 22px;
  }
    .ke-icon-checkradio{
    background-image: url(./assets/img/kh.svg);
    width: 22px;
    height: 22px;
  }
    .ke-icon-sign{
    background-image: url(./assets/img/sign.svg);
    width: 22px;
    height: 22px;
  }
  /deep/ .ke-icon-inpt {
    background-image: url(./assets/img/add.svg);
    width: 22px;
    height: 22px;
  }
  /deep/ .ke-icon-checkbox{
    background-image: url(./assets/img/edit.svg);
    width: 22px;
    height: 22px;
  }
  /deep/ .ke-icon-na{
    background-image: url(./assets/img/info.svg);
    width: 22px;
    height: 22px;
  }
  /deep/ .ke-icon-checkradio{
    background-image: url(./assets/img/kh.svg);
    width: 22px;
    height: 22px;
  }
  /deep/ .ke-icon-sign{
    background-image: url(./assets/img/sign.svg);
    width: 22px;
    height: 22px;
  }

  .ke-icon-multiimage {

  }
}



</style>