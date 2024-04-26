import { findWinner } from 'https://unpkg.com/piskvorky@0.1.4';

let currentPlayer = 'circle';
const pole = document.querySelectorAll('.pole');

const chod = async (evt) => {
  const btn = evt.target;
  evt.preventDefault();
  evt.target.disabled = true;

  if (currentPlayer === 'circle') {
    currentPlayer = 'cross';
    btn.classList.add('board__field--circle');
  } else {
    currentPlayer = 'circle';
    btn.classList.add('board__field--cross');
  }

  const hraje = document.querySelector('.kolecko');
  if (currentPlayer === 'circle') {
    hraje.innerHTML = `<img src="images/circle.svg" alt="Hraje kolecko"/>`;
  } else {
    hraje.innerHTML = `<img src="images/cross.svg" alt="Hraje krizek"/>`;
  }

  let herniPole = [];
  let vysledek = null;
  pole.forEach((hodnota) => {
    if (hodnota.classList.contains('board__field--circle')) {
      vysledek = 'o';
    } else if (hodnota.classList.contains('board__field--cross')) {
      vysledek = 'x';
    } else {
      vysledek = '_';
    }
    herniPole.push(vysledek);
  });

  const vyhral = findWinner(herniPole);
  const KoleckoIsBest = () => {
    alert('Kolečko je borec!');
    location.reload();
  };
  const KrizekIsBest = () => {
    alert('X dobře ty! Kolečko se může jít klouzat');
    location.reload();
  };
  const noWinners = () => {
    alert('Smůla, nemáme vítěze, ani poraženého. Zkuste to znova');
    location.reload();
  };

  if (vyhral === 'o') {
    setTimeout(KoleckoIsBest, 160);
  } else if (vyhral === 'x') {
    setTimeout(KrizekIsBest, 160);
  } else if (vyhral === 'tie') {
    setTimeout(noWinners, 160);
  }

  if (vyhral === null && currentPlayer === 'cross') {
    console.log('krizek tu!');

    // const fields = document.querySelectorAll('.board__field');
    // const pole = document.querySelectorAll('.pole');

    const response = await fetch(
      'https://piskvorky.czechitas-podklady.cz/api/suggest-next-move',
      {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          board: herniPole,
          player: 'x', // Hledá tah pro křížek.
        }),
      },
    );
    const data = await response.json();
    const { x, y } = data.position; // x bude 0 a y bude 1, protože to je jediné volné políčko. x 0 odpovídá prvnímu sloupci a y 1 druhému řádku.
    const index = pole[x + y * 10]; // Najde políčko na příslušné pozici.
    index.click(); // Simuluje kliknutí. Spustí událost `click` na políčku.
  }

  // console.log(herniPole, findWinner(herniPole));
};

pole.forEach((button) => {
  button.addEventListener('click', chod);
});

document.querySelector('.button-znovu').addEventListener('click', (e) => {
  if (confirm('Opravdu chceš začít znovu?') == false) {
    e.preventDefault();
  } else {
  }
});
