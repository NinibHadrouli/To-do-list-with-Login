
let divContainerElement=(
    ` <h2 id="UName">User name</h2>
     <h2 >My Name</h2>
      
        <i id="edit" class="fa fa-edit"></i>

        <a href="#"><input id="btnLogOut" type="button" value="Log out"></a>
        <h1 id="titleName">To-do list</h1>
        <div class="listProp">
        <input id="inNewLisNa" type="text" placeholder=" Insert new list name" >
        
        <i id="btnNewList" class="fa fa-plus-square" title="Add new list"></i>
        <br>
        </div>
    
`
);
let divAllList1=(
`
    <form>
        <label class="listName" id=listNameLab>List name:</label>
        <h2 class="listName" id=listName>List name</h2>
        <br>
        <input id="inputItem" type="text" placeholder="Insert item">

        <i id="btnAdd" class="fa fa-plus-square" title="Add to list"></i>
        <p id="wrongMessage">Wrong input</p>
     </form> 
     <div class="card">
        <table class="table">
            <tr class="ElemnetName">
                <th id="Number">Number</th>
                <th id="name">Name</th>
               
            </tr>
            <!-- <tr >
                <td class="ElemnetData" id="numData">ggggggg</td>
                <td class="ElemnetData" id="textData">bbbbbb
                    <i class="fa fa-pencil textData mOver" aria-hidden="true"></i>
                    <i class="fa fa-trash-o mOverDel" aria-hidden="true"></i>
            </tr> -->
         
        </table>
     </div>
 `
);
let ulNewList;

let divAlluserLists=(
    `  <label>All lists</label> 
    <ul id="ulList">
      
    </ul>

`
);

function setItemsInDiv(){
    document.querySelector(".container").innerHTML=divContainerElement;
    document.querySelector(".allUserLists").innerHTML=divAlluserLists;
    document.querySelector(".allList1").innerHTML=divAllList1;
    
};
setItemsInDiv();

document.body.addEventListener("load", checkNoUsers);
function checkNoUsers(){
    if(sessionStorage.getItem("userEmail")==null){
        
        window.location.href ="register.html";
    }
}
var userEmail=sessionStorage.getItem("userEmail");
let userName=document.getElementById("UName");
userName.innerText=userEmail;


let btnLogOut=document.getElementById("btnLogOut");
btnLogOut.addEventListener("click",logOut);
function logOut(){
    
    sessionStorage.setItem("edit",false);
    window.location.href ="register.html";
};

let editIcon=document.getElementById("edit");
editIcon.addEventListener("click",changeProp);
function changeProp(){
    sessionStorage.setItem("edit",true);
    window.location.href ="register.html";
};


document.body.addEventListener("load", hidePage);
function hidePage(){
    if (userName.innerText==="") {
       
        document.body.style.visibility="hidden";
         
          window.location.href ="register.html";
          
    }

}



let newListName=document.getElementById("inNewLisNa");
document.getElementById("inNewLisNa").addEventListener("keyup",checkEmpty);


function checkEmpty(e){
    
    
    if (e.target.value===" ") {
        alert("First letter is empty..");
        e.target.value="";
    }
   
}

let listName=document.getElementById("listName");

if (listName.innerText==="List name") {
    listName.style.backgroundColor="white";
    document.querySelector(".allList1").style.display="none";
    
}

let btnNewList=document.getElementById("btnNewList");


btnNewList.addEventListener("click",AddNewList);

let pValue=document.getElementById("wrongMessage");

let btnAddInput=document.getElementById("btnAdd");

let btnAddInput2=document.getElementById("btnAdd2");


let input=document.getElementById("inputItem");
input.addEventListener("focus" ,function(){
    pValue.style.visibility="hidden";
    input.value=null;
})
btnAddInput.addEventListener("click",btnAdd);
var counter=1;
function showElementList(){
    listName.innerText= document.getElementById("inNewLisNa").value;
    document.querySelector(".allList1").style.display="block";
    document.getElementById("inNewLisNa").value="";
    
   
    listName.style.backgroundColor= "rgb(224, 148, 61)";
};

function AddNewList(){
   
    if(newListName.value==""){
        alert("The list name is empty input..")
    }
    else{
    message=confirm("Do you want add new list ?");
    if (message==true) {
        
       
        addNewListLi(newListName.value);

        showElementList();
        
    }else{
        document.getElementById("inNewLisNa").value="";
    }

    }
    
};
let userListName={};
let userListInStorage=userEmail;

