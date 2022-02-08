const contactForm = document.querySelector('.book_form');
const title = document.querySelector('.book_title');
const author = document.querySelector('.book_author');
const bookList = document.querySelector('.books-list');
let booksArray = [];

function intitializeDocument() {
  bookList.innerHTML = '';
  for (let i = (booksArray.length - 1); i > -1; i -= 1) {
    bookList.innerHTML = `${bookList.innerHTML}<p>${booksArray[i].title}</p>
                            <p>${booksArray[i].author}</p>
                            <button class="remove_button_${i}">remove</button><hr/>`;
  }
}

function removeBook(index) {
  document.querySelector(`.remove_button_${index}`).addEventListener('click', (event) => {
    const tempbooksArray = [];
    for (let j = 0; j < booksArray.length; j += 1) {
      if (j !== event.currentTarget.index) {
        tempbooksArray.push({ title: booksArray[j].title, author: booksArray[j].author });
      }
    }
    booksArray = tempbooksArray;
    localStorage.setItem('books', JSON.stringify(booksArray));
    intitializeDocument();
    /* eslint-disable */
    intitializeRemoveButtonEvents();
   /* eslint-enable */
  });
  document.querySelector(`.remove_button_${index}`).index = index;
}

function intitializeRemoveButtonEvents() {
  for (let i = (booksArray.length - 1); i > -1; i -= 1) {
    removeBook(i);
  }
}

function addBook() {
  booksArray.push({ title: title.value, author: author.value });
  localStorage.setItem('books', JSON.stringify(booksArray));
  title.value = '';
  author.value = '';
  intitializeDocument();
  intitializeRemoveButtonEvents();
}

contactForm.addEventListener('submit', (event) => {
  addBook();
  event.preventDefault();
});

(() => {
  if (localStorage.getItem('books') != null) {
    booksArray = JSON.parse(localStorage.getItem('books'));
    intitializeDocument();
    intitializeRemoveButtonEvents();
  }
})();