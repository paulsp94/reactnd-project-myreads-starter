import PropTypes from 'prop-types';
import React from 'react';
import { Book } from './Book';

export const BookShelf = ({ title, books, updateBook }) => (
  <div className="bookshelf">
    <h2 className="bookshelf-title">{title}</h2>
    <div className="bookshelf-books">
      <ol className="books-grid">
        {books.map((book) => (
          <Book book={book} key={book.id} updateBook={updateBook} />
        ))}
      </ol>
    </div>
  </div>
);

BookShelf.propTypes = {
  books: PropTypes.array,
  title: PropTypes.string,
  updateBook: PropTypes.func,
};
