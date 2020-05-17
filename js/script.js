var inputText = document.getElementById("todo"),
    list =document.getElementById("list"),
    n = 2;
console.log(list);
function addComponent(event) {
    if (event.key == "Enter") {
        ++n;
        let txt1 = inputText.value;
        console.log(txt1);
        inputText.value = "";
        let component = document.createElement("div");
        component.setAttribute("class","list-item");
        let inputTag = document.createElement("input");
        inputTag.setAttribute("type", "checkbox");
        inputTag.setAttribute("id","check_"+n);
        let labelTag = document.createElement("label");
        labelTag.setAttribute("for", "check_"+n);
        labelTag.setAttribute("class","checkmark");
        let textTag = document.createElement("div");
        textTag.setAttribute("class", "text");
        textTag.innerText = txt1;
        let btnTag = document.createElement("button")
        btnTag.setAttribute("id","btn_"+n); 
        component.appendChild(inputTag);
        component.appendChild(labelTag);
        component.appendChild(textTag);
        component.appendChild(btnTag);
        console.log(component);
        list.appendChild(component);
    }
}/*<div class="list-item">
    //<input type="checkbox" id="check1">
    //<label for="check1" class = "checkmark"></label>
    <div class="text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti nam sequi est, necessitatibus magni sit ex maxime minima eius, unde expedita. Fugit asperiores pariatur, illum fuga provident inventore maxime ducimus.</div>
    //<div class="btn-wrap"><button></button></div>
</div>*/