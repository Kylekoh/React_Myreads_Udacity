import React from 'react'
import { Link } from 'react-router-dom'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookShelf from './BookShelf'
import SearchInput from './SearchInput'


class BooksApp extends React.Component {
  state = {
    books : [],
    shelfChanger: []
  }

  componentDidMount = () => {
    // get all the books data
    BooksAPI.getAll().then((books) => {
      // set all the date from API as state in books
      this.setState({ books });
    });
  }

  updateShelf = ( newBook, newShelf ) => {
    BooksAPI.update(newBook, newShelf).then(response => {
      // set shelf for new or updated book
      newBook.shelf = newShelf
      // get list of books without updated or new book
      var updatedBooks = this.state.books.filter(book => book.id !== newBook.id)
      // add book to array and set newState
      updatedBooks.push(newBook)
      // set books state as a updated books
      this.setState({books:updatedBooks})
    })  
  }

  render() {
    const { books } = this.state;
    const { updateShelf } = this

    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <BookShelf 
              books = { books }
              updateShelf = { updateShelf }
            />
            <div className="open-search">
              <Link
                to="/search" 
              >Add a book</Link>
            </div>
          </div>  
        )}/>
        <Route path="/search" render={() => (
          <SearchInput 
            updateShelf = { updateShelf }
            books = { books }
          />
        )}/>
      </div> 
    )
  }
}

export default BooksApp;