// Getting access to the button
const btnEl = document.getElementById("btn");
// Getting access to the container (app)
const appEl = document.getElementById("app");

// Loop through the localStorage and populate the data on the web page
getNotes().forEach((note)=>{
    // create the id and content first
    const noteEl = createNoteEl(note.id, note.content);
    // inserting everything
    appEl.insertBefore(noteEl, btnEl);
})

// Function that will create an id and content of a new note
function createNoteEl(id, content){
    // Create a textarea element using JS method
    const element = document.createElement("textarea");
    // Adding the properties of the textarea
    element.classList.add("note");
    element.placeholder = "Enter a note here...";
    element.value = content;

    // Add an event listener which will listen to the double click (to delete)
    element.addEventListener("dblclick", ()=>{
        // Creating the warning dialogbox
        const warning = confirm("Do you want to delete the note?");
        // If the warning is true, delete the note
        if(warning){
            // Deleting the note
            deleteNote(id, element);
        }
    });

    // Event listener which will update the content when are changed
    element.addEventListener("input", ()=>{
        updateNote(id, element.value);
    });
    return element;
}

// Function that will delete the note
function deleteNote(id, element){
    // get the note that is clicked
    const notes = getNotes().filter((note)=>note.id != id);
    // update the localStorage
    saveNote(notes);
    // removing the textarea on the web page as soon as it's deleted
    appEl.removeChild(element);
}


// Function that will update the note
function updateNote(id, content){
    // get all the notes
    const notes = getNotes();
    // this will return the first note
    const target = notes.filter((note)=>note.id == id)[0];
    // change the content of the 'target'
    target.content = content;
    // then we save the note
    saveNote(notes);
}

// Function that will add a new empty note
function addNote(){
    // Creating a notes object
    const notes = getNotes();
    // Creating a empty object for the note
    const noteObj = {
        // Creating a random id which will be rounded off
        id: Math.floor(Math.random() * 100000),
        // Creating the content of the new note
        content: "",
    };
    // Create a note element
    const noteEl = createNoteEl(noteObj.id, noteObj.content);
    // Adding the new element inside the app but before the button
    appEl.insertBefore(noteEl, btnEl);

    // Push the new note inside 'notes'
    notes.push(noteObj);

    // Saving the note to the local storage
    saveNote(notes);
}

// Function that will save the notes in the local storage
function saveNote(notes){
    // saving inside the local storage
    localStorage.setItem("note-app", JSON.stringify(notes));
}

// Function that will get how many notes are in the local storage
function getNotes(){
    // Getting all the notes inside the local storage
    // FIrstly get what's inside and if there's nothing, it's an empty array
    return JSON.parse(localStorage.getItem("note-app") || "[]");
}

// When we click the button, it must add a new note
btnEl.addEventListener("click", addNote);