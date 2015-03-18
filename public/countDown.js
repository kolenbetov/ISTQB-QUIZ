module.exports = function(cb){
    var timer = document.querySelector('#timer');
    var seconds = 900;

    var countDown = setInterval(function(){
        var minutes = Math.round((seconds - 30)/60);
        var remainingSeconds = seconds % 60;
        if (remainingSeconds < 10) {
            remainingSeconds = "0" + remainingSeconds;
        } timer.innerHTML = minutes + ":" + remainingSeconds;
        if (seconds === 0){
            clearInterval(countDown);
            cb();
        }
        else {
            seconds--;
        }
    }, 1000);
};