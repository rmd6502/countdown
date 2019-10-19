
var timeLeft = 0;
var timeout = null;
var lastStart = 0;
onmessage = (m) => {
    message = m.data
    if (message.hasOwnProperty("start")) {
        console.log("start "+message.start)
        if (message.start) {
            lastStart = Date.now()
            timeout = setTimeout(() => {
                postMessage({
                    timeLeft: 0
                })
            }, timeLeft);
        } else {
            // This has a race condition, but I think this is the
            // safest order. We shouldn't fire the timer
            // if we're trying to stop it, but as soon as the
            // clock starts again we'll fire immediately, since
            // timeLeft will be 0.
            clearTimeout(timeout)
            updateTime()
            timeout = null
            lastStart = 0
        }
    } else if (message.hasOwnProperty("time")) {
        console.log("setting timeLeft to "+message.time)
        timeLeft = message.time
    } else if (message.hasOwnProperty("getCurrentTime")) {
        var diff = 0
        if (lastStart > 0) {
            diff = Date.now() - lastStart
        }
        postMessage({
            timeLeft: timeLeft - diff
        })
    }
}

function updateTime() {
    if (lastStart > 0) {
        timeLeft -= Date.now() - lastStart
        if (timeLeft < 0) {
            timeLeft = 0
        }
    }
}