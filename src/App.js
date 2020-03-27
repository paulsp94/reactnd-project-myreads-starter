import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { getAll, get } from './BooksAPI';
import { SearchBooks } from './SearchBooks';
import { MyReads } from './MyReads';
import './App.css';

class BooksApp extends Component {
  state = {
    currentlyReading: [],
    wantToRead: [],
    read: []
  };

  async componentDidMount() {
    const books = await getAll();
    const currentlyReading = books.filter(
      book => book.shelf === 'currentlyReading'
    );
    const wantToRead = books.filter(book => book.shelf === 'wantToRead');
    const read = books.filter(book => book.shelf === 'read');
    this.setState({ currentlyReading, wantToRead, read });
  }

  updateBook = async (bookId, oldShelf, newShelf) => {
    const updatedOld = this.state[oldShelf].filter(book => book.id !== bookId);
    const updatedBook = await get(bookId);
    if (newShelf !== 'none') {
      this.setState(oldState => ({
        [newShelf]: [...oldState[newShelf], updatedBook]
      }));
    }
    this.setState({
      [oldShelf]: updatedOld
    });
  };

  render() {
    const { currentlyReading, wantToRead, read } = this.state;
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
        <Route path="/search" component={SearchBooks} />
      </div>
    );
  }
}

export default BooksApp;
