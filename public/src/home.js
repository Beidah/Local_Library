// Helper functions

function bookIsBorrowed(book) {
  return book.borrows.some(borrow => !borrow.returned);
}

function mostPopular(arr) {
  return arr.sort(({count: a}, {count: b}) => a < b ? 1 : -1).slice(0, 5);
}

function findAndIncrement(arr, name, inc = 1) {
  let entry = arr.find(entry => entry.name === name);
  if (entry) {
    entry.count += inc;
  } else {
    arr.push({name, count: inc});
  }
  return arr;
}

// Test functions

function totalBooksCount(books) {
  return books.length;
}

function totalAccountsCount(accounts) {
  return accounts.length;
}

function booksBorrowedCount(books) {
  let borrowedBooks = books.filter(bookIsBorrowed);
  return borrowedBooks.length;
}

function getMostCommonGenres(books) {
  let genres = books.reduce((acc, {genre}) => {
    return findAndIncrement(acc, genre);
  }, []);
  return mostPopular(genres);
}

function getMostPopularBooks(books) {
  let barrows = books.map(({title, borrows}) => {
    return { name: title, count: borrows.length }
  });
  return mostPopular(barrows);
}

function getMostPopularAuthors(books, authors) {
  let authorCounts = books.reduce((acc, book) => {
    let { name: { first, last } } = authors.find(author => author.id === book.authorId);
    let authorName = first + " " + last;
    return findAndIncrement(acc, authorName, book.borrows.length);
  }, []);
  return mostPopular(authorCounts);
}

module.exports = {
  totalBooksCount,
  totalAccountsCount,
  booksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
