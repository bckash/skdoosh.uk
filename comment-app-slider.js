    


// next, previous buttons
const arrowL = document.getElementById("arr-L");
const arrowR = document.getElementById("arr-R");
arrowR.addEventListener("click", plus);
arrowL.addEventListener("click", minus);

// show image[0]
let slideIndex = 1;
showIMG(slideIndex);   

// adds "+1" to slideIndex value, invokes showIMG
function plus() {
    let n = 1;
    showIMG(slideIndex += n);
    } 

// adds "-1" to slideIndex value, invokes showIMG
function minus() {
    let n = -1;
    showIMG(slideIndex += n);
    } 

// show next/previous 
function showIMG(n) {
    let i;
    let image = document.getElementsByClassName("kfp-avatar");

    if (n > image.length) {
        slideIndex = 1;}

    if (n < 1) {
        slideIndex = image.length;}

    for (i = 0; i < image.length; i++) { 
        image[i].style.display = "none";}

        image[slideIndex-1].style.display = "block";

        let SI = slideIndex;

        return SI;
    }

