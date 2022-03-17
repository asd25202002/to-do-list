var addInput = document.getElementsByClassName("add__input")[0];
var addEvent = document.getElementsByClassName("add__icon")[0];
var notesBtnWait = document.getElementsByClassName("notes__btn__wait")[0];
var notesBtnDone = document.getElementsByClassName("notes__btn__done")[0];
var notesWait = document.getElementsByClassName("notes__wait")[0];
var notesDone = document.getElementsByClassName("notes__done")[0];
var controlModify = true;

addEvent.onclick = function(){
    var addcontent = addInput.value.trim();
    if(addcontent == ""){
        alert("尚未輸入項目");
    }
    else{
        additemboxItem(addcontent);
        addInput.value = "";
    }
}

notesBtnWait.onclick = function(){
    notesWait.style.display = "block";
    notesDone.style.display = "none";
}

notesBtnDone.onclick = function(){
    notesDone.style.display = "block";
    notesWait.style.display = "none";
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
    itemboxItem.className = "notes__itembox__item";
    itemboxItemText.className = "notes__itembox__item__text";
    itemboxItemIcons.className = "notes__itembox__item__icons";
    itemboxItemIconsModify.className = "notes__itembox__item__icons__modify";
    itemboxItemIconsTrash.className = "notes__itembox__item__icons__trash";
    itemboxItemIconsDone.className = "notes__itembox__item__icons__done";
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
    notesWait.appendChild(itemboxItem);
    //修改按鈕
    itemboxItemIconsModify.onclick = function(ev){
        if(controlModify == true){
            controlModify = false;
            var itemboxItemBefore = itemboxItemText.innerHTML;
            itemboxItemText.innerHTML = '<input class="notes__itembox__item__text__input" type="text">';
            var itemboxItemTextInput = document.getElementsByClassName("notes__itembox__item__text__input")[0];
            itemboxItemTextInput.value = itemboxItemBefore;
            itemboxItemTextInput.select(); //將文字反白
            ev = window.event || ev;
            if(ev.stopPropagation()) ev.cancelBubble = true; //阻止冒泡事件
            itemboxItemTextInput.addEventListener('blur',function(e){
                itemboxItemText.innerHTML = itemboxItemTextInput.value;
                controlModify = true;
            },false);
        }
    }
    //刪除按鈕
    itemboxItemIconsTrash.onclick = function(ev){
        itemboxItem.parentNode.removeChild(itemboxItem);
    }
    //完成按鈕
    itemboxItemIconsDone.onclick = function(ev){
        if(controlModify == true){
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
    doneItem.className = "notes__itembox__item";
    doneItemText.className = "notes__itembox__item__text";
    doneIcons.className = "notes__itembox__item__icons";
    doneItemIconsTrash.className = "notes__itembox__item__icons__trash";
    doneItemIconsDone.className = "notes__itembox__item__icons__done";
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
    notesDone.appendChild(doneItem);
    //刪除按鈕
    doneItemIconsTrash.onclick = function(ev){
        doneItem.parentNode.removeChild(doneItem);
    }
    //未完成按鈕
    doneItemIconsDone.onclick = function(ev){
        if(controlModify == true){
            additemboxItem(doneItemText.innerHTML);
            doneItem.parentNode.removeChild(doneItem);
        }
    }
}