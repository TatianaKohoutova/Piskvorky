console.log('funguji!');

let currentPlayer = 'circle';

const chod = (evt) => {
  const btn = evt.target;
  evt.preventDefault();
  // btn.classList.add('board__field--circle');
  evt.target.disabled = true;

  if (currentPlayer === 'circle') {
    currentPlayer = 'cross';
    btn.classList.add('board__field--circle');
  } else {
    currentPlayer = 'circle';
    btn.classList.add('board__field--cross');
  }

  if (currentPlayer === 'circle') {
    const hraje = document.querySelector('.kolecko');
    hraje.innerHTML = `<img src="images/circle.svg" alt="Hraje kolecko"/>`;
  } else {
    const hraje = document.querySelector('.kolecko');
    hraje.innerHTML = `<img src="images/cross.svg" alt="Hraje krizek"/>`;
  }
};

const pole = document.querySelectorAll('.pole');
pole.forEach((button) => {
  button.addEventListener('click', chod);
});

// Může se stát, že uživatel se omylem uklikne a modrým tlačítkem pro restart přijde o rozehranou hru. Proto přidej modrému odkazu posluchač události, který se po kliknutí uživatele zeptá zabudovanou funcí confirm, jestli chce hru opravdu restartovat. Pokud ne, zavolej event.preventDefault(), čímž zabráníš tomu, aby prohlížeč přešel na odkazovanou stránku (tj. načetl stránku s prázdnou hrou). Funkce confirm vrací true nebo false podle toho, zda uživatel souhlasil nebo nesouhlasil s potvrzovací zprávou v dialogu.

// const confirm = () => {
//   // const znovu = e.target;
//   confirm('Opravdu chceš začít znovu?');
// };

document.querySelector('.button-znovu').addEventListener('click', (e) => {
  // confirm('Opravdu chceš začít znovu?');
  if (confirm('Opravdu chceš začít znovu?') == false) {
    e.preventDefault();
  } else {
  }
});

// if (confirm == true) {
//   let otazka = (e) => {
//     e.preventDefault();
//   };
// }

// form.addEventListener('submit', (e) => {
//   if (fname.value === '' || lname.value === '') {
//     e.preventDefault();
//     para.textContent = 'You need to fill in both names!';
//   }
// });
// let otazka = (e) => {
//   if (confirm('Opravdu chceš začít znovu?') == true) {
//     e.target.preventDefault();
//   }
// };
