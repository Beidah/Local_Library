function bookIsBorrowed(book) {
  return book.borrows.some(borrow => !borrow.returned);
}

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
  let results = [];
  let genres = books.reduce((acc, book) => {
    const genre = book.genre;
    let entry = acc.find(genreEntry => genreEntry.name === genre);
    if (entry) {
      entry.count += 1;
    } else {
      acc.push({name: genre, count: 1});
    }

    return acc;
  }, []);
  genres.sort((a, b) => a.count < b.count ? 1 : -1);
  return genres.slice(0, 5);
}

function getMostPopularBooks(books) {
  return books.map(book => {
    return { name: book.title, count: book.borrows.length }
  }).sort((a, b) => a.count < b.count ? 1 : -1).slice(0, 5);
}

function getMostPopularAuthors(books, authors) {
  let authorCounts = books.reduce((acc, book) => {
    let { name: { first, last}} = authors.find(author => author.id === book.authorId);
    let authorName = first + " " + last;
    let entry = acc.find(entry => entry.name === authorName);
    if (entry) {
      entry.count += book.borrows.length;
    } else {
      acc.push({name: authorName, count: book.borrows.length});
    }
    return acc;
  }, []).sort((a, b) => a.count < b.count ? 1 : -1);
  return authorCounts.slice(0, 5);
}

module.exports = {
  totalBooksCount,
  totalAccountsCount,
  booksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
