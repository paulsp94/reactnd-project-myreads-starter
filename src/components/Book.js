import React from 'react';

export const Book = ({ book, updateBook }) => {
  const { title, authors, imageLinks, shelf } = book;

  const updateStatus = async ({ target }) => {
    if (book.shelf === target.value) return;
    updateBook(book, target.value, book.shelf);
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
              backgroundImage: `url(${
                imageLinks ? imageLinks.smallThumbnail : ''
              })`,
              textAlign: 'center',
              paddingTop: 65,
            }}
          >
            {!imageLinks && 'No Cover available'}
          </div>
          <div className="book-shelf-changer">
            <select onChange={updateStatus} value={shelf || 'none'}>
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
