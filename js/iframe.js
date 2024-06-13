let change_iframe_content = (e) => {
    // contentWindow Property - 
    // Returns Window Object
    const frames = document.getElementsByClassName("frame");

    // Accessing document -> 
    // div -> Changing InnerHTML
    [...frames].forEach(win =>{
        win.contentDocument.querySelectorAll(`.iframe-section`).forEach(sec => {
            sec.classList.contains(`${e.dataset.level}-section`) ? sec.classList.remove("none") : sec.classList.add("none");
        })
    })
}

document.querySelectorAll(`.folders-files-list-1 > li`).forEach(e=>{
    e.addEventListener("dblclick",function(){
        change_iframe_content(e);
    })
})

document.querySelectorAll(`.folders-files-list-2 > li`).forEach(e=>{
    e.addEventListener("dblclick",function(){
        change_iframe_content(e);
    })
})

