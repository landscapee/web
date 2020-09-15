 export function SignatureInit(keysn='0002',password='123456'){
    function delCB(signatureid, signatureData) {
        for (var key in Signature.list) {
            if (signatureid == key && Signature.list[signatureid].keysn == signatureData.keysn) {
                var signatureCreator = Signature.create();
                signatureCreator.removeSignature(signatureData.documentid, signatureid);
                break;
            }
        }
        return true;
    }
    Signature.init({//初始化属性
        //keysn:'0741170010110516',
        keysn, // 'test001', // 002
        password,
        //keysn:'test001',
        //usercode:"test002",
        delCallBack: delCB,
        //icon_remove : false,//撤销签章按钮隐藏显示，缺省显示 false不显示。
        //icon_sign : false, //证书信息按钮隐藏显示，缺省显示 false不显示。
        imgtag: 0, //签章类型：0：无; 1:公章; 2:私章; 3:法人章; 4:法人签名; 5:手写签名
        certType : 'server',//设置证书在签章服务器
        sealType : 'server',//设置印章从签章服务器取
        autoCert:true,
        //serverUrl : 'http://173.101.1.52:8080/iSignatureHTML5',
        serverUrl : 'http://173.101.1.134:8089/iSignatureHTML5',
        //serverUrl : 'http://173.101.1.134:8089/iSignatureHTML5/html5',
        showSealsDlg:'auto',  // 一个章不显示，默认第一个
        //serverUrl : 'http://192.168.0.151:8080/iSignatureHTML5',
        documentid:'KG2016093001333',//设置文档ID
        documentname:'测试文档KG2016093001',//设置文档名称
        //quickClose: false,//
        verifyResType : 'click touchend',//验证响应方式，默认click。避免在特殊情况下（如IOS、webview）环境下第一次点击不响应的问题
        pw_timeout:'s1800', //s：秒；h:小时；d:天
        scaleImage: 1, //签章图片的缩放比例
        showNoPW:true, // 签章时候显示密码
    });
}