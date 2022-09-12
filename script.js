//DOM elements
const display = document.querySelector(".card-display")
const title = document.querySelector("#title")
const author = document.querySelector("#author")
const genre = document.querySelector("#genre")
const read = document.querySelector("#read")
const submit = document.querySelector("#submit")
const form = document.querySelector("form")


//new Book Object
let myBook



//Array of Books
const library = [];

// Object Constructor creates new Book objects
function Book(Title, Author, Genre, Read) {
    this.Title = Title
    this.Author = Author
    this.Genre = Genre
    this.Read = Read

    
}



// method allowing the "Read" property of a library object to be changed
Book.prototype.hasRead = function (){
    if (this.Read === "yes" || "Yes") {
        this.Read = "No"
    }
    else if (this.Read === "no" || "No") {
        this.Read = "Yes"

    }

    else {this.Read = ""}

}

// display books as cards on the page
function displayBooks() {
    display.innerHTML = ""
    library.forEach((Book, index) => {
        const card = document.createElement("div")
        card.className = "card"
        display.appendChild(card)
        
        for(let key in Book){
            const entry = document.createElement("div")
            card.appendChild(entry)
            entry.textContent += `${key} : ${Book[key]} `
            

        }
        card.removeChild(card.lastChild)
        // give each card an index value according to its position in the array

        card.dataset.libraryIndex = `${index}`

        // delete card based on its index value indicating its array position
        const deleted = document.createElement("button")
        card.appendChild(deleted)   
        deleted.textContent = "Delete"
        deleted.addEventListener("click", (event) => {
            display.innerHTML = ""
            const attr = deleted.parentElement.getAttribute("data-library-index")
            library.splice(attr, 1)
            displayBooks()
            })
        
        // allow user to modify library objects to indicate whether book has been read
        const readStatus = document.createElement("button")
        card.appendChild(readStatus)
        readStatus.textContent = "Update"

        readStatus.addEventListener("click", (event) => {
        display.innerHTML = ""
        const attr2 = readStatus.parentElement.getAttribute("data-library-index")
        library[attr2].hasRead()
        displayBooks()

        })
        
    })
       
    }


//Create new Book objects based on User Input
submit.addEventListener('click', (event) => {
    event.preventDefault()
    myBook = new Book(title.value,author.value,genre.value,read.value)
    library.push(myBook)
    displayBooks()
    form.reset()
    
})






displayBooks()

