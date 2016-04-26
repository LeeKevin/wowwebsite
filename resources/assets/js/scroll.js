module.exports = function () {
    var scrollButton = document.getElementById("arrow");
    scrollButton.onclick = function () {
        smoothScroll(scrollButton, 500);
    };
};

var smoothScroll = function (target, duration) {
    var scrollContainer = target;
    do { //find scroll container
        scrollContainer = scrollContainer.parentNode;
        if (!scrollContainer) return;
        scrollContainer.scrollTop += 1;
    } while (scrollContainer.scrollTop == 0);

    var targetY = 0;
    do { //find the top of target relatively to the container
        if (target == scrollContainer) break;
        targetY += target.offsetTop;
    } while (target = target.offsetParent);

    var start = Date.now();

    function min(a, b) {
        return a < b ? a : b;
    }

    var initialPosition = scrollContainer.scrollTop;
    var scrollIncrement = function () {
        var current = Date.now(),
            elapsed = min(1, (current - start) / duration),
            ease = elapsed < 0.5 ? 2 * elapsed * elapsed : -1 + (4 - 2 * elapsed) * elapsed;

        scrollContainer.scrollTop = (ease * (targetY - initialPosition)) + initialPosition;

        if (scrollContainer.scrollTop >= targetY || document.body.scrollHeight == document.body.scrollTop + window.innerHeight || elapsed == 1) return;
        requestAnimationFrame(scrollIncrement);
    };
    scrollIncrement();
};
