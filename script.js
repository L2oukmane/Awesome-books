const contactForm = document.querySelector('.book_form');
const title = document.querySelector('.book_title');
const author = document.querySelector('.book_author');
const bookList = document.querySelector('.books-list');
let titleArray = [];
let authorArray = [];

function intitializeDocument() {
  bookList.innerHTML = '';
  for (let i = (titleArray.length - 1); i > -1; i -= 1) {
    bookList.innerHTML = `${bookList.innerHTML}<p>${titleArray[i]}</p>
                            <p>${authorArray[i]}</p>
                            <button class="remove_button_${i}">remove</button><hr/>`;
  }
}

function removeBook(index) {
  document.querySelector(`.remove_button_${index}`).addEventListener('click', (event) => {
    const tempArrayTitle = [];
    const tempArrayauthor = [];
    for (let j = 0; j < titleArray.length; j += 1) {
      if (j !== event.currentTarget.index) {
        tempArrayTitle.push(titleArray[j]);
        tempArrayauthor.push(authorArray[j]);
      }
    }
    titleArray = tempArrayTitle;
    authorArray = tempArrayauthor;
    localStorage.setItem('title', JSON.stringify(titleArray));
    localStorage.setItem('author', JSON.stringify(authorArray));
    intitializeDocument();
    /* eslint-disable */
    intitializeRemoveButtonEvents();
   /* eslint-enable */
  });
  document.querySelector(`.remove_button_${index}`).index = index;
}

function intitializeRemoveButtonEvents() {
  for (let i = (titleArray.length - 1); i > -1; i -= 1) {
    removeBook(i);
  }
}

function addBook() {
  titleArray.push(title.value);
  authorArray.push(author.value);
  localStorage.setItem('title', JSON.stringify(titleArray));
  localStorage.setItem('author', JSON.stringify(authorArray));
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
  if (localStorage.getItem('title') != null) {
    titleArray = JSON.parse(localStorage.getItem('title'));
    authorArray = JSON.parse(localStorage.getItem('author'));
    intitializeDocument();
    intitializeRemoveButtonEvents();
  }
})();