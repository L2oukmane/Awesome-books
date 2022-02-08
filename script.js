class Application {
  constructor() {
    this.contactForm = document.querySelector('.book_form');
    this.title = document.querySelector('.book_title');
    this.author = document.querySelector('.book_author');
    this.bookList = document.querySelector('.parent_book_container');
    this.booksArray = [];

    this.contactForm.addEventListener('submit', (event) => {
      event.currentTarget.ref.addBook();
      event.preventDefault();
    });
    this.contactForm.ref = this;

    if (localStorage.getItem('books') != null) {
      this.booksArray = JSON.parse(localStorage.getItem('books'));
      this.intitializeDocument();
      this.intitializeRemoveButtonEvents();
    }
  }

  intitializeDocument() {
    this.bookList.innerHTML = '';
    for (let i = (this.booksArray.length - 1); i > -1; i -= 1) {
      let bgConst = '';
      if (i % 2 === 0) {
        bgConst = 'bg-color';
      }
      this.bookList.innerHTML = `${this.bookList.innerHTML}<div class="books-list ${bgConst}">
      <p>${this.booksArray[i].title} by ${this.booksArray[i].author}</p>
      <button class="rem_button remove_button_${i}">remove</button>
      </div>`;
    }
  }

  removeBook(index) {
    document.querySelector(`.remove_button_${index}`).addEventListener('click', (event) => {
      const tempbooksArray = [];
      const objectReference = event.currentTarget.ref;
      for (let j = 0; j < objectReference.booksArray.length; j += 1) {
        if (j !== event.currentTarget.index) {
          tempbooksArray.push({
            title: objectReference.booksArray[j].title,
            author: objectReference.booksArray[j].author,
          });
        }
      }
      objectReference.booksArray = tempbooksArray;
      localStorage.setItem('books', JSON.stringify(objectReference.booksArray));
      objectReference.intitializeDocument();
      objectReference.intitializeRemoveButtonEvents();
    });
    document.querySelector(`.remove_button_${index}`).index = index;
    document.querySelector(`.remove_button_${index}`).ref = this;
  }

  intitializeRemoveButtonEvents() {
    for (let i = (this.booksArray.length - 1); i > -1; i -= 1) {
      this.removeBook(i);
    }
  }

  addBook() {
    this.booksArray.push({ title: this.title.value, author: this.author.value });
    localStorage.setItem('books', JSON.stringify(this.booksArray));
    this.title.value = '';
    this.author.value = '';
    this.intitializeDocument();
    this.intitializeRemoveButtonEvents();
  }
}
/* eslint-disable */
const application = new Application();
/* eslint-enable */