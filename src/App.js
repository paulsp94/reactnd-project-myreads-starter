import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { getAll, update, get } from './BooksAPI';
import { SearchBooks } from './components/SearchBooks';
import { MyReads } from './components/MyReads';
import './App.css';

class BooksApp extends Component {
  state = {
    idBooks: {},
    currentlyReading: [],
    wantToRead: [],
    read: [],
  };

  async componentDidMount() {
    const books = await getAll();
    const idBooks = {};
    const shelfs = { currentlyReading: [], wantToRead: [], read: [] };
    books.forEach((book) => {
      shelfs[book.shelf].push(book);
      idBooks[book.id] = book;
    });
    this.setState({ ...shelfs, books, idBooks });
  }

  updateBook = async (book, newShelf, oldShelf) => {
    const { idBooks } = this.state;
    await update(book, newShelf);
    const newBook = await get(book.id);
    const newIdBooks = idBooks;
    newIdBooks[book.id] = newBook;
    this.setState({ idBooks: newIdBooks });

    if (oldShelf !== 'none' && oldShelf !== undefined) {
      this.setState(({ [oldShelf]: shelf }) => ({
        [oldShelf]: shelf.filter((item) => item.id !== book.id),
      }));
    }
    if (newShelf !== 'none') {
      this.setState(({ [newShelf]: shelf }) => ({
        [newShelf]: [...shelf, newBook],
      }));
    }
  };

  render() {
    const { currentlyReading, wantToRead, read, idBooks } = this.state;
    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={() => (
            <MyReads
              currentlyReading={currentlyReading}
              wantToRead={wantToRead}
              read={read}
              updateBook={this.updateBook}
            />
          )}
        />
        <Route
          path="/search"
          render={() => (
            <SearchBooks idBooks={idBooks} updateBook={this.updateBook} />
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
