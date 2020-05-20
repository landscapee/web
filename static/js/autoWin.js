// (function(doc, win) {
//     var docEl = doc.documentElement,
//         resizeEvt = "orientationchange" in window ? "orientationchange" : "resize",
//         recalc = function() {
//             var width = docEl.clientWidth / 20  ;
//             docEl.style.fontSize = width + "px";
//         };
//     if (!doc.addEventListener) return;
//     win.addEventListener(resizeEvt, recalc, false);
//     doc.addEventListener("DOMContentLoaded", recalc, false);
// })(document, window);
(function(doc, win) {
    const DEFAULT_WIDTH = window.screen.width;
    const DEFAULT_HEIGHT = window.screen.height;
    const DEFAULT_FONTSIZE = 16;
    var currentScreenFontSize;
    let screenWidth = window.innerWidth;
    let screenHeight = window.innerHeight;
    let x, y, radioX, radioY;

    radioX = DEFAULT_WIDTH / DEFAULT_FONTSIZE;
    x = screenWidth / radioX;

    radioY = DEFAULT_HEIGHT / DEFAULT_FONTSIZE;
    y = screenHeight / radioY;

    currentScreenFontSize = Math.min(x, y);
    window.document.documentElement.style.fontSize = currentScreenFontSize + 'px';
})(document, window);