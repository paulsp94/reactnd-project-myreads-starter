import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { getAll, get } from './BooksAPI';
import { SearchBooks } from './SearchBooks';
import { MyReads } from './MyReads';
import './App.css';

class BooksApp extends Component {
  state = {
    books: []
  };

  async componentDidMount() {
    getAll().then(books => this.setState({ books }));
  }

  updateBook = async (bookId, oldShelf, newShelf) => {
    const updatedBook = await get(bookId);
    this.setState(({ books }) => {
      const restBooks = this.state.books.filter(book => book.id !== bookId);
      if (updatedBook.shelf === 'none') return { books: restBooks };
      return { books: [...restBooks, updatedBook] };
    });
  };

  render() {
    const { books } = this.state;
    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={() => <MyReads books={books} updateBook={this.updateBook} />}
        />
        <Route
          path="/search"
          render={() => <SearchBooks updateBook={this.updateBook} />}
        />
      </div>
    );
  }
}

export default BooksApp;
