/* Section Full Screen */
const section = document.querySelectorAll("section");

//document.body.style.height = innerHeight;

function setHeight() {
    section.forEach((e)=>{
        if(e.classList.contains("show")) {
            e.style.minHeight = `${innerHeight}px`;
        }else{
            e.style.top = `${711*(+(e.className.split(" ")[0].split("")[7])-1)}px`;
        }
    })
};
setHeight();
window.addEventListener("resize", setHeight);


/* Refresh Page and Keep Scroll Position */
document.addEventListener("DOMContentLoaded", function(event) { 
    var scrollpos = localStorage.getItem('scrollpos');
    if (scrollpos) window.scrollTo(0, scrollpos);
});

window.onbeforeunload = function(e) {
    localStorage.setItem('scrollpos', window.scrollY);
};
/* // Another Way
function refreshPage () {
    var page_y = $( document ).scrollTop();
    window.location.href = window.location.href + '?page_y=' + page_y;
}
window.onload = function () {
    setTimeout(refreshPage, 35000);
    if ( window.location.href.indexOf('page_y') != -1 ) {
        var match = window.location.href.split('?')[1].split("&")[0].split("=");
        $('html, body').scrollTop( match[1] );
    }
}
*/





