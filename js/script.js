var inputText = document.getElementById("todo"),
    list =document.getElementById("list"),
    
    //checkBoxeWrapers = list.getElementsByClassName("checkmark"),
    n = list.childElementCount,
    data = [],
    checkCount = 0,
    isAllChecked = false;
    
function hrViewer() {
    let hrTag = document.getElementsByTagName("hr"),
        checkAllBtn = document.getElementById("check-all"),
        botMenu = document.getElementById("bot-menu");
    if(n == 0){
        hrTag[0].setAttribute("style", "display: none");
        checkAllBtn.setAttribute("style", "display: none");
        botMenu.setAttribute("style", "display: none");
    }
    else{
        hrTag[0].setAttribute("style", "display: block");
        checkAllBtn.setAttribute("style", "display: block");
        botMenu.setAttribute("style", "display: block");
    }
} 

function itemCountUpdate() {
    let itemCount = document.getElementById("item-count"),
        checkBoxes = list.getElementsByTagName("input"),
        checkCount = 0;
    for(let item of checkBoxes) {
        if(item.checked == true){
            checkCount++;
        }
    }
    console.log(checkCount);
    itemCount.innerText = (n - checkCount + " item left");
}
function checkAll() {
    let checkBoxes = list.getElementsByTagName("input"),
        checkAllBtn = document.getElementById("check-all");
    if(!isAllChecked)
    {
        for(let item of checkBoxes) {
            item.checked = true;
        }
        isAllChecked = true;
        checkAllBtn.setAttribute("style", "opacity: 1");
    }
    else
    {
        for(let item of checkBoxes) {
            item.checked = false;
        }
        isAllChecked = false;
        checkAllBtn.setAttribute("style", "opacity: 0.1");
    }
      

}
function addComponent(event) {
    if (event.key == "Enter") {
        ++n;
        let txt1 = inputText.value;
        inputText.value = "";
        let component = document.createElement("div");
        component.setAttribute("class","list-item");
        let inputTag = document.createElement("input");
        inputTag.setAttribute("type", "checkbox");
        inputTag.setAttribute("id","check_"+n);
        component.appendChild(inputTag);
        let labelTag = document.createElement("label");
        labelTag.setAttribute(["for"], "check_"+n);
        labelTag.setAttribute("class","checkmark");
        //labelTag.setAttribute("onclick","check()");
        component.appendChild(labelTag);
        let textTag = document.createElement("div");
        textTag.setAttribute("class", "text");
        textTag.innerText = txt1;
        component.appendChild(textTag);
        let btnTag = document.createElement("button")
        btnTag.setAttribute("id","btn_"+n); 
        btnTag.setAttribute("onclick","removeComponent(event)"); 
        component.appendChild(btnTag);
        list.appendChild(component);
        hrViewer();
        itemCountUpdate();
        data.push({isChecked: false, text: txt1});
        //console.log(data);
    }
}
function removeComponent(event) {
    let btn = event.target;
    btn.parentElement.parentElement.removeChild(btn.parentElement);
    n--;
    data.splice(btn.id.slice(4,5) - 1, 1)
    hrViewer();
    itemCountUpdate();
    //console.log(data);
}

hrViewer();
itemCountUpdate();
