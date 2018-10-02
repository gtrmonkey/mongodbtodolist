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
  getList();
  function getList() {
    $.get('/todo', function (req, res) {
      res.forEach((e, index) => {
        console.log(e + "   " + index);
        const todoTag = $('<li>');
        const checkedbox = $('<input type="checkbox"/>');
        todoTag.text(e.ListName);
        const button = $('<i type="submit" id="delete" class="fas fa-times"></i>');
        button.addClass('delete');
        button.attr('data-index', index);
  
        todoTag.append(checkedbox);
        todoTag.append(button);
  
        _addEventListener(button);
        $('#incomplete-tasks').append(todoTag);
  
      })
  
    });
  }
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

function addEventListener(button){
 let parent = $(button).parent();
 console.log(parent);
 let text = parent.text();
 console.log(text);
  $(button).on('click', function(){
     let deleteThis = {
        todoName: text
      }
    
     $.post('/delete/todo', deleteThis, function(data){
        todoRender(data);
     });
  });

}