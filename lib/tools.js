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