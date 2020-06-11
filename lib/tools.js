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
