'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModel = document.querySelector('.close-modal');
const btnsOpenModel = document.querySelectorAll('.show-modal');

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

//loop for 3 buttons which on clicked will open the modal
for (let i = 0; i < btnsOpenModel.length; i++)
  btnsOpenModel[i].addEventListener('click', openModal);

overlay.addEventListener('click', closeModal);
btnCloseModel.addEventListener('click', closeModal);

//on-click on Esc button close the modal window
//keydown is event which listen to each keydown means when we press any key
document.addEventListener('keydown', function (event) {
  console.log(event.key);
  if (event.key == 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
