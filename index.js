// 1. fetch words with definitions, PoS and synonyms and create object, wordsDb
// 2. render words in word-list on sidebar(bottom left div) and add event listener
// 3. add event listener (not in a function?)to the form to search a word typed in 
//      and use its own fetch to fetch the word and the definition/PoS/synonym and 
//      call a function(use a function set to a variable?) for each that handles each one
//      or calls the main definition function - renderFullDef() (itself containing the individual variables
//      for each element of the full definition)
// 4.when a word in the word-list is selected (clicked on), bring up the definition
//      by invoking renderFullDef() in the mainMiddle div.
// 5. add event listener ("dblclick") to the Comparison button that moves the main
//      defition to the word-comparison panel.


// DOMContentLoaded Event Listener
// ///////////////////////////////////////////////////////////////////////////

document.addEventListener("DOMContentLoaded", () => {

// /////////////////////////////////////////////////////////////////////
// Global variables
    const baseUrl = "http://localhost:3000/";
    let wordId = "words";
    let wordsDb = 0;
    let wordSearchForm = document.querySelector("#word-search");
    let wordAndDef = document.getElementById("word-and-definition");
    let wordComp = document.getElementById("word-comparison");
    let wordEntryCard = document.createElement("div");
    let compareBtn = document.getElementById("compare-button");

// Event Listeners not including overall DOMContentLoaded EL
// ///////////////////////////////////////////////////////////////////////////

// wordSearchForm submit event
    wordSearchForm.addEventListener("submit", (event)=>{
        event.preventDefault();
        let wordSearchInput = document.querySelector("#word-input").value;
        let selectOption = document.getElementById("select");
        let searchWordFound = wordsDb.find(element => {
            // if ()
            return element.word === (wordSearchInput.toLowerCase());
        });

        if (selectOption.value === "Definition") { 
            removeCurrDefCard();
            clearWordEntryCard();
            renderWord(searchWordFound);
            renderDef(searchWordFound);
            wordEntryCard.setAttribute("class", "card");
            wordAndDef.append(wordEntryCard);
            

        } else if (selectOption.value === "Part of Speech") {
            removeCurrDefCard();
            clearWordEntryCard();
            renderWord(searchWordFound);
            renderPoS(searchWordFound);
            wordEntryCard.setAttribute("class", "card");
            wordAndDef.append(wordEntryCard);

        } else if (selectOption.value === "Synonym(s)") {
            removeCurrDefCard();
            clearWordEntryCard();
            renderWord(searchWordFound);
            renderSyn(searchWordFound);
            wordEntryCard.setAttribute("class", "card");
            wordAndDef.append(wordEntryCard);

        } else {
            renderFullDefinition(searchWordFound);
        }
    })

// move WordDefintion to Word and Comparison via DeepCopy(invoke DeepCopy ln198)
    function handleDblClick() {
console.log("I've been clicked");        
        let compWordDefCard = document.querySelector("#word-comparison").querySelector(".card");
        if (compWordDefCard !== null) {
            removeCompDefCard();
            let deepCopyWordEntryCard = document.createElement("div");
            deepCopyWordEntryCard.append(deepCopyElement(wordEntryCard));
            wordComp.append(deepCopyWordEntryCard);
            removeCurrDefCard();
            clearWordEntryCard();
        } else {
            let deepCopyWordEntryCard = document.createElement("div");
            deepCopyWordEntryCard.append(deepCopyElement(wordEntryCard));
            wordComp.append(deepCopyWordEntryCard);
            removeCurrDefCard();
            clearWordEntryCard();
        }
    }

    compareBtn.addEventListener("dblclick", handleDblClick);  

    // Initial Fetch()
    // ///////////////////////////////////////////////////////////////////////

        fetch(`${baseUrl}${wordId}`)
            .then(response=>{
                if (response.ok) {
                    return results = response.json();
                } else {
                    throw error(response.statusText);
                }
            }).then (results =>{
                wordsDb = results;
                // console.log(wordsDb);
                // main object consoleLog commented for future ref if needed
                renderSideBarWords(wordsDb);
            })    


     // // //////////////////////////////////////////////////////////////////////
    // // Render functions

    // renderSideBarWords function to display 20 words in dbJson file
    function renderSideBarWords(wordsDb) {
        let wordList = document.getElementById("word-list");
        wordsDb.forEach(wordEntry=>{
            let li = document.createElement("li");
            li.textContent = wordEntry.word;
            li.id = wordEntry.id;
            li.addEventListener("click", slctWordEntry=>{
                slctWordEntry = li;
                let foundWord = wordsDb.find(element => {
                    return element.id === (parseInt(slctWordEntry.id));
                });
                let currWordDefCard = document.querySelector("#word-and-definition").querySelector(".card");
                if (currWordDefCard !== null) {
                    removeCurrDefCard();
                    renderFullDefinition(foundWord);
                } else {
                    renderFullDefinition(foundWord);
                }
            })
            wordList.appendChild(li);
        })
    }

// add error handling for misspelled words?

// individual function expressions
        let renderWord = function(foundWord) {
            let word = document.createElement("h3");
            word.textContent = foundWord.word;
            wordEntryCard.appendChild(word);
        }
        let renderPoS = function(foundWord) {
            let partOfSpeech = document.createElement("p");
            partOfSpeech.textContent = `Part of Speech: ${foundWord.partOfSpeech}`;
            wordEntryCard.appendChild(partOfSpeech);
        }

        let renderDef = function(foundWord) {
            let definition = document.createElement("p");
            definition.textContent = `Definition: ${foundWord.definition}`;
            wordEntryCard.appendChild(definition);
        }

        let renderSyn = function(foundWord) {
            let synonyms = document.createElement("p");
            synonyms.textContent = `Synonym(s): ${foundWord.synonyms}`;
            wordEntryCard.appendChild(synonyms);
        }

    function renderFullDefinition(foundWord) {
        removeCurrDefCard();
        clearWordEntryCard();
        renderWord(foundWord);
        renderPoS(foundWord);
        renderDef(foundWord);
        renderSyn(foundWord);
        wordEntryCard.setAttribute("class", "card");
        wordAndDef.append(wordEntryCard);
    }

       // Remove functions
    ////////////////////////////////////////////////////////////////////////////

    function clearWordEntryCard() {
        wordEntryCard.textContent = " ";
    } 

    function removeCurrDefCard(){
        let currWordDefCard = document.querySelector("#word-and-definition").querySelector(".card");
        if (currWordDefCard !== null) {
            currWordDefCard.remove();
        }
    }

    function removeCompDefCard(){
        let compWordDefCard = document.querySelector("#word-comparison").querySelector(".card");
        if (compWordDefCard !== null) {
        compWordDefCard.remove();
        }
    }

    // function deepCopyElement courtesy ChatGPT3.5
    function deepCopyElement(originalElement) {
        const clonedElement = originalElement.cloneNode(true); // true to clone all descendants
        return clonedElement;
    }
    

// End of DOM Content Loaded callback
})