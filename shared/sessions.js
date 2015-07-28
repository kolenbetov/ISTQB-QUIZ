function checkCookie(username){
    var cookieString = document.cookie;
    if (cookieString != ""){
        var name = cookieString.split('=')[1];
        return (name === username);
    }
}

module.exports = checkCookie;