function addListToStorge(){
    
};
let checkElementInList=false;
function btnAdd(){
    
    const inputValue=document.getElementById("inputItem").value;
    
    let items;
    let checkDouble=true;
    
    if (!isNaN(inputValue)) {
        
        pValue.style.visibility="visible";
           
    }
    else{
///////////////////////////////////////////for test
        let userListInStorage=userEmail;
    
     userListName={name:listName.innerText,elements:[inputValue]};
     
     if(localStorage.getItem(userListInStorage)===null){
       
        userListInStorage=[];
        
      }else{
          userListInStorage=JSON.parse(localStorage.getItem(userListInStorage));
          checkElementInList=false;
       for (let i = 0; i < userListInStorage.length; i++) {
           let listan = userListInStorage[i];
          
          
           if(listan.name===document.getElementById("listName").innerText){
           
            listan.elements.push(inputValue);
            checkElementInList=true;
        }
       }      
    };
    
  
    if(checkElementInList===false){
      
    
        userListInStorage.push(userListName);
    }
    
  
    localStorage.setItem(userEmail,JSON.stringify(userListInStorage)); 

///////////////////////////////////////////////////////////////

         // كود من اجل وضع العنصر المدخل في القائمة بدون التخزين في الداتا
         
         setItemIlist(inputValue);
}
};
function setItemIlist(value){
    let allTableData=document.querySelector(".table");
    

    let trCreate=document.createElement("tr");

     let tdNumnber=document.createElement("td");
     let tdData=document.createElement("td");

     tdNumnber.className="ElemnetData";
     tdNumnber.className+=" ElemnetNumber";
     tdData.className="ElemnetData";
     var textnode = document.createTextNode(value);
     tdData.appendChild(textnode);

     let newi=document.createElement("i");
     //newi.className="fa fa-pencil ";
     newi.className="textData ";
     newi.className+="mOver";
     

     tdData.appendChild(newi);
     
     let newi2=document.createElement("i");
     newi2.className="fa fa-trash-o ";
     newi2.className+="mOverDel ";
     newi2.className+="textData ";
     newi2.className+="elemetList";
     tdData.appendChild(newi2);
     
   

     var numnode = document.createTextNode(counter);

     tdNumnber.appendChild(numnode);

    trCreate.appendChild(tdNumnber);
    trCreate.appendChild(tdData);

     allTableData.appendChild(trCreate);
     counter++;
    document.getElementById("inputItem").value=null; 

    let allElementData=document.querySelectorAll(".elemetList");
  
    allElementData.forEach(element=>{
       element.addEventListener("click",deleteListElement);
       
    });
    addEventCilckLine();
};
//******* Add new list to all list *********//
let ul=document.querySelector("#ulList");
function addNewListLi(inputValue){
    let newLi=document.createElement("li");
    let newLiI=document.createElement("i");
    
    newLiI.className="fa fa-trash-o ";
    newLiI.className+="textData ";
    newLiI.className+="mOverDel ";
    newLiI.className+="iconProp ";

   
    
    newLi.innerText= inputValue;
    ul.appendChild(newLiI);
    ul.appendChild(newLi);

/// Add eventListner to new element
let allDeleteIcone= document.querySelectorAll(".iconProp");
allDeleteIcone.forEach(icone =>{
icone.addEventListener("click",deleteList);
});
/////////

showNewList();

}

function showNewList(){
        let allTableData=document.querySelectorAll(".ElemnetData");
        allTableData.forEach(element=> {
            
            element.parentElement.remove();// for do the counter 1
        });
        counter=1;
    }
function addEventCilckLine(){
    
        let allTableData=document.querySelectorAll(".ElemnetData");
       console.log(allTableData);
        allTableData.forEach(element=> {
            element.addEventListener("click",lineThrough);
        });
      
    }
    let textDekor=false;
function lineThrough(e){
    if(!textDekor){
        textDekor=true;
    e.target.parentElement.style.textDecoration = "line-through";
    e.target.style.textDecoration = "line-through";
    return;
    }
    if(textDekor){
        textDekor=false;
        e.target.parentElement.style.textDecoration = "none";
        e.target.style.textDecoration = "none"; 
        return;
    }
    };

