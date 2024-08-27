let input = document.querySelector(".input");
let submit  = document.querySelector(".add");
let tasksDiv = document.querySelector(".tasks");





//empty array to store the tasks
//انشاء ارراي فارغه لاضافه البيانات فيها 
let arryOfTasks = [];

//Check if Theres Tasks in Local Storage Function 
if (localStorage.getItem("tasks")){
    arryOfTasks = JSON.parse(localStorage.getItem("tasks"))

}
 
//trigger get Data From Local Storeg Function 
getDataFromLocalStoreg()

//Add Task

submit.onclick = function(){
    if(input.value !== ""){//هنا بقول في الشرط ده لو ظرار ال انبت مش فاضي حققلي الشرط الي انا هكتبوا انما لو فاضي مش هيشتغل 
       addTaskToArray(input.value);//Add task to Array of Taskes
       input.value = "" ; //Empty input value 

    }
}




// Click  on Task element 

tasksDiv.addEventListener("click" , (e) =>{
      if(e.target.classList.contains("del")){

      // remove task from local Storage
      deleteTaskWithlocalstorage(e.target.parentElement.getAttribute("data-id"))

       //1- remove element from page 
       e.target.parentElement.remove();
      }

      //Task Element
      if (e.target.classList.contains("task")){
        //toggle completed for the task
        toggleStatusTaskWith(e.target.getAttribute("data-id"))        
   
        //Toggle done class
       e.target.classList.toggle("done")
    }
})


function addTaskToArray(taskText){
//Task Data 
const task ={
    id: Date.now(),
    title: taskText,
    completed: false,
}
 //Push Task To Array OF tasks 
arryOfTasks.push(task)
//console.log(arryOfTasks)



//Add Tasks To page  
addElementToPageFrom(arryOfTasks);

//ADD Tasks To local Storege
addDataToLocalStoregFrom(arryOfTasks);

};

function addElementToPageFrom(arryOfTasks){
//1-empyte the tasks div 
tasksDiv.innerHTML ="" ;

//2- looping on Arry of Tasks
arryOfTasks.forEach((task) => {

    //Creat min Div 
    let div = document.createElement("div");
    div.className = "task";

    //Chek if Task is done 
     if(task.completed == true){
        div.className = "task done";
     }

    div.setAttribute("data-id" , task.id);
    div.appendChild(document.createTextNode(task.title ))
   // console.log(div)

   // Creat Delete button delete
   let span = document.createElement("span")
   span.className= "del";
     span.appendChild(document.createTextNode("Dlete")); 

     // Abbend Button To Main Div 
     div.appendChild(span);
   //  console.log(div)
   //aDD tASK DIV TO tASKS cONTAINER 
   tasksDiv.appendChild(div); 
});
}

function addDataToLocalStoregFrom(arryOfTasks){
window.localStorage.setItem("tasks",JSON.stringify(arryOfTasks));
}

function getDataFromLocalStoreg(){
    let data = window.localStorage.getItem("tasks");
    if(data){
        let tasks = JSON.parse(data);
        addElementToPageFrom(tasks )
         
    }
}
function deleteTaskWithlocalstorage(taskId){
    // For Explain only
//    for(let i = 0 ;  i< arryOfTasks.length ; i++){
  //  console.log(`${arryOfTasks[i].id}=== ${taskId}`)
//}

// start filter
arryOfTasks =  arryOfTasks.filter((task) => task.id != taskId);

//After filter add data to local storage
addDataToLocalStoregFrom(arryOfTasks);
}

function toggleStatusTaskWith(taskId){
    //For Explain only
  for(let i = 0 ;  i< arryOfTasks.length ; i++){
    if(arryOfTasks[i].id === taskId){
        arryOfTasks[i].id.completed == false ?  (arryOfTasks[i].id.completed == true) :   (arryOfTasks[i].id.completed = false);
    }
}
addDataToLocalStoregFrom(arryOfTasks);

}


//language
/**start select Translation 
  ترجمه الموقع بطريقه حديثه الناقص لازم ملفين jsonواحد للعربي وواحد للانجليزي  وبعمل داتا لانج واحطها في العناصر 
 * 
*/
const elements = document.querySelectorAll("[data-lang]");
const selectLang = document.getElementById("select_lang");

function changeLang(lang ='en') {
  fetch(`./jason/${lang}.jason`)
    .then((r) => r.json())
    .then((data) => {
      if (data) {
        document.body.parentElement.lang = lang;
        localStorage.setItem("lang", lang);
        elements.forEach(ele => {
            ele.innerHTML = data[ele.getAttribute("data-lang")];
        
        });
      }
    })
    .catch((error) => console.error(error));

 
  selectLang.querySelector(`[value=${lang}]`).setAttribute("selected", "");
  document.body.dir = lang == "ar" ? "rtl" : "ltr";
}

selectLang.addEventListener("change", e => {
  changeLang(e.target.children[e.target.selectedIndex].value);
});

addEventListener("load", () => {
  changeLang(localStorage.getItem("lang") && localStorage.getItem("lang") );
 
});

/**End select Translation */
