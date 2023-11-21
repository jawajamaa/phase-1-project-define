document.addEventListener("DOMContentLoaded", () => {
    const baseUrl = "http://localhost:3000/";
    let wordId = "words";

    // /////////////////////////////////////////////////////////////////////
    // Global variables for rendering definitions
    let mainMiddle = document.getElementById("word-and-definition");
    let mainRight = document.getElementById("word-comparison");
    let wordEntryCard = document.createElement("div");
    // let compareDef = document.querySelector("#word-comparison").querySelector(".card");
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

    // function compareBtnSwitch(wordsDb) {
    //     let compareBtn = document.getElementById("compare-button");
    //     compareBtn.addEventListener("dblclick", ()=>{
    //         console.log("I was double clicked");
    //         let currentDef = (document.querySelector("#four").querySelector(".card"));
    //         mainRight.appendChild(currentDef);
    //     })  
    // }

    // function searchWord(wordsDb) {
    //     const searchForm = document.getElementById("word-search");
    //     let wordInput = document.getElementById("word-input");
    //     let selectOption = document.getElementById("select");
    //     searchForm.addEventListener("submit", (event)=>{
    //         event.preventDefault();
    //         console.log(wordsDb);
    //         let searchValue = wordInput.value;
    //         console.log(searchValue);
    //         let wordFound = wordsDb.find(singleWord=>singleWord.word === `${searchValue.toLowerCase()}`);
    //         console.log(wordFound);
    //         if (selectOption.value === "Definition") {
    //             console.log(selectOption.value);
    //             renderWordDef(wordFound);   
    //         } else if (selectOption.value === "Part of Speech") {
    //             console.log(selectOption.value);
    //             renderWordPartSpeech(wordFound); 
    //         } else if (selectOption.value === "Synonym(s)") {
    //             console.log(selectOption.value);
    //             renderSynonym(wordFound);
    //         } else {
    //             console.log(selectOption.value);
    //             renderCompleteWordDef(wordFound);
    //         }
            
    // })
    // }


    // // //////////////////////////////////////////////////////////////////////
    // // Render functions

    // function renderSideBarWords(wordsDb) {
    //     let wordList = document.getElementById("word-list");
    //     let currentDef = (document.querySelector("#four").querySelector(".card"));
    //     let compareDef;
    //     wordsDb.forEach(wordEntry=>{
    //         let li = document.createElement("li");
    //         console.log(wordEntry);
    //         li.textContent = wordEntry.word;
    //         li.id = wordEntry.id;
    //         li.addEventListener("click", slctWordEntry=>{
    //             console.log("I was clicked");
    //             console.log(li.textContent);
    //             console.log(wordsDb);
    //             slctWordEntry = li;
    //             console.log(slctWordEntry);
    //             if (document.querySelector("#five").querySelector(".card") === null) {
    //                 renderFullDefinition(slctWordEntry, wordsDb);
    //             } else {
    //                 compareDef = document.querySelector("#five").querySelector(".card");
    //                 console.log(compareDef);
    //                 renderFullDefinition(slctWordEntry, wordsDb);
    //                 mainRight.append(compareDef);
    //             }
    //             // renderFullDefinition(slctWordEntry, wordsDb);
    //         })
    //         wordList.appendChild(li);
    // })
    // }

    // // function isMainRightPop() {
    // //     let compareDef = document.querySelector("#five").querySelector(".card");
    // //     if (document.querySelector("#five").querySelector(".card") === null) {
    // //         console.log(compareDef);
    // //     } else {
    // //         // console.log(compareDef);
    // //         return compareDef = document.querySelector("#five").querySelector(".card");
    // //     }
    // // }

    // function renderFullDefinition(slctWordEntry, wordsDb) {
    //     // isMainRightPop();
    //     for (let i = 0; i <= wordsDb.length-1; i++) {
    //         if (slctWordEntry.id == wordsDb[i].id) {
    //             slctWordEntry = wordsDb[i];

    //             word.textContent = slctWordEntry.word;
    //             wordEntryCard.appendChild(word);
                
    //             partSpeech.textContent = `Part of speech: ${slctWordEntry.partOfSpeech}`;
    //             wordEntryCard.appendChild(partSpeech);
                
    //             definition.textContent = `Definition: ${slctWordEntry.definition}`;
    //             wordEntryCard.appendChild(definition);
                
    //             synonym.textContent = `Synonym(s): ${slctWordEntry.synonyms}`;
    //             wordEntryCard.appendChild(synonym);
    //             wordEntryCard.setAttribute("class", "card");
    //             mainMiddle.append(wordEntryCard);
    //             // console.log(compareDef);
    //             // mainRight.append(compareDef);
    //     }    
    // }
    // }

    // function renderWordDef(wordFound) {
    //     mainMiddle.textContent = " ";
    //     word.textContent = wordFound.word;
    //     wordEntryCard.appendChild(word);

    //     definition.textContent = `Definition: ${wordFound.definition}`;
    //     wordEntryCard.appendChild(definition);
    //     wordEntryCard.setAttribute("class", "card");
    //     mainMiddle.append(wordEntryCard);
    // }

    // function renderWordPartSpeech(wordFound) {
    //     mainMiddle.textContent = " ";
    //     word.textContent = wordFound.word;
    //     wordEntryCard.appendChild(word);
        
    //     partSpeech.textContent = `Part of speech: ${wordFound.partOfSpeech}`;
    //     wordEntryCard.appendChild(partSpeech);
    //     wordEntryCard.setAttribute("class", "card");
    //     mainMiddle.append(wordEntryCard);
    // }

    // function renderSynonym(wordFound) {
    //     mainMiddle.textContent = " ";
    //     word.textContent = wordFound.word;
    //     wordEntryCard.appendChild(word);

    //     synonym.textContent = `Synonym(s): ${wordFound.synonyms}`;
    //     wordEntryCard.appendChild(synonym);
    //     wordEntryCard.setAttribute("class", "card");
    //     mainMiddle.append(wordEntryCard);
    // }

    // function renderCompleteWordDef(wordFound) {
    //     mainMiddle.textContent = " ";
    //     word.textContent = wordFound.word;
    //     wordEntryCard.appendChild(word);
        
    //     partSpeech.textContent = `Part of speech: ${wordFound.partOfSpeech}`;
    //     wordEntryCard.appendChild(partSpeech);
        
    //     definition.textContent = `Definition: ${wordFound.definition}`;
    //     wordEntryCard.appendChild(definition);
        
    //     synonym.textContent = `Synonym(s): ${wordFound.synonyms}`;
    //     wordEntryCard.appendChild(synonym);
    //     wordEntryCard.setAttribute("class", "card");
    //     mainMiddle.append(wordEntryCard);
    // }

// End of DOM Content Loaded callback
})