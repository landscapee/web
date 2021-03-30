import moment from 'moment';
import { each, set, get, cloneDeep, trim, toNumber, isNumber, isString, concat,isArray ,isDate} from 'lodash';
//非立即执行版防抖函数
let timeout = null;
export const debounce = (fn, interval = 500) => {
	return ()  => {
		clearTimeout(timeout);
		timeout = setTimeout(function() {
 			fn.apply(this, arguments);
		}, interval);
	};
};
export const getCheckedArr = (d) => {
	let res = [];
	each(d, (i) => {
		if (i.checked) {
			res.push(i.id);
		}
		if (i.children) {
			res = concat(res, getCheckedArr(i.children));
		}
	});
	return res;
};
export const dateSerialization = (date) => {
	if (!isDate(date)) {
		return date;
	}
	return moment(date).format();
};
export const date2String = (obj) => {
	each(obj, (v, k) => {
		if (isArray(v)) {
			each(v, (i) => {
				date2String(i);
			});
		}
		if (Object.prototype.toString.call(v) == '[object Object]') {
			date2String(v);
		}
		if (isDate(v)) {
			obj[k] = dateSerialization(v);
		}
	});
};
export const formatTreeData = (d) => {
	each(d, (item) => {
		each(item.data, (v, k) => {
			if (k == 'type') {
				set(item, 'innerType', v);
			} else if (v) {
				set(item, k, v);
			}
			if (k == 'name') {
				set(item, 'label', v);
			}
		});
		delete item.data;
		if (item.children) {
			formatTreeData(item.children);
		}
	});
	return d;
};
export const dateFormat = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z\+\d{2}$/;
export const stringDateExtend = (obj) => {
	if (Object.prototype.toString.call(obj) === '[object Array]') {
		each(obj, (item) => {
			stringDateExtend(item);
		});
	}
	if (Object.prototype.toString.call(obj) !== '[object Object]') {
		return obj;
	}
	each(obj, (v, k) => {
		if (isArray(v)) {
			each(v, (i) => {
				stringDateExtend(i);
			});
		}
		if (Object.prototype.toString.call(v) === '[object Object]') {
			stringDateExtend(v);
		}
		if (typeof v === 'string' && dateFormat.test(v)) {
			v = v.replace(/Z.*/g, '');
			obj[`${k}DisplayYMDHM`] = formatDate(v, 'YYYY-MM-DD HH:mm', '--');
			obj[`${k}DisplayYMD`] = formatDate(v, 'YYYY-MM-DD', '--');
			obj[`${k}DisplayDDHHmm`] = formatDate(v, '(DD)HHmm', '--');
			obj[`${k}`] = new Date(v);
			obj[`${k}Origin`] = v;
		}
	});
};
export const formatDate = (date, opt, empty) => {
	if (!empty) {
		empty = '';
	}
	if (isNumber(date) || isString(date)) {
		date = new Date(date);
	}
	if (!date || !isDate(date)) {
		return empty;
	}
	var year = date.getFullYear();
	var month = date.getMonth() + 1;
	var day = date.getDate();
	var hour = date.getHours();
	var minute = date.getMinutes();
	var second = date.getSeconds();
	switch (opt) {
		case 'HHmm':
			return (hour >= 10 ? hour : '0' + hour) + ':' + (minute >= 10 ? minute : '0' + minute);
		case 'HHmmss':
			return (hour >= 10 ? hour : '0' + hour) + ':' + (minute >= 10 ? minute : '0' + minute) + ':' + (second >= 10 ? second : '0' + second);
		case 'HHmm(DD)':
			return (hour >= 10 ? hour : '0' + hour) + ':' + (minute >= 10 ? minute : '0' + minute) + '(' + (day >= 10 ? day : '0' + day) + ')';
		case '(DD)HHmm':
			return '(' + (day >= 10 ? day : '0' + day) + ')' + (hour >= 10 ? hour : '0' + hour) + ':' + (minute >= 10 ? minute : '0' + minute);
		case 'DD HH:mm:ss':
			return '(' + (day >= 10 ? day : '0' + day) + ')' + (hour >= 10 ? hour : '0' + hour) + ':' + (minute >= 10 ? minute : '0' + minute) + ':' + (second >= 10 ? second : '0' + second);
		case 'HH:mm:ss':
			return (hour >= 10 ? hour : '0' + hour) + ':' + (minute >= 10 ? minute : '0' + minute) + ':' + (second >= 10 ? second : '0' + second);
		case 'DD':
			return day >= 10 ? day : '0' + day;
		case 'MMDD':
			return (month >= 10 ? month : '0' + month) + '' + (day >= 10 ? day : '0' + day);
		case 'YYYY-MM-DD':
			return year + '-' + (month >= 10 ? month : '0' + month) + '-' + (day >= 10 ? day : '0' + day);
		case 'YYYY-MM-DD HH:mm':
			return year + '-' + (month >= 10 ? month : '0' + month) + '-' + (day >= 10 ? day : '0' + day) + ' ' + (hour >= 10 ? hour : '0' + hour) + ':' + (minute >= 10 ? minute : '0' + minute);
		case 'YYYY-MM-DD HH:mm:ss':
			return year + '-' + (month >= 10 ? month : '0' + month) + '-' + (day >= 10 ? day : '0' + day) + ' ' + (hour >= 10 ? hour : '0' + hour) + ':' + (minute >= 10 ? minute : '0' + minute) + ':' + (second >= 10 ? second : '0' + second);
		default:
			return empty;
	}
};
export const timeMinuteFormat = (num)=>{
    if(isNumber(num)){
        let secondsFormat = (sec)=>{
            let time = ''
            let days = Math.floor(sec / 24 / 60)
            let hour = Math.floor((sec - days * 24 * 60) / 60)
            let minute = Math.floor(sec - hour * 60 - days * 24 * 60)
            if(sec==0){
                return '0分'
            }
            if(days > 0){
                time += (days+ "天")
            }
            if (hour > 0) {
                time += (hour+ "时")
            }
            if (minute > 0) {
                time += (minute + "分")
            }
            return time
        }
        return secondsFormat(num)
    }else{
        return '0分'
    }
}
//60

