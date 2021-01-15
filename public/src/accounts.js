function findAccountById(accounts, id) {
  return accounts.find(account => account.id === id);
}

function sortAccountsByLastName(accounts) {
  return accounts.sort((a, b) => a.name.last.toLowerCase() > b.name.last.toLowerCase() ? 1 : -1);
}

function numberOfBorrows({id}, books) {
  // Double accumulate!
  let borrows = books.reduce((acc, book) => {
    return acc + book.borrows.reduce((acc, borrow) => {
      if (borrow.id === id) {
        acc += 1;
      }
      return acc;
    }, 0);
  }, 0);
  return borrows;
}

function getBooksPossessedByAccount(account, books, authors) {
  const authorIds = authors.map(author => author.id);
  let booksByAuthors = books.filter(book => authorIds.includes(book.authorId)).map(book => {
    book.author = findAccountById(authors, book.authorId);
    return book;
  });
  let results = booksByAuthors.filter(book => {
    return book.borrows.some(borrow => borrow.id === account.id && !borrow.returned);
  });
  return results;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  numberOfBorrows,
  getBooksPossessedByAccount,
};
