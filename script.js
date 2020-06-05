const cards = document.querySelectorAll('.card');
const dropzones = document.querySelectorAll('.dropzone');
const firstDropzone = dropzones[0];
const buttonAddCard = document.querySelector('button');
const divCreateCard = document.getElementById('create-card');
const buttonCloseCreateCard = document.getElementById('close-create-card');
const formCreateNewCard = document.querySelector('form');

cards.forEach(card => {
   card.draggable = true;
   card.addEventListener('dragstart', dragstart);//when start drag
   card.addEventListener('drag', drag);//when drag
   card.addEventListener('dragend', dragend);//when stop drag
   card.addEventListener('dblclick', deleteCard);

});


function dragstart(){
   dropzones.forEach(dropzone => dropzone.classList.add('highlight'));

   this.classList.add('is-dragging');
}

function drag(){

}

function dragend(){
   dropzones.forEach(dropzone => dropzone.classList.remove('highlight'));

   this.classList.remove('is-dragging');

}

function deleteCard(){
   this.classList = '';
   this.innerHTML = '';
}

//place where drop the cards
dropzones.forEach(dropzone => {
   dropzone.addEventListener('dragenter', dragenter);//when enter in dropzone
   dropzone.addEventListener('dragover', dragover);//when is over the dropzone
   dropzone.addEventListener('dragleave', dragleave);//when leave the dropzone
   dropzone.addEventListener('drop', drop);//when drop something in dropzone
});

function dragenter(){
}

function dragover(){
   this.classList.add('over');

   const cardBeingDragged = document.querySelector('.is-dragging');

   this.appendChild(cardBeingDragged);

}

function dragleave(){
   this.classList.remove('over');
}

function drop(){
   this.classList.remove('over');
}

//------------------------------Upgrade-----------------------

buttonAddCard.addEventListener('click', () => {
   divCreateCard.style.display = 'block';
});

buttonCloseCreateCard.addEventListener('click', () => {
   divCreateCard.style.display = 'none';

});

formCreateNewCard.addEventListener('submit', e => {
   e.preventDefault();

   const newCard = {};

   [...formCreateNewCard.elements].forEach(element => {
      if(element.value){
         if(element.name === 'task'){
            newCard[element.name] = element.value;
         };
         if(element.checked){
            newCard['statusColor'] = element.value;
         }
      }
   });

   addNewCard(newCard);
   
   
});

function addNewCard(info){
   let div = document.createElement('div');

   div.classList = 'card';

   div.draggable = true;

   div.innerHTML = `
      <div class="status ${info.statusColor} "></div>
      <div class="content">${info.task}</div>
   `;

   div.addEventListener('dragstart', dragstart);//when start drag
   div.addEventListener('drag', drag);//when drag
   div.addEventListener('dragend', dragend);//when stop drag
   div.addEventListener('dblclick', deleteCard);//delete card
   

   firstDropzone.appendChild(div);

   buttonCloseCreateCard.click();
}
