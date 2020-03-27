import React from 'react';
import { Route } from 'react-router-dom';
import { SearchBooks } from './SearchBooks';
import { MyReads } from './MyReads';
import './App.css';

const BooksApp = () => (
  <div className="app">
    <Route exact path="/" component={MyReads} />
    <Route path="/search" component={SearchBooks} />
  </div>
);

export default BooksApp;
