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
    //onsole.log(checkCount);
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
    itemCountUpdate();

}
function addComponent(event) {
    if (event.key == "Enter") {
        
        let tempText = inputText.value.trim();
        if(tempText != "") {

            inputText.value = "";
            let txtFinal = "";
            while (tempText.length > 50) {
                //console.log(tempText.length);
                if(tempText.search(" ") > 50 || tempText.search(" ") == -1) {
                        //console.log(tempText.slice(0,50));
                        //console.log("text final", txtFinal);

                        txtFinal = txtFinal + tempText.slice(0,50) + " ";
                        tempText = tempText.slice(50,tempText.length);
                        //break;
                        
                }

            }
            //console.log(tempText.length);
            txtFinal = txtFinal + tempText;
            ++n;
            let component = document.createElement("div");
            component.setAttribute("class","list-item");
            let inputTag = document.createElement("input");
            inputTag.setAttribute("type", "checkbox");
            inputTag.setAttribute("id","check_"+n);
            inputTag.setAttribute("onchange", "itemCountUpdate()");
            component.appendChild(inputTag);
            let labelTag = document.createElement("label");
            labelTag.setAttribute("for", "check_"+n);
            labelTag.setAttribute("class","checkmark");
            component.appendChild(labelTag);
            let textTag = document.createElement("div");
            textTag.setAttribute("class", "text");
            textTag.setAttribute("ondblclick", "editComponent(event)");
            textTag.innerText = txtFinal;
            component.appendChild(textTag);
            let btnTag = document.createElement("button")
            btnTag.setAttribute("id","btn_"+n); 
            btnTag.setAttribute("onclick","removeComponent(event)"); 
            component.appendChild(btnTag);
            list.appendChild(component);
            hrViewer();
            itemCountUpdate();
            data.push({isChecked: false, text: tempText});
            //console.log(data);
        }
    
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
function editComponent(event) {
    let textTag = event.target;
    temp = textTag.innerText;
    textTag.innerHTML = "";

    let inputTag = document.createElement("input");
        inputTag.setAttribute("type", "text");
        inputTag.setAttribute("value", temp);
        inputTag.focus();
        inputTag.setAttribute("onkeydown", "inputEvent(event)");
        //console.log("new event",keyEvent);
        
    textTag.appendChild(inputTag);
    //textTag.firstChild.focus = true;
    
}
function inputEvent(event) {
    let elem = event.target;
    if (event.key == "Enter") {
            let tempText = elem.value.trim();
            //console.log(tempText); 
            if(tempText != "") {
                elem.value = "";
            }
            let txtFinal = "";
            while (tempText.length > 50) {
                //console.log(tempText.length);
                if(tempText.search(" ") > 50 || tempText.search(" ") == -1) {
                        //console.log(tempText.slice(0,50));
                        //console.log("text final", txtFinal);

                        txtFinal = txtFinal + tempText.slice(0,50) + " ";
                        tempText = tempText.slice(50,tempText.length);
                        //break;
                        
                }

            }
            //console.log(tempText.length);
            txtFinal = txtFinal + tempText;

        let parElem = elem.parentElement;
        parElem.removeChild(elem);
        parElem.innerText = txtFinal;
        
    }
}
function viewAll(event) {
    //console.log('viewAll');
    let checkBoxes = list.getElementsByTagName("input");
    //console.log(checkBoxes);
    for(let item of checkBoxes) {
        //console.log(item.parentElement);
        item.parentElement.style = "display: flex";
    }
    btnBorder(event.target);

}                    
function viewActive(event) {
    //console.log('viewActive'); 
    let checkBoxes = list.getElementsByTagName("input");
    //console.log(checkBoxes);
    for(let item of checkBoxes) {
        if(item.checked == true) {
            item.parentElement.style = "display: none";
        }
        else {
            item.parentElement.style = "display: flex";
        }
    }
    btnBorder(event.target);
}
function viewCompleted(event) {
    //console.log('viewCompleted'); 
    let checkBoxes = list.getElementsByTagName("input");
    //console.log(checkBoxes);
    for(let item of checkBoxes) {
        if(item.checked != true) {
            item.parentElement.style = "display: none";
        }
        else {
            item.parentElement.style = "display: flex";
        }
    }   
    btnBorder(event.target);          
}
function btnBorder(key) {
    let btns = document.getElementById("bot-menu").querySelectorAll("button");
    //console.log(btns);
    //console.log(key);
    for(let item of btns) {
        
        if(key == item) {
            item.style = "border: 2px solid #ff5e5e";
        }
        else {
            item.style = "border: 2px solid #FFF";
        }
        item.isHover  = ":hover border: 2px solid #fa8e8e"
        
    }
}
hrViewer();
//itemCountUpdate();
