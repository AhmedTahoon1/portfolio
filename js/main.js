
/* Section Full Screen */
const section = document.querySelectorAll("section");

//document.body.style.height = innerHeight;

function setHeight() {
    section.forEach((e)=>{
        e.style.minHeight = `${innerHeight}px`;
    })
};
setHeight();

window.addEventListener("resize", setHeight);

document.addEventListener("DOMContentLoaded", function(event) {
    window.location.hash = "starter";
});

/* Refresh Page and Keep Scroll Position */
/*
document.addEventListener("DOMContentLoaded", function(event) { 
    var scrollpos = localStorage.getItem('scrollpos');
    if (scrollpos) window.scrollTo(0, scrollpos);
});

window.onbeforeunload = function(e) {
    localStorage.setItem('scrollpos', window.scrollY);
};
*/
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

// Starter Div
const starterDiv = document.querySelector(".starter");
const toNextSec = document.querySelector(".toNextSection");
const dblClick = document.querySelector(".dblclick");

// ------------------------
/* Next Section
function toNextSecFunc() {
        starterDiv.style.top = `-${innerHeight}px`;
        document.querySelector(".section2").style.top = "0px";
        document.querySelector("#shutdown").style.top = `${innerHeight}px`;
        dblClick.style.display = "none";
}
starterDiv.addEventListener("dblclick", toNextSecFunc);
document.addEventListener("keydown", e=>{if(e.keyCode == 40)toNextSecFunc()});
*/
function dblclick() {
    dblClick.style.display = "block";
    dblClick.style.left = `${event.clientX + 20}px`;
    dblClick.style.top  = `${event.clientY + 20}px`;
}
starterDiv.addEventListener("mousemove",dblclick);
starterDiv.addEventListener("mouseenter",dblclick);
starterDiv.addEventListener("mouseleave",function (event) {
    dblClick.style.display = "none";
});
// ------------------------
// ------------------------
const starterBigTime = document.querySelector(".starter-footer-datetime-time");
const starterBigDate = document.querySelector(".starter-footer-datetime-date");
const starterIconTime = document.querySelectorAll(".footer-icons-time");
const starterIconTimeAM_PM = document.querySelectorAll(".footer-icons-time span");
const starterIconDate = document.querySelectorAll(".footer-icons-date");
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const dateNow = new Date();
let month = months[dateNow.getMonth()];
let day = days[dateNow.getDay()];

