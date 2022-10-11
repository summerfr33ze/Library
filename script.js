// DOM elements
const display = document.querySelector('.card-display');
const title = document.querySelector('#title');
const author = document.querySelector('#author');
const genre = document.querySelector('#genre');
const read = document.querySelector('#read');
const submit = document.querySelector('#submit');
const form = document.querySelector('form');

// new Book Object
let myBook;

// Array of Books
const library = [];

// class for creating new Book objects

class Book {
  constructor(Title, Author, Genre, Read) {
    this.Title = Title;
    this.Author = Author;
    this.Genre = Genre;
    this.Read = Read;
  }

  hasRead() {
    if (this.Read === 'yes' || this.Read === 'Yes') {
      this.Read = 'No';
    } else if (this.Read === 'no' || this.Read === 'No') {
      this.Read = 'Yes';
    }
  }
}

// display books as cards on the page
function displayBooks() {
  display.innerHTML = '';
  library.forEach((Book, index) => {
    const card = document.createElement('div');
    card.className = 'card';
    display.appendChild(card);

    for (const key in Book) {
      const entry = document.createElement('div');
      card.appendChild(entry);
      console.log(card);
      entry.textContent = `${key} : ${Book[key]} `;
    }

    // give each card an index value according to its position in the array

    card.dataset.libraryIndex = `${index}`;

    // delete card based on its index value indicating its array position
    const deleteCard = document.createElement('button');
    card.appendChild(deleteCard);
    deleteCard.textContent = 'Delete';
    deleteCard.addEventListener('click', (event) => {
      display.innerHTML = '';
      const attr = deleteCard.parentElement.getAttribute('data-library-index');
      library.splice(attr, 1);
      displayBooks();
    });

    // allow user to modify library objects to indicate whether book has been read
    const readStatus = document.createElement('button');
    card.appendChild(readStatus);
    readStatus.textContent = 'Update';

    readStatus.addEventListener('click', (event) => {
      display.innerHTML = '';
      const attr2 = readStatus.parentElement.getAttribute('data-library-index');
      library[attr2].hasRead();
      displayBooks();
    });
  });
}

// Create new Book objects based on User Input
submit.addEventListener('click', (event) => {
  event.preventDefault();
  const myBook = new Book(title.value, author.value, genre.value, read.value);
  console.log(myBook);
  library.push(myBook);
  displayBooks();
  form.reset();
});

// form validation

read.addEventListener('input', () => {
  if (read.validity.patternMismatch) {
    read.setCustomValidity("It's a yes or no question!");
    read.reportValidity()
  }
});

displayBooks();
