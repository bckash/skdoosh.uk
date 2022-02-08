


// const
const inputForm = document.getElementById("comment-form");
const inputField = document.querySelector("#comment");
const inputFieldName = document.querySelector("#name");
const comList = document.querySelector(".comment-list");
const imgCont = document.querySelector(".avatar__cont");
const hovBorder = document.querySelector(".avatar-hov-border");
const kfpAvatar = document.querySelector(".kfp-avatar");
const nameField = document.getElementById("name");
const msgField = document.getElementById("comment");
const imgPick = [];
const allImg = imgCont.children;

//EL
inputForm.addEventListener("submit", addComment);
comList.addEventListener("click", delComment);
imgCont.addEventListener("click", pickIMG);
imgCont.addEventListener("mouseenter", borderRotateOn);
imgCont.addEventListener("mouseleave", borderRotateOff);
nameField.addEventListener("change",changeFieldColorN);
msgField.addEventListener("change",changeFieldColorM);


// animated border on. (e.target = imgCont) 
function borderRotateOn(e) {
    if (imgPick[0] === undefined) {
        hovBorder.classList.add("js-border-animation");
        e.target.classList.add("js-border-animation2");
    } 
}

// animated border off
function borderRotateOff(e) {

    if (imgPick[0] === undefined) {
        hovBorder.classList.remove("js-border-animation");

        e.target.classList.remove("js-border-animation2");
    }
}

// f: change the border of the choosen pick, and push it to imgPick array - to grab it outside. (1) The reaseon why EL is on parent <section> and not the <img> element itself is only the first <img> element is being selected. (2) different "ifs" regulating situations.
function pickIMG(e) {

    // remove animated border & grey border
    hovBorder.classList.remove("js-border-animation");

    //main
    let img = e.target;
    img.classList.toggle("js-col-change");
    imgPick.push(img);

    // grey border fix
    if (imgPick[0]) {

        for (let i=0; i < allImg.length; i++) {
            allImg[i].classList.add("js-border-grey");
            if (imgPick[0].src === img.src) {continue};
        } 
    }

    // unselecting <img>
    if (imgPick[0].classList.contains("js-col-change") === false) {
        imgPick.pop();
        imgPick.pop();

        hovBorder.classList.add("js-border-animation");
        e.target.classList.add("js-border-animation2");

        for (let i=0; i < allImg.length; i++) {
            allImg[i].classList.remove("js-border-grey");
        } 
    }

    // same <img> selected
    if (imgPick.length > 1 && imgPick[0].src ===    imgPick[1].src) {
        imgPick.pop();
    }

    // block selecting more than one <img>
    else if (imgPick.length > 1) {
        alert("Un-mark the previous character, to choose another one.");
        imgPick.pop();
        img.classList.toggle("js-col-change");
    } 
}

// change name input border color
function changeFieldColorN() {
    if (nameField.value !== "") {
        nameField.style.borderColor = "green";
    } else {
        nameField.style.borderColor = "black";
    }
}

// change message input border color
function changeFieldColorM() {
    if (msgField.value !== "") {
        msgField.style.borderColor = "green";
    } else {
        msgField.style.borderColor = "black";
    }
}

