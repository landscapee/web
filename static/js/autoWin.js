(function(doc, win) {

    var docEl = doc.documentElement,
        resizeEvt = "orientationchange" in window ? "orientationchange" : "resize",
        recalc = function() {
            var bili = 20
            if(docEl.clientWidth<=1200){
                bili = 20
            }
            if(docEl.clientWidth>1200&&docEl.clientWidth<=1680){
                bili = 22
            }
            if(docEl.clientWidth>1680){
                bili = 24
            }


            var width = docEl.clientWidth / bili;
            docEl.style.fontSize = width + "px";
        };
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener("DOMContentLoaded", recalc, false);
})(document, window);