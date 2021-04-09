const newTask = document.querySelector('.input-gorev');
const newTaskAddBtn = document.querySelector('.btn-gorev-ekle');
const taskList = document.querySelector('.gorev-listesi');

newTaskAddBtn.addEventListener('click', addTask); // Add Task 
taskList.addEventListener('click', taskDeleteComplete); // Complete && Delete Task
document.addEventListener('DOMContentLoaded', localStorageRead); // Read localStorage


function taskDeleteComplete(e) {
    const clickedElement = e.target;
    
    //If the 'completed' button is clicked..
    if (clickedElement.classList.contains('gorev-btn-tamamlandi')) {
       
        clickedElement.parentElement.classList.toggle('gorev-tamamlandi');
        alertify.message('İşlem Başarılı.');
    }
    
    //If the 'delete' button is clicked..
    if (clickedElement.classList.contains('gorev-btn-sil')) {
        
            
            // toggle = delete if any, add if not.
            clickedElement.parentElement.classList.toggle('kaybol'); //delete button click effect.
            const deletedTask = clickedElement.parentElement.children[0].innerText;
            
            localStorageDelete(deletedTask);
            
            // transitionend = activate after animation ends
            clickedElement.parentElement.addEventListener('transitionend', function () {
                clickedElement.parentElement.remove();
            });
        
            alertify
            .alert("Silme İşlemi Başarılı.", function(){
              alertify.warning('Silindi !');
            });
          
       
    
    }
}


function addTask(e) {
    e.preventDefault();

    if (newTask.value.length > 0) {
        createTaskItem(newTask.value);
        //save to localstorage
        localStorageSave(newTask.value);
        newTask.value = '';
        alertify.success('Eklendi !');

        
    } else {
        alertify.alert("Bu alan boş geçilemez.", function(){
        alertify.error('Hatalı giriş!');
    });
    }
    
}

function localStorageConvertToArray() {
    let gorevler;

    if (localStorage.getItem('gorevler') === null) {
        gorevler = [];
    } else {
        gorevler = JSON.parse(localStorage.getItem('gorevler'));
    }

    return gorevler;
}

function localStorageSave(newTask) {
    let gorevler = localStorageConvertToArray();
    gorevler.push(newTask);
    localStorage.setItem('gorevler', JSON.stringify(gorevler));
}

function localStorageRead() {
    let gorevler = localStorageConvertToArray();

    gorevler.forEach(function (task) {
        createTaskItem(task);
    });
}

function createTaskItem(task) {
     //create div
     const gorevDiv = document.createElement('div');
     gorevDiv.classList.add('gorev-item');
     
     //create li
     const gorevLi = document.createElement('li');
     gorevLi.classList.add('gorev-tanim');
     gorevLi.innerText = task;
     gorevDiv.appendChild(gorevLi);
 
     //create 'complete' button
     const gorevTamamBtn = document.createElement('button');
     gorevTamamBtn.classList.add('gorev-btn');
     gorevTamamBtn.classList.add('gorev-btn-tamamlandi');
     gorevTamamBtn.innerHTML = '<i class="far fa-check-square"></i>';
     gorevDiv.appendChild(gorevTamamBtn);
 
     //create 'delete' button
     const gorevSilBtn = document.createElement('button');
     gorevSilBtn.classList.add('gorev-btn');
     gorevSilBtn.classList.add('gorev-btn-sil');
     gorevSilBtn.innerHTML = '<i class="far fa-trash-alt"></i>';
     gorevDiv.appendChild(gorevSilBtn);
 
     //add div to ul
     taskList.appendChild(gorevDiv);
}

function localStorageDelete(task) {
    let gorevler = localStorageConvertToArray();

    //delete item with splice
    const deletedElemanIndex = gorevler.indexOf(task);
    console.log(deletedElemanIndex);
    gorevler.splice(deletedElemanIndex, 1);

    localStorage.setItem('gorevler', JSON.stringify(gorevler));

    
}