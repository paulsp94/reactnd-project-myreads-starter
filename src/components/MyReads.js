import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import { BookShelf } from './BookShelf';

const MyReads = ({ currentlyReading, wantToRead, read, updateBook }) => (
  <div className="list-books">
    <div className="list-books-title">
      <h1>MyReads</h1>
    </div>
    <div className="list-books-content">
      <div>
        <BookShelf
          title="Currently Reading"
          books={currentlyReading}
          updateBook={updateBook}
        />
        <BookShelf
          title="Want to Read"
          books={wantToRead}
          updateBook={updateBook}
        />
        <BookShelf title="Read" books={read} updateBook={updateBook} />
      </div>
    </div>
    <Link to="/search" className="open-search">
      <button>Add a book</button>
    </Link>
  </div>
);

MyReads.propTypes = {
  currentlyReading: PropTypes.array,
  read: PropTypes.array,
  wantToRead: PropTypes.array,
  updateBook: PropTypes.func,
};

export { MyReads };
