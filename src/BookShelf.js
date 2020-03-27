import React from 'react';
import { Book } from './Book';

export const BookShelf = ({ title, books }) => {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{title}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books.map(book => (
            <Book book={book} />
          ))}
        </ol>
      </div>
    </div>
  );
};
