// Helper functions

function bookIsBorrowed(book) {
  return book.borrows.some(borrow => !borrow.returned);
}


// Tested functions

function findAuthorById(authors, id) {
  return authors.find(author => author.id === id);
}

function findBookById(books, id) {
  return books.find(book => book.id === id);
}

function partitionBooksByBorrowedStatus(books) {
  const borrowedBooks = books.filter(bookIsBorrowed);
  console.log(borrowedBooks);
  const returnedBooks = books.filter(book => !bookIsBorrowed(book));
  console.log(returnedBooks);
  return [borrowedBooks, returnedBooks];
}

function getBorrowersForBook(book, accounts) {
  let accountsWithBorrows = accounts.filter(account => book.borrows.some(borrow => borrow.id === account.id));
  return accountsWithBorrows.map(account => {
    let borrow = book.borrows.find(borrow => borrow.id === account.id);
    account.returned = borrow.returned;
    return account;
  })
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