// add comment
function addComment(e) {

    // fill all forms before submitting
    if (inputField.value === "" && inputFieldName.value === "" && imgPick[0] === undefined ) {
        alert("pick a character & add a name with comment");  
    } else if (inputField.value === "" && inputFieldName.value === "") {
        alert("add a name with comment"); 
    } else if (inputFieldName.value === "") {
        alert("add a name");
    } else if (inputField.value === "") {
        alert("add a comment");
    } else if (imgPick[0] === undefined) {
        alert("pick a character");
    }
    
    //MAIN
    else {

        e.preventDefault()
    
    // TOC:
    //------------------
    // [1] create
    // [2] append
    // [3] reset values
    //------------------

    //...................
    // [1] create :
    //...................

    // 1.1 | img

    const av = document.createElement("img");
    av.setAttribute("src", `${imgPick[0].src}`);
    av.className = "comment-avatar"

    // 1.2 | txt nodes

    // a) input fields

    const txt = document.createTextNode(inputField.value);
    const txt2 = document.createTextNode(inputFieldName.value);

    // function for b), c)

    function addZero (val) {
        let nr = Number(val);
        let v = val;
        if (nr < 10){v = "0" + v}
        return v;
    }

    // b) date 

    const dateMain = new Date();

    let timeH = dateMain.getHours().toString();
    timeH = addZero(timeH);
    let timeM = dateMain.getMinutes().toString();
    timeM = addZero(timeM);
    let timeS = dateMain.getSeconds().toString();
    timeS = addZero(timeS);

    const time = timeH + ":" + timeM + ":" + timeS;
    const txt4 = document.createTextNode(time);

    // c) time

    let day = dateMain.getDate();
    day = addZero(day);
    let month = dateMain.getMonth();
    month = addZero(month);
    const year = dateMain.getFullYear();

    switch (dateMain.getDay()) {
        case 0:
            weekDay = "Sun";
          break;
        case 1:
            weekDay = "Mon";
          break;
        case 2:
            weekDay = "Tue";
          break;
        case 3:
            weekDay = "Wed";
          break;
        case 4:
            weekDay = "Th";
          break;
        case 5:
            weekDay = "Fr";
          break;
        case 6:
            weekDay = "Sat";
    }

    const dateSum = weekDay + " | " + day + "." + month + "." + year ;
    const txt5 = document.createTextNode(dateSum);

    // 1.3 | divs

    function createDiv(name) {
        let d = document.createElement("div");
        d.className = `${name}`;
        return d;
    }

    const div = createDiv("com-body");
    const div2 = createDiv("com-name");
    const div3 = createDiv("com-date");

    // 1.4 | grid sub-divs

    function createSubDivL (name, icon) {

        let l = document.createElement("div");
        l.className = `${name}`;
        l.innerHTML = `<span class="material-icons" class="comment-icons">${icon}</span>`;
        return l;
    }

    function createSubDivP (name) {

        let p = document.createElement("div");
        p.className = `${name}`
        return p;
    }
    
    // divDayL = createSubDivL ("day-sub--L", "");
    // divDayP = createSubDivP ("day-sub--P");

    divDateL = createSubDivL ("date-sub--L", "calendar_month");
    divDateP = createSubDivP ("date-sub--P");

    divTimeL = createSubDivL ("time-sub--L", "schedule");
    divTimeP = createSubDivP ("time-sub--P");

    divNameL = createSubDivL ("name-sub--L", "person_outline");
    divNameP = createSubDivP ("name-sub--P");

    const pre = document.createElement("pre");

    // 1.5 | section

    const sec = document.createElement("section");
    sec.className = "comment-ex";

    // 1.6 | li

    const li = document.createElement("li");

    // 1.7 | a (delate X)

    const a = document.createElement("a");
    a.id = "del"
    a.innerHTML = `<span class="material-icons">close</span>`;

    //...................
    // [2] append :
    //...................

    // 2.1 | text nodes

    pre.appendChild(txt);
    divNameP.appendChild(txt2);
    divDateP.appendChild(txt5);
    divTimeP.appendChild(txt4);

    // 2.2 | sub divs & divs

    const div3All = [divDateL, divDateP, divTimeL, divTimeP];
    const div2All = [divNameL, divNameP];
    const divAll = [av,pre];

    function append2Div (dv, arr) {
        const d = dv;
        for (let i=0; i < arr.length; i++) {
            d.appendChild(arr[i]);
        }
        sec.appendChild(d);
    }

    append2Div (div, divAll);
    append2Div (div2, div2All);
    append2Div (div3, div3All);
  
    // 2.3 | section

    li.appendChild(sec);

    // 2.4 | a (delate X)

    div.appendChild(a)
    
    // 2.5 | li 
    // new comments go first

    if (comList.firstChild === null ) {
        comList.appendChild(li);
    } else {
        comList.insertBefore(li, comList.firstChild)
    }

    //...................
    // [3] reset values :
    //...................

    // 3.1 | input fields

    const elReset = [inputForm, inputField, inputFieldName, msgField];

    function resetValues (arr) {
        for (let i=0; i < arr.length; i++) {
            arr[i].value = "";
        }
    }

    resetValues(elReset);

    // 3.2 | border color

    // a)

    const BC = [nameField,msgField];

    function setBorder (arr) {
        for (let i=0; i < arr.length; i++) {
            arr[i].style.borderColor = "black";
        }
    }

    setBorder(BC);

    // b)

    const CR = [hovBorder, kfpAvatar];

    function classRemove (arr) {
        for (let i=0; i < arr.length; i++) {
            arr[i].classList.remove("js-col-change");
        }
    }

    classRemove(CR);

    // c)

    imgCont.classList.remove("js-border-animation2");

    // d)

    for (let i=0; i < allImg.length; i++) {
        allImg[i].classList.remove("js-border-grey");
        allImg[i].classList.remove("js-col-change")
    }

    // 3.3 | img array

    imgPick.pop();
    }  
}

// delate comment
function delComment(e) {

    if (e.target.classList.contains("material-icons")) {
        
        e.target.parentElement.parentElement.parentElement.parentElement.remove();
    }

}

