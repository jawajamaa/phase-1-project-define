# Phase 1 Project

## Techniques to demonstrate
3 unique click events
iterating over an array

### Summary
Use a db.json file with 20 words that contain 3 pieces of information for each word - definition, part of speech and synonyms.  This models in a small scale what the free Dictionary API could allow one to look up a word and see the definition(s) and/or synonyms and antonyms, etc.

#### Layout

One main page (see pdf) with one main search box (submit event) that populates the main text/results box below with the definition, etc.  In a separate dropdown (scroll event) a user can select definition/synonym/antonym to be displayed.  Once the results are displayed, a user can click a secondary button (double-click event) between the main search box and the main display box to move the text to the right comparison box and look up a secondary word.  There will be a list of words searched in a vertical box on the far left as an array to be iterated over for event listeners to re populate the definition in the main box when the word is clicked.  The objects that form the definition for each word are stored in an array objects with their corresponding words that is iterated over when a word is clicked on or typed in at the search bar on top.

##### Future additions?

Add functionality to handle mispellings of words, and possibly suggest what word might have been atttempted if it is close enough, by iterating over all words to find the closest match, and possibly then iterating over the individual letters to confirm x% match.  

Make the pronunciation in the definition clickable to either navigate to a page where a user can hear the pronunciation or play it in an audio player (but the audio player would most likely be much more difficult and both out of my range currently)
