

var taskInput=document.getElementById("new-task");//Add a new task.
var addButton=document.getElementsByTagName("button")[0];//first button
var incompleteTaskHolder=document.getElementById("incomplete-tasks");//ul of #incomplete-tasks

//New task list item
var createNewTaskElement=function(taskString){

	var listItem=document.createElement("li");

	//input (checkbox)
	var checkBox=document.createElement("input");//checkbx
	//label
	var label=document.createElement("label");//label
	//input (text)
	//button.edit
	

	//button.delete
	var deleteButton=document.createElement("button");//delete button

	label.innerText=taskString;

	//Each elements, needs appending
	checkBox.type="checkbox";
	deleteButton.innerText="Delete";
	deleteButton.className="delete";



	//and appending.
	listItem.appendChild(checkBox);
	listItem.appendChild(label);
	
	listItem.appendChild(deleteButton);
	return listItem;
}



var addTask=function(){
	console.log("Add Task...");
	//Create a new list item with the text from the #new-task:
	var listItem=createNewTaskElement(taskInput.value);

	//Append listItem to incompleteTaskHolder
	incompleteTaskHolder.appendChild(listItem);

	taskInput.value="";

}
//Edit an existing task.


$(function() {
	$('#more').on('click', function(event) {
	  event.preventDefault();
	
	  const task = {
		todoName: $('#new-task').val().trim()
	  };
	
  
	  $.post('/add/todo', task, function(res){
		 todoRender(res);
	  });
	  $('#new-task').val('');
	  $('#new-task').focus();
  
	});
	
  })

  function todoRender(todonList) {
	$('#incomplete-tasks').empty();
	todonList.forEach((e, index)=>{
	  const todoTag = $('<li>');
	  const checkedbox = $('<input type="checkbox"/>');
	  todoTag.text(e.todoName);
	  const button = $('<i type="submit" id="delete" class="fas fa-times"></i>');
	  button.addClass('delete');
	  addEventListener(button);
	  
	  todoTag.append(checkedbox);
	  todoTag.append(button);
	  $('#incomplete-tasks').append(todoTag);
	  
	})
}


//Delete task.
var deleteTask=function(){
		console.log("Delete Task...");

		var listItem=this.parentNode;
		var ul=listItem.parentNode;
		//Remove the parent list item from the ul.
		ul.removeChild(listItem);

}




var taskIncomplete=function(){
		console.log("Incomplete Task...");
//Mark task as incomplete.
	//When the checkbox is unchecked
		//Append the task list item to the #incomplete-tasks.
		var listItem=this.parentNode;
	incompleteTaskHolder.appendChild(listItem);
}



var ajaxRequest=function(){
	console.log("AJAX Request");
}

//The glue to hold it all together.


//Set the click handler to the addTask function.
addButton.addEventListener("click",addTask);
addButton.addEventListener("click",ajaxRequest);


var bindTaskEvents=function(taskListItem,checkBoxEventHandler){
	console.log("bind list item events");
//select ListItems children
	var checkBox=taskListItem.querySelector("input[type=checkbox]");
	
	var deleteButton=taskListItem.querySelector("button.delete");


			//Bind editTask to edit button.
			
			//Bind deleteTask to delete button.
			deleteButton.onclick=deleteTask;
			//Bind taskCompleted to checkBoxEventHandler.
			checkBox.onchange=checkBoxEventHandler;
}

//cycle over incompleteTaskHolder ul list items
	//for each list item
	for (var i=0; i<incompleteTaskHolder.children.length;i++){


		//bind events to list items chldren(tasksCompleted)
		bindTaskEvents(incompleteTaskHolder.children[i],taskCompleted);
	};


