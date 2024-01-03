Deep clones compared to Shallow Clones in JavaScript

As we all have learned, we have two kinds of copies (clones) in JavaScript - Shallow Copies and Deep Copies.

Shallow copies refer back to the original, and if something in the copy is changed, the original is also then updated.  However, with a deep copy, it is a completely new object or variable, and a change that is made to the copy does NOT change the original.   Shallow copies are the default for JavaScript, and in order to make a deep copy, one has to employ one of a few different methods.  This is a detail that we did learn about at Flatiron School (no one asked me to plug the school; it’s just a fact) but the application of the differences between shallow and deep copies did not sink in for me until I encountered it myself.

According to MDN (Mozilla Developer Network), “In JavaScript, standard built-in object-copy operations (spread syntax[…], Array.prototype.concat(), Array.prototype.slice(), Array.from(), Object.assign(), and Object.create() ) do not create deep copies (instead, they create shallow copies).”  As a result there are many cases where we may want to create deep copies, that do not reference nor update the original when the copy is changed.

There are two ways to make deep copies in JavaScript (to state it simply; more on this in a moment), and one way that is a method of the DOM  Node interface.  The first one is uses methods we are already familiar with, but can only be used on objects that can be serialized as it uses JSON.stringify() to change the object into a string, then invokes JSON.parse() to return it to its’ original form.  This one is the most straightforward, but also the most likely to run into instances where it contains data that cannot be duplicated correctly.


const original = { 
            firstName: “timothy”,
            LastName: “ryon”,
            funFact: “doesn’t like to capitalize his name”
        }   
            
const clone = JSON.parse(JSON.stringify(original));



The second way to make a deep copy is actually not a JavaScript method, but one that is built into the browser as explained by MDN: “The web API structuredClone() also creates deep copies and has the advantage of allowing transferrable objects in the source to be transferred to the new copy, rather than just clones.  It also handles more data types, such as Error.  But note that structuredClone() isn’t a feature of the JavaScript language itself - instead it’s a feature of browsers and other JavaScript hosts that implement we APIs.  And calling structuredClone() to clone a non-serializable object will fail in the same way that calling JSON.stringify() to serialize it wall [also] fail.”


const original = { 
            firstName: “timothy”,
            LastName: “ryon”,
            funFact: “doesn’t like to capitalize his name”
        }

const clone = structuredClone(original);


What is very important about the structuredClone() API is that the objects are transferred instead of copied or cloned, so they are moved from the original to the new object and are no longer available in the original object.  This may help as it removes the information from the original location, though that very same behavior may conversely make it difficult as it is no longer there to be interacted with independently.

The third method, cloneNode(Deep) is described by MDN as  “The cloneNode() method of the Node interface returns a duplicate of the node on which this method was called. Its parameter controls if the subtree contained in a node is also cloned or not.”  If cloneNode(Deep) is used cloneNode(true), it will return a copy with all of the child or descendant nodes intact, (as it does in the code example) whereas if it is used as cloneNode(false), it will return a copy with only the parent node.

    // function deepCopyElement courtesy ChatGPT3.5
    function deepCopyElement(originalElement) {
        const clonedElement = originalElement.cloneNode(true); // true to clone all descendants
        return clonedElement;
    }


In my case, I found out that JavaScript by default makes shallow copies as my variable, representing a DOM node, wordEntryCard, in my JavaScript project for Flatiron School would be removed.  wordEntryCard had been appended to an HTML element, then appended to the DOM, then copied to another variable and appended to a different portion of the DOM, but it would be deleted as soon as I removed the text in preparation to add new text in the original area of the DOM.  It took me many days and a Chat GPT query to understand that it was a problem due to a shallow copy.  However, ChatGPT did not educate me on the JSON.parse() and JSON.stringify() option or the structuredClone() method, nor illuminate the differences.  It did, however,  point me in the correct direction, to then seek out on MDN the options that are available to me, leading to me realizing that this would make a good blog entry.  Hopefully this blog post will save You some time - Happy Coding!











