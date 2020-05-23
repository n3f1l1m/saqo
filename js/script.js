var inputText = document.getElementById("todo"),
    list =document.getElementById("list"),
    hrTag = document.getElementById("line"),
    viewAllBtn = true,
    viewActiveBtn = false,
    viewCompletedBtn = false,
    viewCount,
    n = list.childElementCount,
    data = [],
    checkCount = 0,
    isAllChecked = false;

    
function hrViewer() {

    let checkAllBtn = document.getElementById("check-all"),
        botMenu = document.getElementById("bot-menu");
    if(n == 0){
        hrTag.setAttribute("style", "display: none");
        checkAllBtn.setAttribute("style", "display: none");
        botMenu.setAttribute("style", "display: none");
    }
    else{
        hrTag.setAttribute("style", "display: block");
        checkAllBtn.setAttribute("style", "display: block");
        botMenu.setAttribute("style", "display: block");
    }

} 
function itemCountUpdate() {
    let itemCount = document.getElementById("item-count"),
        checkBoxes = list.getElementsByTagName("input"),
        index = 0;
        checkCount = 0;
    for(let item of checkBoxes) {
        if(item.checked == true){
            checkCount++;
            data[index].isChecked = true;
        }
        else {
            data[index].isChecked = false;
        }
        index++;
    }
    
    let checkAllBtn = document.getElementById("check-all");

    if(n != 0) {
        if(checkCount == n) {

            isAllChecked = true;
            checkAllBtn.setAttribute("style", "opacity: 1");
        }
        else{

            isAllChecked = false;
            checkAllBtn.setAttribute("style", "opacity: 0.1");
        }
    }
    
    if(viewAllBtn){
        viewAll();
    }
    else if(viewActiveBtn){
        viewActive();
    }
    else if(viewCompletedBtn){
        viewCompleted();
    }
    itemCount.innerText = (n - checkCount + " item left");
    localStorage.setItem("data", JSON.stringify(data));
    

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
                if(tempText.search(" ") > 50 || tempText.search(" ") == -1) {
                        txtFinal = txtFinal + tempText.slice(0,50) + " ";
                        tempText = tempText.slice(50,tempText.length);
                        
                }

            }
            txtFinal = txtFinal + tempText;
            
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
            
            data.push({id: n, isChecked: false, text: tempText});
            ++n;
            hrViewer();
            itemCountUpdate();
        }
    
    }
    localStorage.setItem("data", JSON.stringify(data));  
}
function removeComponent(event) {
    let btn = event.target,
    btnID,
    checkAllBtn = document.getElementById("check-all");
    btn.parentElement.parentElement.removeChild(btn.parentElement);
    n--;
    btnID = btn.id.slice(4,5);
    for(let i = 0 ; i< data.length; i++) {
        if(data[i].id == btnID ) {
            data.splice(i, 1);
        }
    }
    hrViewer();
    itemCountUpdate();
    if(n == 0) {
        checkAllBtn.setAttribute("style", "display: none");
    }
    localStorage.setItem("data", JSON.stringify(data));
    
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
    textTag.appendChild(inputTag);
    
}
function inputEvent(event) {
    let elem = event.target;
    elem.focus();
    if (event.key == "Enter") {
            let tempText = elem.value.trim();
            if(tempText != "") {
                elem.value = "";
            }
            let txtFinal = "";
            while (tempText.length > 50) {       
                if(tempText.search(" ") > 50 || tempText.search(" ") == -1) {
                        txtFinal = txtFinal + tempText.slice(0,50) + " ";
                        tempText = tempText.slice(50,tempText.length);        
                }
            }
            txtFinal = txtFinal + tempText;

        let parElem = elem.parentElement,
            id = parElem.parentElement.getElementsByTagName("button")[0].id.slice(4,5);
        data[id].text = txtFinal;
        parElem.removeChild(elem);
        parElem.innerText = txtFinal;
        localStorage.setItem("data", JSON.stringify(data));
    }
}
function viewAll() {
    let checkBoxes = list.getElementsByTagName("input"),
    btn = document.getElementById("view-all");
    for(let item of checkBoxes) {
        item.parentElement.style = "display: flex";
    }
    btnBorder(btn, n);
    viewAllBtn = true;
    viewActiveBtn = false;
    viewCompletedBtn = false;
    localStorage.setItem("state", "view-all");

}                    
function viewActive() {
    let checkBoxes = list.getElementsByTagName("input"),
        btn = document.getElementById("view-active");
    viewCount = 0;
    for(let item of checkBoxes) {
        if(item.checked == true) {
            item.parentElement.style = "display: none";
             
        }
        else {
            item.parentElement.style = "display: flex";
            viewCount++;
        }
    }
    viewAllBtn = false;
    viewActiveBtn = true;
    viewCompletedBtn = false;
    btnBorder(btn, viewCount);
    localStorage.setItem("state", "view-active");

}
function viewCompleted() {
    let checkBoxes = list.getElementsByTagName("input"),
    btn = document.getElementById("view-completed");
    viewCount = 0;
    for(let item of checkBoxes) {
        if(item.checked != true) {
            item.parentElement.style = "display: none";
        }
        else {
            item.parentElement.style = "display: flex";
            viewCount++;
        }
    }   
    viewAllBtn = false;
    viewActiveBtn = false;
    viewCompletedBtn = true;
    btnBorder(btn, viewCount);  
    localStorage.setItem("state", "view-completed");       
}
function btnBorder(key,viewCount) {
    let btns = document.getElementById("bot-menu").querySelectorAll("button");
    for(let item of btns) {
        
        if(key == item) {
            item.style = "border: 2px solid #ff5e5e";
        }
        else {
            item.style = "border: 2px solid #FFF";
        }    
    }
    if (viewCount == 0) {
        hrTag.setAttribute("style", "display: none");
    }
    else {
        hrTag.setAttribute("style", "display: block");

    }
}
function pageRestore() {
    let newJSON = localStorage.getItem("data"),
    state = localStorage.getItem("state");

    isAllChecked = false;
    switch(state) {
        case "view-completed":
            viewAllBtn = false;
            viewActiveBtn = false;
            viewCompletedBtn = true;
            break
        case "view-active":
            viewAllBtn = false;
            viewActiveBtn = true;
            viewCompletedBtn = false;
            break
        case "view-all":
            viewAllBtn = true;
            viewActiveBtn = false;
            viewCompletedBtn = false;
            break      
    }
    newData = JSON.parse(newJSON);


if(newData != null){
    for(let item of newData) {
        let component = document.createElement("div");
        component.setAttribute("class","list-item");
        let inputTag = document.createElement("input");
        inputTag.setAttribute("type", "checkbox");
        inputTag.setAttribute("id","check_"+n);
        if(item.isChecked){
            inputTag.setAttribute("checked",item.isChecked);
        }
        inputTag.setAttribute("onchange", "itemCountUpdate()");
        component.appendChild(inputTag);
        let labelTag = document.createElement("label");
        labelTag.setAttribute("for", "check_"+n);
        labelTag.setAttribute("class","checkmark");
        component.appendChild(labelTag);
        let textTag = document.createElement("div");
        textTag.setAttribute("class", "text");
        textTag.setAttribute("ondblclick", "editComponent(event)");
        textTag.innerText = item.text;
        component.appendChild(textTag);
        let btnTag = document.createElement("button")
        btnTag.setAttribute("id","btn_"+n); 
        btnTag.setAttribute("onclick","removeComponent(event)"); 
        component.appendChild(btnTag);
        list.appendChild(component);
        data.push({id: n, isChecked: item.isChecked, text: item.text});
        ++n;
    }
}
        hrViewer();
        itemCountUpdate();
}

pageRestore();