// 页面上 element时间控件的图标显示优化
let timeout1
const debounce1 = (fn, interval = 500) => {
    return (t)  => {
        clearTimeout(timeout1);
        timeout1 = setTimeout(function() {
            console.log(3);
            fn()
        }, interval);
    };
};
export const eleDateShow=(ele)=>{
    let a = Array.from(document.getElementsByClassName('el-date-editor'))
     a.map((k, l) => {
         k.addEventListener('mouseover', (e) => {
              let value=k.getElementsByTagName('input')[0].value
              if (value) {
                  k.getElementsByClassName('el-input__prefix')[0].setAttribute("class1","displayNone")
              }
        } )
        k.addEventListener('mouseout', (e) => {
            k.getElementsByClassName('el-input__prefix')[0].removeAttribute ("class1")
        } )
    })
}
export const inputLength=(t)=>{
    let input =Array.from(document.getElementsByTagName('input'))
    let textarea =Array.from(document.getElementsByTagName('textarea'))

    input.map((k,l)=>{
        k.addEventListener('input', (e) => {
             if (e.target.value&&e.target.value.toString().length>255) {
                e.target.value=e.target.value.slice(0,255)
                // k.style = "border-color:red"
                debounce1(()=>{
                	t.$message.warning('最多只能输入255个字符')
                },300)(t)
                // t.$message.warning('最多只能输入255个字符')
            }else{

			}
        } )
    })
    textarea.map((k,l)=>{
        k.addEventListener('input', (e) => {
            if (e.target.value&&e.target.value.toString().length>255) {
                e.target.value=e.target.value.slice(0,255)
                // k.style = "border-color:red"
                debounce1(()=>{
                    t.$message.warning('最多只能输入255个字符')
                },300)(t)
             }else{

            }
        } )
    })
}

// 给数字input给默认值
export const defaultValue=(eles)=>{
     eles.each((index,ele)=>{
        ele.value=ele.value||'NA'
    })
}

//  工单input 类型 校验
export const bindInputFn=(that)=>{
    let arr=document.querySelectorAll("input[inputtype]")
    for(let i=0;i<arr.length;i++){
        let type=arr[i].getAttribute('inputtype')
        arr[i].addEventListener('input',($event)=>{inputTypeC( arr[i],$event,that)})
        arr[i].addEventListener('blur',($event)=>{inputTypeBlur( arr[i],$event,that)})
    }
}
export const numtypeC=(k,e,that)=>{
    let type=k.getAttribute('inputtype')

    console.log(1,type,e);
    if(type==='num'){
        let value= e.target.value
        let reg = /([^(\d|\-)])?(-)?([^\d])?(\d{0,})?([^(\.|\d)]+)?(\.)?([^(\.|\d)]+)?(\d{0,})?([^\d]{0,})?/g;
        console.log(reg.test(value));
        let reg1=/^(-|\d)(\d{0,})(\.?)?(\d+)?$/g
        let blo=reg1.test( value)
        e.target.value= value.replace(reg,'$2$4$6$8')
        if(!e.target.value ){
            e.target.value='NA'
        }
        if(!blo){
            debounce(()=>{
                that.$message.warning('只能输入数字,默认值为‘NA’')
            },300)()
        }
    }
}
export const numtypeB=(k,e,that)=>{
    let type=k.getAttribute('inputtype')

    console.log(2,type,e);
    if(type==='num'){
        let value= e.target.value
        let reg=/^((-\d+)|(\d+))(\.?\d+)?$/g
        let blo=reg.test(e.target.value)
        if(!blo){

        }
        if(value.split('.').length>1&&value.split('.')[1]===''){
            e.target.value= value.split('.')[0]
            that.$message.warning('以为您自动过滤尾部‘.’')
        }
        if(value.split('-').length>1&&value.split('-')[1]===''){
            e.target.value= "NA"
            that.$message.warning('请输入正确的数字,默认值为‘NA’')
        }

    }
}
function inputTypeBlur(type,e,that) {
    if(e.target.value===''){
        return false
    }
    numtypeB(type,e,that)
}
function inputTypeC(type,e,that) {
     if(e.target.value===''){
        return false
    }
    numtypeC(type,e,that)

}