function updateTime() {
    const now = new Date();
    const hours = now.getHours().toLocaleString();
    const minutes = now.getMinutes().toLocaleString();
    const am_pm =now.toLocaleTimeString().split(" ");
    
    // Format the string with leading zeroes
    starterBigTime.textContent =`${am_pm[1] == "PM" ?(hours.toString().padStart(2, '0')-12) : hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    starterIconTime.forEach(e=>{
        e.textContent = `${am_pm[1] == "PM" ?(hours.toString().padStart(2, '0')-12) : hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}` + ` ${am_pm[1]}`
    });
    // Set a timeout for one minute
    //setTimeout(updateTime, 60000);
    
    /* Date */
    starterBigDate.textContent = `${day}, ${month} ${dateNow.getDate()}`;
    starterIconDate.forEach(e=>{
        e.textContent = `${(dateNow.getMonth()) +1}/${dateNow.getDate()}/${dateNow.getFullYear()}`;
    })
}
updateTime();
setInterval(() => {
    updateTime();
}, 1000);


const wifiIcon = document.querySelectorAll(".footer-icons-wifi");
const wifiStatus = document.querySelectorAll('.wifi-status');

wifiIcon.forEach(e=>{
    e.addEventListener("mouseenter", function () {
    wifiStatus.forEach(e=>{
        e.textContent = `${navigator.onLine ? "Online" : "Offline"}`;
        e.style.color = e.textContent == "Online" ? "lime" : "crimson";
        e.style.opacity = "1";
    })
})});
wifiIcon.forEach(e=>{
    e.addEventListener("mouseleave", function () {
    wifiStatus.forEach(e=>{
        e.style.opacity = "0";
    })
})});

// Sign Page

/* Sign In Section */
const sec2 = document.querySelector(".section2");
const returnBtn = document.querySelector(".section2 .return");
const inputPass = document.querySelector("#inputpass");
const showPassIcon = document.querySelector("#showpassicon");
const inputParent = document.querySelector(`.form-input-div`);
const hoverBorder = document.querySelector(".borderL");
const signBtn = document.querySelector(".button.sign-form-buttons-user");
const guestBtn = document.querySelector(".button.sign-form-buttons-guest");

/*
function toPrevSecFunc() {
document.querySelector("#shutdown").style.top = `${innerHeight*2}px`;
sec2.style.top = `${innerHeight}px`;
document.querySelector(".starter").style.top = "0px";
}
if (sec2.style.top == "0") {
    document.addEventListener("keyPress", e =>{
    if(e.keyCode == 38) {
        toPrevSecFunc();
    }
    })
}
*/

returnBtn.addEventListener("click", function () {
    window.location.hash = "starter";
});
showPassIcon.addEventListener("click", function () {
    if (this.classList.value == "fa-solid fa-eye") {
        this.classList.value = "fa-solid fa-eye-slash";
        inputPass.setAttribute("type", "text");
    } else {
        this.classList.value = "fa-solid fa-eye";
        inputPass.setAttribute("type", "password");
    }
})
const hashPass = [539801954, -1403451557, -1773467883, 757287792];
function encrypt() {
    let pass = inputPass.value;
    const hide = document.getElementById('hide').value;
    if (pass == "") {
        document.getElementById("wrongpass").textContent = "";
        document.getElementById('err').textContent = 'Error:Password is missing';
        setTimeout(function(){
            document.getElementById('err').textContent = "";
        },1000)
    }
    else {
        let correctPass = false
        document.getElementById("hide").value = inputPass.value;
        let hash = CryptoJS.MD5(pass);
        for (let i = 0; i < hash["words"].length; i++) {
            if(hashPass[i] != hash["words"][i]){
                correctPass = false;
                break;
            }else{
                correctPass = true; 
            }
        }
        if(correctPass == true) {
            //sec2.style.top=`-${innerHeight}px`;
            //document.querySelector(".shutdown").style.top = "0px";
            window.location.assign("http://127.0.0.1:5500/index.html#main")
        }else{
            document.getElementById('err').textContent = "";
            document.getElementById("wrongpass").textContent = "Wrong Password, Try Again!";
            setTimeout(()=>{
                document.getElementById("wrongpass").textContent="";
            },1000)
        }
    }
}
inputPass.addEventListener("keypress", e => {
    if (e.key == "Enter") {
        e.preventDefault();
        return encrypt();
    }
})
signBtn.addEventListener("click",function(){
    return encrypt();
})
inputPass.addEventListener("input", _ => {
    inputPass.value != "" ? inputParent.classList.add("has-data") : inputParent.classList.remove("has-data");
    hoverBorder.style.width = inputParent.classList.contains("has-data") ? "100%" : "0"
})
guestBtn.addEventListener("click",function(){
    window.location.hash="#main"
})



// Main Section 3

const winIcon = document.querySelector(".win-icon");
const winList = document.querySelector(".win-list");
winIcon.addEventListener("click",function(){
    winList.classList.toggle("show");
})


// taskbar popup
const shutdownLi=document.querySelector(".shutdown-item");
const taskbarPopup=document.querySelector(".taskbar-popup");
const overlay=document.querySelector(".taskbar-popup .overlay");
const shutdownYes=document.querySelector(".shutdown-yes");
const shutdownNo=document.querySelector(".shutdown-no");

function openPopUp() {
    shutdownLi.parentElement.classList.remove("show");
    taskbarPopup.classList.remove("none");

}

function closePopUp() {
    taskbarPopup.classList.add("none");
}
shutdownLi.addEventListener("click",openPopUp)

overlay.addEventListener("click",closePopUp);
shutdownNo.addEventListener("click",closePopUp);

shutdownYes.addEventListener("click",function(){
    setTimeout(function(){
        document.querySelector(".shutdownsec").style.display = "none";
        document.querySelector("#lock").style.display = "flex";
    },2000)
})

const turnOn = document.querySelector(".lock-icon a");
const sections = document.querySelectorAll("section");

turnOn.addEventListener("click",function(e){
    e.preventDefault();
    turnOn.classList.toggle("fa-fade")
    setTimeout(function(){
        sections.forEach(e=>{
        e.style.display = "none";
        })
        window.location.hash = "#starter";
        document.getElementById("starter").style.display = "flex";
        window.location.reload()
    },4000)
})


// ----------------------------------------------------
let win1= document.querySelector(".window-level-1")
let win2= document.querySelector(".window-level-2")
let win3= document.querySelector(".window-level-3")

document.querySelectorAll(".fa-circle-xmark").forEach(e=>{
    e.addEventListener("click",function(){
        let ele = e.parentElement.parentElement.parentElement;
        ele.classList.add("none");
        ele.parentElement.classList.add("none");
        document.querySelector(`li[data-level="${ele.id}"]`).classList.remove("active");
        if (ele.classList.contains("window-level-1")) {
            document.querySelectorAll(".folders-list li.folder").forEach(f=>{
            f.classList.remove("active")
            })
        }
        /*ele.parentElement.classList.add("none");*/
        /*
        while (true) {
            if (ele.classList.contains("window")) {
                e.style.display = "none";
            }
            else{
                console.log(e.classList);
                e=e.parentElement;
            }
        }
        */
    })
})

document.querySelectorAll(".folders-list li.folder").forEach(e=>{
        e.addEventListener("dblclick",function(){
        document.querySelectorAll(".folders-list li.folder").forEach(f=>{
            f.classList.remove("active")
        })
        e.classList.add("active");
        
        document.querySelectorAll(".folders-files-list-1 > li").forEach(f=>{
            f.classList.remove("active");
        })
        document.querySelectorAll(".folders-files-list-2 > li").forEach(f=>{
            f.classList.remove("active");
        })
        
        if((document.querySelector(`#${e.dataset.level}`)).classList.contains("none")){
            document.querySelectorAll(".windows").forEach(ws=>{
                if (!(ws.classList.contains("none"))){
                    ws.classList.add("none");
                }
                document.querySelectorAll(".window-level-2").forEach(w2=>{
                    if (!(w2.classList.contains("none"))) {
                        w2.classList.add("none")
                    }})
                    document.querySelectorAll(".window-level-3").forEach(w3=>{
                    if (!(w3.classList.contains("none"))) {
                        w3.classList.add("none")
                    }
                })
            })
            document.querySelector(`#${e.dataset.level}`).classList.remove("none")
            document.querySelector(`#${e.dataset.level} > .window-level-1`).classList.remove("none")
            
        }else{
            alert("Already Opened !!");
        }
        
    })
})
// Just For Test

