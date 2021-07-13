function populateUFs() {
  const ufSelect = document.querySelector("select[name=uf]");

  fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then((res) => res.json())
    .then((states) => {
      for (const state of states) {
        ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`;
      }
    });
}
populateUFs();

function getCities(event) {
  const citySelect = document.querySelector("select[name=city]");
  const stateInput = document.querySelector("select[name=state]");

  const ufValue = event.target.value;

  const indexOfSelectedState = event.target.selectedIndex;
  stateInput.value = event.target.options[indexOfSelectedState].text;

  const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`;

  citySelect.innerHTML = "<option value>Selecione a cidade</option>";
  citySelect.disabled = true;

  fetch(url)
    .then((res) => res.json())
    .then((cities) => {
      for (const city of cities) {
        citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`;
      }

      citySelect.disabled = false;
    });
}

document.querySelector("select[name=uf]").addEventListener("change", getCities);

//itens de coleta

const ItensToCollect = document.querySelectorAll(".itens-grid li");

for (const item of ItensToCollect) {
  item.addEventListener("click", handleSelectdItem);
}

let selectedItens = [];

function handleSelectdItem(event) {
  const itemLi = event.target;

  itemLi.classList.toggle("selected");

  const itemId = event.target.dataset.id;

  //verificando se existe itens selecionados e pegar
  const alreadySelected = selectedItens.findIndex(function (item) {
    const itemFound = item == itemId;
    return itemFound;
  });

  //se selecionbado, tirar
  //se não, add seleção
  //atualizar camp escondido  com itens selecionados
}
