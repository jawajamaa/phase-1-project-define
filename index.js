document.addEventListener("DOMContentLoaded", () => {
    const baseUrl = "http://localhost:3000/";
    let wordId = "words";

    // /////////////////////////////////////////////////////////////////////
    // Global variables for rendering definitions
    let mainMiddle = document.getElementById("word-and-definition");
    let mainRight = document.getElementById("word-comparison");
    let compWordDefCard = document.querySelector("#word-comparison").querySelector(".card");
    let word = document.createElement("h3");
    let partSpeech = document.createElement("p");
    let definition = document.createElement("p");
    let synonym = document.createElement("p");


    fetch(`${baseUrl}${wordId}`)
    .then(response=>{
        if (response.ok) {
            return results = response.json();
        } else {
            throw error(response.statusText);
        }
    }) .then (results =>{
        let wordsDb = results;
        console.log(wordsDb);
        renderSideBarWords(wordsDb);
        searchWord(wordsDb);
        compareBtnSwitch(wordsDb);
    })

    // //////////////////////////////////////////////////////////////////////
    // Head of Search

    function compareBtnSwitch(wordsDb) {
        let compareBtn = document.getElementById("compare-button");
        compareBtn.addEventListener("dblclick", ()=>{
            console.log("I was double clicked");
            let compareDef = (document.querySelector("#word-and-definition").querySelector(".card"));
            mainRight.appendChild(compareDef);
        })  
    }

    function searchWord(wordsDb) {
        const searchForm = document.getElementById("word-search");
        let wordInput = document.getElementById("word-input");
        let selectOption = document.getElementById("select");
        searchForm.addEventListener("submit", (event)=>{
            event.preventDefault();
            console.log(wordsDb);
            let searchValue = wordInput.value;
            console.log(searchValue);
            let wordFound = wordsDb.find(singleWord=>singleWord.word === `${searchValue.toLowerCase()}`);
            console.log(wordFound);
            if (selectOption.value === "Definition") {
                console.log(selectOption.value);
                renderWordDef(wordFound);   
            } else if (selectOption.value === "Part of Speech") {
                console.log(selectOption.value);
                renderWordPartSpeech(wordFound); 
            } else if (selectOption.value === "Synonym(s)") {
                console.log(selectOption.value);
                renderSynonym(wordFound);
            } else {
                console.log(selectOption.value);
                renderCompleteWordDef(wordFound);
            }
            
    })
    }


    // // //////////////////////////////////////////////////////////////////////
    // // Render functions

    function renderSideBarWords(wordsDb) {
        let wordList = document.getElementById("word-list");
        // let cremoveCurrDefCard = (document.querySelector("#word-and-definition").querySelector(".card"));
        // let compareDef;
        wordsDb.forEach(wordEntry=>{
            let li = document.createElement("li");
            console.log(wordEntry);
            li.textContent = wordEntry.word;
            li.id = wordEntry.id;
            li.addEventListener("click", slctWordEntry=>{
                console.log("I was clicked");
                console.log(li.textContent);
                console.log(wordsDb);
                slctWordEntry = li;
                console.log(slctWordEntry);
                let currWordDefCard = document.querySelector("#word-and-definition").querySelector(".card");
                if (currWordDefCard !== null) {
                    console.log(currWordDefCard);
                    let currWordCompCard = currWordDefCard;
                    console.log(currWordCompCard);
                    mainRight.append(currWordCompCard);
                    removeCurrDefCard();
                    renderFullDefinition(slctWordEntry, wordsDb);
                } else {
                    renderFullDefinition(slctWordEntry, wordsDb);
                }
            })
            wordList.appendChild(li);
    })
    }



    function renderFullDefinition(slctWordEntry, wordsDb) {
        compWordDefCard = document.querySelector("#word-comparison").querySelector(".card");
        removeCompDefCard();
        console.log(document.querySelector("#word-comparison").querySelector(".card"));
        let wordEntryCard = document.createElement("div");
        for (let i = 0; i <= wordsDb.length-1; i++) {
            if (slctWordEntry.id == wordsDb[i].id) {
                slctWordEntry = wordsDb[i];

                word.textContent = slctWordEntry.word;
                wordEntryCard.appendChild(word);
                
                partSpeech.textContent = `Part of speech: ${slctWordEntry.partOfSpeech}`;
                wordEntryCard.appendChild(partSpeech);
                
                definition.textContent = `Definition: ${slctWordEntry.definition}`;
                wordEntryCard.appendChild(definition);
                
                synonym.textContent = `Synonym(s): ${slctWordEntry.synonyms}`;
                wordEntryCard.appendChild(synonym);
                wordEntryCard.setAttribute("class", "card");
                mainMiddle.append(wordEntryCard);
                console.log(compWordDefCard);
                // mainRight.append(compareDef);
        }    
    }
    }

    function renderWordDef(wordFound) {
        let wordDefCard = document.createElement("div");
        removeCurrDefCard();
        word.textContent = wordFound.word;
        wordDefCard.appendChild(word);

        definition.textContent = `Definition: ${wordFound.definition}`;
        wordDefCard.appendChild(definition);
        wordDefCard.setAttribute("class", "card");
        console.log(mainMiddle.innerText);
        mainMiddle.appendChild(wordDefCard);
    }

    function renderWordPartSpeech(wordFound) {
        let wordPartSpchCard = document.createElement("div");
        removeCurrDefCard();
        word.textContent = wordFound.word;
        wordPartSpchCard.appendChild(word);
        
        partSpeech.textContent = `Part of speech: ${wordFound.partOfSpeech}`;
        wordPartSpchCard.appendChild(partSpeech);
        wordPartSpchCard.setAttribute("class", "card");
        mainMiddle.append(wordPartSpchCard);
    }

    function renderSynonym(wordFound) {
        let wordSynonym = document.createElement("div");
        removeCurrDefCard();
        word.textContent = wordFound.word;
        wordSynonym.appendChild(word);

        synonym.textContent = `Synonym(s): ${wordFound.synonyms}`;
        wordSynonym.appendChild(synonym);
        wordSynonym.setAttribute("class", "card");
        mainMiddle.append(wordSynonym);
    }

    function renderCompleteWordDef(wordFound) {
        let compWordDefCard = document.createElement("div");
        removeCurrDefCard();
        word.textContent = wordFound.word;
        compWordDefCard.appendChild(word);
        
        partSpeech.textContent = `Part of speech: ${wordFound.partOfSpeech}`;
        compWordDefCard.appendChild(partSpeech);
        
        definition.textContent = `Definition: ${wordFound.definition}`;
        compWordDefCard.appendChild(definition);
        
        synonym.textContent = `Synonym(s): ${wordFound.synonyms}`;
        compWordDefCard.appendChild(synonym);
        compWordDefCard.setAttribute("class", "card");
        mainMiddle.append(compWordDefCard);
    }

    // Remove function
    ////////////////////////////////////////////////////////////////////////////
    function removeCurrDefCard(){
        let currWordDefCard = document.querySelector("#word-and-definition").querySelector(".card");
        if (currWordDefCard !== null) {
            console.log(currWordDefCard);
            currWordDefCard.remove();
            console.log(currWordDefCard);
        }
    }

    function removeCompDefCard(){
        compWordDefCard = document.querySelector("#word-comparison").querySelector(".card");
        if (compWordDefCard !== null) {
            console.log(compWordDefCard.innerText);
            compWordDefCard.remove();
            replaceCompDefCard(compWordDefCard);
            return compWordDefCard;
        }
    }

    function replaceCompDefCard(compWordDefCard) {
        console.log(compWordDefCard);
        let newCompDefCard = document.createElement("div");
        newCompDefCard.append(compWordDefCard);
        mainRight.append(newCompDefCard);
    }

// End of DOM Content Loaded callback
})