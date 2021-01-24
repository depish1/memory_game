import { Game } from "./Game.js";

const modal = document.querySelector('.modal');
const modalButton = document.querySelector('.modal__start');

modalButton.addEventListener('click', ()=>{
    const game = new Game(modal, modalButton);
})
 




