// A user should be able to type a comment in the input field, click the button, and then a p tag with that text should be added to the div

let commentBox = document.getElementById("commentInput");
let clickBtn = document.getElementById("clickButton");

clickBtn.addEventListener("click", ()=>{
    let comment = commentBox.value;
    let p = document.createElement("p");
    p.append(comment);
    let containerDiv = document.getElementById("container");
    containerDiv.append(`${p.textContent}`);
})






















// const dogs = [ 
//     { name: "Cheddar", breed: "Corgi", owner: "Holt" }, 
//     { name: "Toto", breed: "Terrier", owner: "Dorothy" },
//     { name: "Susan", breed: "Corgi", owner: "Lizzie" } 
// ]

// const dogNamedSusan = dogs.find((dog)=>{
//     return dog.name === "Susan";
// })

// console.log(dogNamedSusan);