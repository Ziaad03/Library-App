const booksLibrary = [] // array to store the books


// get elments from html
let showBtn = document.getElementById("show")
let dialog = document.getElementById("dialog")
let addBtn = document.getElementById("add-button")
let closeBtn = document.getElementById("close-dialog")


let titleInput = document.getElementById("title")
let authorInput = document.getElementById("author")
let pagesInput = document.getElementById("pages-number")




// book class
class book{
    constructor(author,title,pages,read ){
        this.author = author;
        this.title = title;
        this.pages = pages;
        this.read = read;
    }
}

function addBookToLibrary(author, title, noOfPages, read ){
    booksLibrary.push(new book(author,title,noOfPages,read))

}

function removeBookFromLibrary(inputArray){
        
        for (let i = 0; i < booksLibrary.length; i++){
            if (booksLibrary[i].title == inputArray[0] && booksLibrary[i].author == inputArray[1] && booksLibrary[i].pages == inputArray[2] ){
                return i }}
    }



function displayBook(inputArray){
    
        
        // get the inputs
        let bookTitle = inputArray[0]
        let bookAuthor = inputArray[1]
        let bookPages = inputArray[2]
        
         

        // store the book in the booksLibrary array
        addBookToLibrary(bookAuthor, bookTitle, bookPages,true)
        
        
        let newBookCard = createBookCard(bookTitle,bookAuthor,bookPages,inputArray)

        document.getElementById("library").appendChild(newBookCard)
        
        

        

    

    
}


// show the add book window 
showBtn.addEventListener('click', () => {
    dialog.showModal();

})

// close the add menu
closeBtn.addEventListener('click', ()=>{
    event.preventDefault();
    dialog.close()
})
// add book
addBtn.addEventListener('click', (event) =>{
    // prevent default is a method to prevent the unwanted right now normal behaviour of submitting a form
    event.preventDefault();
    
    const inputArray = []
    // put the the input to the input array if it is not empty
    if (titleInput.value != "" && authorInput.value != "" && pagesInput.value != ""){
        inputArray.push(titleInput.value)
        inputArray.push(authorInput.value)
        inputArray.push(pagesInput.value) 
    
        displayBook(inputArray)
        dialog.close()

        titleInput.value = ""
        authorInput.value = ""
        pagesInput.value = ""
    
    }
    
    
    
    


})


function createBookCard(bookTitle, bookAuthor, bookPages,inputArray) {
    // Create the main container for the book card
    let bookCard = document.createElement("div");
    bookCard.setAttribute("class", "book-card");

    // Add delete button and trash image
    let removeDiv = document.createElement("div");
    removeDiv.setAttribute("id", "delete-card");
    let removeBtn = document.createElement("button");
    removeBtn.setAttribute("id", "remove-book");
    let trashImg = document.createElement("img");
    trashImg.src = './images/delete.svg';
    trashImg.alt = 'trash icon';
    removeBtn.appendChild(trashImg);
    removeDiv.appendChild(removeBtn);
    bookCard.appendChild(removeDiv);

    // Add title section
    let titleSection = document.createElement("h3");
    titleSection.textContent = bookTitle;
    bookCard.appendChild(titleSection);

    // Add author section
    let authorSection = document.createElement("div");
    authorSection.setAttribute("id", "author-section");
    let authorLabel = document.createElement("p");
    authorLabel.textContent = "By";
    let authorName = document.createElement("h4");
    authorName.textContent = bookAuthor;
    authorSection.appendChild(authorLabel);
    authorSection.appendChild(authorName);
    bookCard.appendChild(authorSection);

    // Add page section
    let pageSection = document.createElement("h5");
    pageSection.textContent = bookPages + " pages";
    bookCard.appendChild(pageSection);

    // Add reading status section
    let readingStatusDiv = document.createElement("div");
    let label = document.createElement("label");
    label.setAttribute("class", "container");
    let checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    let checkmarkDiv = document.createElement("div");
    checkmarkDiv.setAttribute("class", "checkmark");
    let inProgressSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    inProgressSvg.setAttribute("class", "icon No");
    inProgressSvg.setAttribute("viewBox", "0 0 16 16");
    let doneReadingSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    doneReadingSvg.setAttribute("class", "icon Yes");
    doneReadingSvg.setAttribute("viewBox", "0 0 16 16");
    let inProgressText = document.createElement("p");
    inProgressText.setAttribute("class", "No name");
    inProgressText.textContent = "In progress";
    let doneReadingText = document.createElement("p");
    doneReadingText.setAttribute("class", "Yes name");
    doneReadingText.textContent = "Done Reading";
    checkmarkDiv.appendChild(inProgressSvg);
    checkmarkDiv.appendChild(inProgressText);
    checkmarkDiv.appendChild(doneReadingSvg);
    checkmarkDiv.appendChild(doneReadingText);
    label.appendChild(checkbox);
    label.appendChild(checkmarkDiv);
    readingStatusDiv.appendChild(label);
    bookCard.appendChild(readingStatusDiv);

    removeBtn.addEventListener('click', () =>{
        let removedIndex = removeBookFromLibrary(inputArray)
        
        // remove from library
        let children = document.getElementById("library").children
        document.getElementById("library").removeChild(children[removedIndex])
         // remove from array
        booksLibrary.splice(removedIndex,1)
       
       // updateId(removedIndex)
    
    })

    return bookCard;
}