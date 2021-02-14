function calculateLove(){
    var yourName = document.getElementById("yourName").value;
    var friendName = document.getElementById("friendName").value;
    var err1 = document.getElementById("err1");
    var err2 = document.getElementById("err2");
    var errText;
    if(yourName.trim()==""){
        errText = "* Please fill first name";
        err1.innerHTML = errText;
        return false;
    } else if(yourName.trim().length<3){
        errText = "* Your name must be minimum 3 characters";
        err1.innerHTML = errText;
        return false;
    } else if(friendName.trim()==""){
        errText = "* Please fill friend name";
        err2.innerHTML = errText;
        return false;
    } else if(friendName.trim().length<3){
        errText = "* Friend name must be minimum 3 characters";
        err2.innerHTML = errText;
        return false;
    } else{
        return true;
    }
}

function scrollWin(){
    window.scrollBy(0, 300);
}
