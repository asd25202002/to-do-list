var addInput = document.getElementsByClassName("add__input")[0];
var addEvent = document.getElementsByClassName("add__icon")[0];
var waitTitle = document.getElementsByClassName("wait__btn")[0];
var doneTitle = document.getElementsByClassName("done__btn")[0];
var itembox = document.getElementsByClassName("itembox")[0];
var controlModify = true;
var json = {};

// additemboxItem("(範例)CSS練習");
// additemboxItem("(範例)JS練習");
// addDoneItem("(範例)TO-DO List練習");

addEvent.onclick = function(){
    var addcontent = addInput.value.trim();
    if(addcontent == ""){
        alert("尚未輸入項目");
    }
    else{
        additemboxItem(addcontent);
        addWaitJson(addcontent);
        addInput.value = "";
    }
}

waitTitle.onclick = function(ev){
    //清空介面
    
    //顯示wait資料
    if(json["待辦事項"] != undefined){
        for(i = 0; i < json["待辦事項"].length; i++){
            console.log(json["待辦事項"][i]);
        }
    }
}

doneTitle.onclick = function(ev){
    //顯示done資料
    if(json["完成事項"] != undefined){
        for(i = 0; i < json["完成事項"].length; i++){
            console.log(json["完成事項"][i]);
        }
    }
}

function addWaitJson(content){
    //新增wait資料
    if(json["待辦事項"] == undefined){
        json["待辦事項"] = [content];
    }
    else{
        json["待辦事項"].push(content);
    }
}

function addDoneJson(content){
    //新增done資料
    if(json["完成事項"] == undefined){
        json["完成事項"] = [content];
    }
    else{
        json["完成事項"].push(content);
    }
}

function additemboxItem(content){
    //新增div
    var itemboxItem = document.createElement("div");
    var itemboxItemText = document.createElement("div");
    var itemboxItemIcons = document.createElement("div");
    var itemboxItemIconsModify = document.createElement("div");
    var itemboxItemIconsTrash = document.createElement("div");
    var itemboxItemIconsDone = document.createElement("div");
    //新增class
    itemboxItem.className = "itembox__item";
    itemboxItemText.className = "itembox__item__text";
    itemboxItemIcons.className = "itembox__item__icons";
    itemboxItemIconsModify.className = "itembox__item__icons__modify";
    itemboxItemIconsTrash.className = "itembox__item__icons__trash";
    itemboxItemIconsDone.className = "itembox__item__icons__done";
    //添加待辦項目
    itemboxItemText.innerHTML = content;
    //添加icon
    itemboxItemIconsModify.innerHTML = '<i class="fas fa-pencil-alt">';
    itemboxItemIconsTrash.innerHTML = '<i class="fas fa-trash-alt"></i>';
    itemboxItemIconsDone.innerHTML = '<i class="far fa-check-circle">';
    //形成父子關係
    itemboxItemIcons.appendChild(itemboxItemIconsModify);
    itemboxItemIcons.appendChild(itemboxItemIconsTrash);
    itemboxItemIcons.appendChild(itemboxItemIconsDone);
    itemboxItem.appendChild(itemboxItemText);
    itemboxItem.appendChild(itemboxItemIcons);
    //添加到頁面上
    itembox.appendChild(itemboxItem);
    //修改按鈕
    itemboxItemIconsModify.onclick = function(ev){
        if(controlModify == true){
            controlModify = false;
            var itemboxItemBefore = itemboxItemText.innerHTML;
            itemboxItemText.innerHTML = '<input class="itembox__item__text__input" type="text">';
            var itemboxItemTextInput = document.getElementsByClassName("itembox__item__text__input")[0];
            itemboxItemTextInput.value = itemboxItemBefore;
            itemboxItemTextInput.select(); //將文字反白
            ev = window.event || ev;
            if(ev.stopPropagation()) ev.cancelBubble = true; //阻止冒泡事件
            document.onclick = function(){
                itemboxItemText.innerHTML = itemboxItemTextInput.value;
                controlModify = true;
            }
        }
    }
    //刪除按鈕
    itemboxItemIconsTrash.onclick = function(ev){
        json["待辦事項"].pop(itemboxItemText.innerHTML);
        itemboxItem.parentNode.removeChild(itemboxItem);
    }
    //完成按鈕
    itemboxItemIconsDone.onclick = function(ev){
        if(controlModify == true){
            addDoneJson(itemboxItemText.innerHTML);
            json["待辦事項"].pop(itemboxItemText.innerHTML);
            addDoneItem(itemboxItemText.innerHTML);
            itemboxItem.parentNode.removeChild(itemboxItem);
        }
    }
}

function addDoneItem(content){
    //新增div
    var doneItem = document.createElement("div");
    var doneItemText = document.createElement("div");
    var doneIcons = document.createElement("div");
    var doneItemIconsTrash = document.createElement("div");
    var doneItemIconsDone = document.createElement("div");
    //新增class
    doneItem.className = "itembox__item";
    doneItemText.className = "itembox__item__text";
    doneIcons.className = "itembox__item__icons";
    doneItemIconsTrash.className = "itembox__item__icons__trash";
    doneItemIconsDone.className = "itembox__item__icons__done";
    //添加待辦項目
    doneItemText.innerHTML = content;
    //添加icon
    doneItemIconsTrash.innerHTML = '<i class="fas fa-trash-alt"></i>';
    doneItemIconsDone.innerHTML = '<i class="far fa-check-circle">';
    //形成父子關係
    doneIcons.appendChild(doneItemIconsTrash);
    doneIcons.appendChild(doneItemIconsDone);
    doneItem.appendChild(doneItemText);
    doneItem.appendChild(doneIcons);
    //添加到頁面上
    done.appendChild(doneItem);
    //刪除按鈕
    doneItemIconsTrash.onclick = function(ev){
        json["完成事項"].pop(doneItemText.innerHTML);
        doneItem.parentNode.removeChild(doneItem);
    }
    //未完成按鈕
    doneItemIconsDone.onclick = function(ev){
        if(controlModify == true){
            addWaitJson(doneItemText.innerHTML);
            json["完成事項"].pop(doneItemText.innerHTML);
            additemboxItem(doneItemText.innerHTML);
            doneItem.parentNode.removeChild(doneItem);
        }
    }
}