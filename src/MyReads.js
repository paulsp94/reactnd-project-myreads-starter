import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import { BookShelf } from './BookShelf';

class MyReads extends Component {
  state = {
    currentlyReading: [],
    wantToRead: [],
    read: [],
  };

  async componentDidMount() {
    const books = await BooksAPI.getAll();
    console.log(books);

    const currentlyReading = books.filter(
      (book) => book.shelf === 'currentlyReading'
    );
    const wantToRead = books.filter((book) => book.shelf === 'wantToRead');
    const read = books.filter((book) => book.shelf === 'read');

    this.setState({ currentlyReading, wantToRead, read });
  }

  render() {
    const { currentlyReading, wantToRead, read } = this.state;
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <BookShelf title="Currently Reading" books={currentlyReading} />
            <BookShelf title="Want to Read" books={wantToRead} />
            <BookShelf title="Read" books={read} />
          </div>
        </div>
        <Link to="/search" className="open-search">
          <button>Add a book</button>
        </Link>
      </div>
    );
  }
}

export { MyReads };
