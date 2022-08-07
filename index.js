const savetabbtn=document.querySelector(".header .savetab-btn")
const deleteBtn = document.getElementById("delete-btn")
const ulLi=document.querySelector(".content .ul-li")
const cnt=document.querySelector(".cnt")

const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")

let mylinks=[]
let localStoragelinks=JSON.parse(localStorage.getItem("mylinks"))
let count=0;

if(localStoragelinks){
mylinks=localStoragelinks
render(mylinks)
}



savetabbtn.addEventListener("click",function(){
    chrome.tabs.query({active:true,currentWindow: true},function(tabs){
    if(mylinks.indexOf(tabs[0].url) === -1){
    mylinks.push(tabs[0].url)
    localStorage.setItem("mylinks", JSON.stringify(mylinks) )        
    render(mylinks)
    }
    })
})


function render(links){
    let link=""
    for(let i=0;i<links.length;i++){
    link+= `
            <li>
            <i class="material-icons del-btn" style="display:none;font-size:15px;margin-right:10px; cursor: -webkit-grab; cursor: grab;"  >delete</i>

            <a target='_blank' href='${links[i]}'>
                ${links[i]}
            </a>
            </li>
            `
    }
    ulLi.innerHTML=link
    count=links?links.length:0
    cnt.textContent=count;

}


deleteBtn.addEventListener("click",function(){
    localStorage.clear()
    mylinks=[]
    count=0;
    render(mylinks)
})

inputBtn.addEventListener("click", function() {
    if(mylinks.indexOf(inputEl.value) === -1){
    mylinks.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("mylinks", JSON.stringify(mylinks) )
    render(mylinks)
    }
})




function del(a){
    var p=a.parentNode
    let ind=GetIndex(p)
    mylinks.splice(ind,1)
    localStorage.clear()
    let t=JSON.stringify(mylinks)
    count--
    localStorage.setItem("mylinks",t)
    render(mylinks)
}

let delBtn=document.querySelector(".del-btn");
if(delBtn==null){
    console.log("It is null")
}
else{
    delBtn.addEventListener("click",function(){
        del(this)
    })
}
    


function GetIndex(sender)
{   
    var aElements = ulLi.getElementsByTagName("li") ;
    var aElementsLength = aElements.length;

    var index;
    for (var i = 0; i < aElementsLength; i++)
    {
        if (aElements[i] == sender)
        {
            index = i;
            return index;
        }
    }
}


