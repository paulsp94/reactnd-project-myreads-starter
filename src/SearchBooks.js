import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { search } from './BooksAPI';
import { Book } from './Book';
import { debounce } from './utils/debounce';

class SearchBooks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      results: [],
    };
    this.debouncedSearch = debounce(this.debouncedSearch, 200);
    this.handleChange = this.handleChange.bind(this);
  }

  debouncedSearch = (query) =>
    search(query).then((results) =>
      this.setState({ results: Array.isArray(results) ? results : [] })
    );

  directSearch = (query) =>
    search(query).then((results) =>
      this.setState({ results: Array.isArray(results) ? results : [] })
    );

  handleChange = ({ target }) => {
    const firstLetter = this.state.query === '';
    this.setState({ query: target.value });
    firstLetter
      ? this.directSearch(target.value)
      : this.debouncedSearch(target.value);
  };

  render() {
    const { query, results } = this.state;
    const { updateBook } = this.props;

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
              <Book key={book.id} book={book} updateBook={updateBook} />
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

export { SearchBooks };
