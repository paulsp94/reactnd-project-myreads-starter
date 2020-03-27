import React from 'react';
import { update } from './BooksAPI';

export const Book = ({ book, updateBook }) => {
  const { title, authors, imageLinks, shelf } = book;

  const updateStatus = ({ target }) => {
    const oldShelf = book.shelf;
    if (oldShelf === target.value) return;
    update(book, target.value);
    updateBook(book.id, oldShelf, target.value);
  };

  return (
    <li>
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url(${imageLinks.smallThumbnail})`,
            }}
          ></div>
          <div className="book-shelf-changer">
            <select onChange={updateStatus} value={shelf}>
              <option value="move" disabled>
                Move to...
              </option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{title}</div>
        <div className="book-authors">
          {authors && authors.length && authors.join(', ')}
        </div>
      </div>
    </li>
  );
};