ul.addEventListener("click",openList);
function openList(e){
    
    console.log(e.target);
    if(e.target.tagName==="LI"){
        
        showNewList();
        addEventCilckLine();  
        showElementList();
        listName.innerText= e.target.innerText;  

        for (let i = 0; i < localStorage.length; i++) {
            const elementInStore = localStorage;
            const elementInStoreKey = localStorage.key([i]);
            if(elementInStoreKey===userEmail){
             let UserAllList =JSON.parse(localStorage.getItem(elementInStoreKey));
             UserAllList.forEach(element => {
                
                if(element.name===listName.innerText){
                    element.elements.forEach(itemName => {
                        
                        setItemIlist(itemName);
                    });
                }
             });
               
            };
            
         }
         let allElementData=document.querySelectorAll(".elemetList");
       
         allElementData.forEach(element=>{
            element.addEventListener("click",deleteListElement);
            
         });
    }
    addEventCilckLine();
};

function loadUserLists(){
    
   
   for (let i = 0; i < localStorage.length; i++) {
       const elementInStore = localStorage;
       const elementInStoreKey = localStorage.key([i]);
       if(elementInStoreKey===userEmail){
        let UserAllList =JSON.parse(localStorage.getItem(elementInStoreKey));
        UserAllList.forEach(element => {
            addNewListLi(element.name);
            
        });
          
       };
       
    }
           
};
loadUserLists();

let allDeleteIcone= document.querySelectorAll(".iconProp");
allDeleteIcone.forEach(icone =>{
icone.addEventListener("click",deleteList);
});
const usersAllInStore1 = JSON.parse(localStorage.getItem("usersAll"));
   
   const elementInStore1 = localStorage;
function deleteList(e){
    messageDelete=confirm("Do you want Delete the list ?");
    if(messageDelete){
   
    let listNameOnClick=e.target.nextSibling.innerText;

    /////Remove list from list user in the storage
    for (let i = 0; i < localStorage.length; i++) {
        
        const usersAllInStorage = elementInStore1.key([i]);//Access to usersAll name in the storage
        let UserAllList=JSON.parse(localStorage.getItem(usersAllInStorage));;
            
        if(usersAllInStorage===userEmail){
            console.log(UserAllList);
          UserAllList =JSON.parse(localStorage.getItem(usersAllInStorage));
             for (let index = 0; index < UserAllList.length; index++) {
                    const element = UserAllList[index];
                    let indexIn=index
                    
                    if(UserAllList[index].name===listNameOnClick){
                       
                        UserAllList.splice(index, 1);
                       
                    }
                    localStorage.setItem(usersAllInStorage.toString(),JSON.stringify(UserAllList));
                }
            }
        }
    /////////////////////////////////////

    e.target.nextSibling.remove();
    e.target.remove();
    
    }
};
function deleteListElement(e){
   
    elementNum=e.target.parentElement.parentElement.firstChild.textContent;
    e.target.parentElement.parentElement.remove();
    
    let lisCounter=1;
    let ElemnetNumber =document.querySelectorAll(".ElemnetNumber");
    ElemnetNumber.forEach(elNum => {
        elNum.textContent=lisCounter;
        lisCounter++;
        
    });
     
    counter=ElemnetNumber.length+1;

   // Delete element's list from Storge
   const usersAllInStore = JSON.parse(localStorage.getItem("usersAll"));
   
   const elementInStore = localStorage;
   
    for (let i = 0; i < localStorage.length; i++) {
        
        
        
        const usersAllInStorage = elementInStore.key([i]);//Access to usersAll name in the storage
        let UserAllList=JSON.parse(localStorage.getItem(usersAllInStorage));;
      
        
        if(usersAllInStorage===userEmail){
          
          UserAllList =JSON.parse(localStorage.getItem(usersAllInStorage));
             for (let index = 0; index < UserAllList.length; index++) {
                 const element = UserAllList[index];
                    let indexIn=index
                   
                    let inListEl= element.elements;
                  
                 if(UserAllList[index].name===listName.innerText){
                    for (let index = 0; index < inListEl.length; index++) {
                       const element = inListEl[index];
                        
                        if(index==elementNum-1){                             
                                inListEl.splice(index, 1);                           
                   }                 
                 }
        }
            localStorage.setItem(usersAllInStorage.toString(),JSON.stringify(UserAllList));
         }

        }else{

            localStorage.setItem(usersAllInStorage.toString(),JSON.stringify(UserAllList));
        };
       
       localStorage.setItem("usersAll",JSON.stringify(usersAllInStore));
     }
};


//****************** End Register code************************************* */
