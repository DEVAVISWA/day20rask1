let form = document.getElementById('dictform');
let wordInput = document.getElementById('wordinput');
let wordInfo = document.getElementById('meaningforward');

async function getMeaning(word) {
    try {        
        let response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);

        let data = await response.json();
        console.log(data);       
        let meanings = data[0].meanings;
        let paragraph = document.createElement('div');
        let list = document.createElement('ul');
        list.style.listStyleType = 'none';

        for (let partOfSpeech of meanings) {  
            let listItem = document.createElement('li');
            listItem.innerHTML = `PartOfSpeech: <b>${partOfSpeech.partOfSpeech}</b>`;
            let subList = document.createElement('ol');

            for (let definition of partOfSpeech.definitions) {
                let subListItem = document.createElement('li');
                subListItem.innerHTML = `${definition.definition}`;
                subList.appendChild(subListItem);
            }
            listItem.appendChild(subList);
            list.appendChild(listItem);
        }        
        wordInfo.innerHTML = ``;
        paragraph.innerHTML = `Word: <b>${data[0].word}</b>`;

        wordInfo.appendChild(paragraph);
        wordInfo.appendChild(list);


    } catch (error) {
        console.log('error fetching the meaning', error);
    }
}


form.addEventListener('submit', (event) => {
    event.preventDefault();
    let word = wordInput.value;
    getMeaning(word);
});

let buttonSearch = document.getElementById('buttonSearch');

buttonSearch.addEventListener('click', (event) => {
    event.preventDefault();
    let word = wordInput.value;
    getMeaning(word);
});