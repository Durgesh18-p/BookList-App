// Book Class: Represents a book
class Book{
  constructor(title,author,ISBN){
    this.title = title;
    this.author = author;
    this.ISBN = ISBN;
  }
}

// UI : Handle UI tasks
class UI {
  static displayBooks() {
    const books = Store.getBooks();
    books.forEach((book) => UI.addBookToList(book))
}

static addBookToList(book) {
  const list = document.querySelector('#book-list')

  const row = document.createElement('tr')

  row.innerHTML = `
  <td>${book.title}</t>
  <td>${book.author}</t>
  <td>${book.ISBN}</t>
  <td><a href="#" class="btn btn-danger btn-sm delete">X</t>
  `

  list.appendChild(row)
}

static showAlert(message, className) {
  const div = document.createElement('div')
  div.className = `alert alert-${className}`
  div.appendChild(document.createTextNode(message))
  const container = document.querySelector('.container')
  const form = document.querySelector('#book-form')
  container.insertBefore(div,form)

  //  Vanish after 3 seconds
   setTimeout(() => {
    const alert = document.querySelector('.alert');
    if (alert) {
      alert.remove();
    }
  }, 2000);
}

static clearFields() {
  document.querySelector('#title').value = ""
  document.querySelector('#author').value = ""
  document.querySelector('#ISBN').value = ""
}

static deleteBook(el) {
  if(el.classList.contains('delete')){
    el.parentElement.parentElement.remove()
  }
   // Book removed
   UI.showAlert('Book removed','success')
}
}

// Store Class : Handles Local Storage
class Store {
  static getBooks() {
    let books;
    if(localStorage.getItem('books') === null){
      books = []
    }else{
      books = JSON.parse(localStorage.getItem('books'));
    }

    return books;
  }

  static addBook(book) {
  const books = Store.getBooks()
  books.push(book)
  localStorage.setItem('books', JSON.stringify(books))
  }

  static removeBook(ISBN) {
    const books = Store.getBooks()

    books.forEach((book, index) => {
      if(book.ISBN === ISBN){
        books.splice(index, 1)
      }
    })

    localStorage.setItem('books', JSON.stringify(books ))
  }
}




// Event : Display Books
document.addEventListener('DOMContentLoaded', UI.displayBooks)

// Event : Remove Books
document.querySelector('#book-form').addEventListener('submit', (e) => {
  e.preventDefault()
  //Get form values
  const title = document.querySelector('#title').value
  const author = document.querySelector('#author').value
  const ISBN = document.querySelector('#ISBN').value

// Validate
if(title === '' || author === "" || ISBN === '') {
  UI.showAlert('Please fill in the all fields','danger')
}else{
  // Instntiate book
  const book = new Book(title,author,ISBN)

  // Add Book to UI
  UI.addBookToList(book)

  // Add book to store
  Store.addBook(book)

  // show success message
  UI.showAlert('Book added successfully','success')

  // Clear fields
  UI.clearFields()}
})

// Event : Add Books
document.querySelector('#book-list').addEventListener('click', (e) => {
  UI.deleteBook(e.target)
})