// Level 1
document.querySelectorAll(`.folders-files-list-1 > li`).forEach(e=>{
    e.addEventListener("dblclick",function(){
        document.querySelectorAll(".folders-files-list-1 > li").forEach(f=>{
            f.classList.remove("active");
        })
        e.classList.add("active");
        document.querySelectorAll(".folders-files-list-2 > li").forEach(f=>{
            f.classList.remove("active");
        })
        document.querySelectorAll(".window-level-2 .window").forEach(w=>{
            w.classList.add("none");
        })
        document.querySelectorAll(".window-level-3 .window").forEach(w=>{
            w.classList.add("none");
        })
        
        document.querySelector(`#${e.dataset.level}`).classList.remove("none");
        document.querySelector(`#${e.dataset.level}`).parentElement.classList.remove("none");
    })
})
// Level 2
document.querySelectorAll(`.folders-files-list-2 > li`).forEach(e=>{
    e.addEventListener("dblclick",function(){
        document.querySelectorAll(".folders-files-list-2 > li").forEach(f=>{
            f.classList.remove("active");
        })
        e.classList.add("active");
        document.querySelectorAll(".window-level-3 .window").forEach(w=>{
            w.classList.add("none");
        })
        document.querySelector(`#${e.dataset.level}`).classList.remove("none");
        document.querySelector(`#${e.dataset.level}`).parentElement.classList.remove("none");
    })
})