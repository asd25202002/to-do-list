var addinput = document.getElementsByClassName("add__input")[0];
var addevent = document.getElementsByClassName("add__icon")[0];
var wait = document.getElementsByClassName("wait")[0];
var done = document.getElementsByClassName("done")[0];
var controlModify = true;

addevent.onclick = function(){
    var addcontent = addinput.value.trim();
    if(addcontent == ""){
        alert("尚未輸入項目");
    }
    else{
        addWaititem(addcontent);
        addinput.value = "";
    }
}

function addWaititem(content){
    //新增div
    var waitItem = document.createElement("div");
    var waitItemText = document.createElement("div");
    var waitIcons = document.createElement("div");
    var waitItemIconsModify = document.createElement("div");
    var waitItemIconsTrash = document.createElement("div");
    var waitItemIconsDone = document.createElement("div");
    //新增class
    waitItem.className = "wait__item";
    waitItemText.className = "wait__item__text";
    waitIcons.className = "wait__icons";
    waitItemIconsModify.className = "wait__item__icons__modify";
    waitItemIconsTrash.className = "wait__item__icons__trash";
    waitItemIconsDone.className = "wait__item__icons__done";
    //添加待辦項目
    waitItemText.innerHTML = content;
    //添加icon
    waitItemIconsModify.innerHTML = '<i class="fas fa-pencil-alt">';
    waitItemIconsTrash.innerHTML = '<i class="fas fa-trash-alt"></i>';
    waitItemIconsDone.innerHTML = '<i class="far fa-check-circle">';
    //形成父子關係
    waitIcons.appendChild(waitItemIconsModify);
    waitIcons.appendChild(waitItemIconsTrash);
    waitIcons.appendChild(waitItemIconsDone);
    waitItem.appendChild(waitItemText);
    waitItem.appendChild(waitIcons);
    //添加到頁面上
    wait.appendChild(waitItem);
    
}