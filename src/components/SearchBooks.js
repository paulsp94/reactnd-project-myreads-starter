import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { search } from '../BooksAPI';
import { Book } from './Book';
import { debounce } from '../utils/debounce';

class SearchBooks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      results: [],
    };
    this.debouncedSearch = debounce(this.directSearch, 200);
    this.handleChange = this.handleChange.bind(this);
  }

  addShelfInfo = (results) => {
    const { idBooks } = this.props;
    return results.map((result) => {
      const book = idBooks[result.id];
      return book ? book : result;
    });
  };

  directSearch = (query) =>
    search(query).then((results) =>
      this.setState({
        results: Array.isArray(results) ? this.addShelfInfo(results) : [],
      })
    );

  handleChange = ({ target }) => {
    const firstLetter = this.state.query === '';
    this.setState({ query: target.value });
    firstLetter
      ? this.directSearch(target.value)
      : this.debouncedSearch(target.value);
  };

  updateHandler = (book, newShelf, oldShelf) => {
    this.setState(({ results }) => ({
      results: results.map((result) =>
        result.id === book.id ? { ...book, shelf: newShelf } : result
      ),
    }));
    this.props.updateBook(book, newShelf, oldShelf);
  };

  render() {
    const { query, results } = this.state;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
            <input
              type="text"
              value={query}
              onChange={this.handleChange}
              placeholder="Search by title or author"
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {results.map((book) => (
              <Book key={book.id} book={book} updateBook={this.updateHandler} />
            ))}
          </ol>
          {!!query && !!results && (
            <span>No results found. Please try a different query.</span>
          )}
        </div>
      </div>
    );
  }
}

export { SearchBooks };
