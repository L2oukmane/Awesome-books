const contactForm = document.querySelector('.book_form');
const title = document.querySelector('.book_title');
const author = document.querySelector('.book_author');
const bookList = document.querySelector('.books-list');
let titleArray = [];
let authorArray = [];

function addBook()
{
    titleArray.push(title.value);
    authorArray.push(author.value);
    title.value = '';
    authorArray.value = '';
    bookList.innerHTML = '';
    for(let i = (titleArray.length - 1); i < 0; i += 1)
    {
        bookList.innerHTML += `${bookList.innerHTML}<p>${titleArray[i]}</p>
                               <p>${authorArray[i]}</p>
                               <button class="remove_button-${i}">remove</button>`;

        let removeButton  = document.querySelector(`.remove_button-${i}`);
        removeButton.addEventListener('click', (event) => {
            let Temp_Array_title = [];
            let Temp_Array_author = [];
            for(let j = 0; j < titleArray.length; j += 1)
            {
                if(j == event.currentTarget.index)
                   continue;

                Temp_Array_title.push(titleArray[j])
                Temp_Array_author.push(authorArray[j])
            }
            titleArray = Temp_Array_title;
            authorArray = Temp_Array_author;

            document.querySelector(`.remove_button-${event.currentTarget.index}`).removeEventListener('click', (event) => {});
        });
        removeButton.index = i;

    }

  
}

function removeBook()
{

}

contactForm.addEventListener('submit', (event) => {
   addBook();
});