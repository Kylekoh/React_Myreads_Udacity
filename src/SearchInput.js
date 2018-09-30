import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import BookList from './BookList'
import * as BooksAPI from './BooksAPI'
import PropTypes from 'prop-types'


class SearchInput extends Component {
  static propTypes = {
    updateShelf: PropTypes.func.isRequired,
    books: PropTypes.array.isRequired
  }

  state = {
  	query: '',
  	newBooks: [],
  	searchError: false,
  }

  // update query as typed and trim it
  updateQuery = (query) => {
  	this.setState({ query: query.trim() })
  } 
  // show results of search
  getBooks = (query) => {
    this.updateQuery(query);
 	if(this.state.query) {
 	  BooksAPI.search(this.state.query, 20).then((books) => {
 	  	books.length > 0 ? this.setState({ newBooks:books, searchError:false }) : this.setState({ newBooks:[], searchError:true })
 	  })	
 	} else {
 	  this.setState({ newBooks:[], searchError:false })
 	}
  }

  render() {
  	const { updateShelf, books } = this.props
    const { query, newBooks, searchError } = this.state    

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link
          	to="/"
          	className="close-search" 
          	>Close</Link>
          <div className="search-books-input-wrapper">
            <input 
              type="text" 
              placeholder="Search by title or author"
              onChange={(event) => this.getBooks(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
        	{newBooks.length > 0 ? (
	          <ol className="books-grid">
	          	{newBooks.map((newBook) => (
	         	  <li key={newBook.id}>
	         	  	<BookList
	         	  	  book = { newBook }	
	         	  	  books = { books }
	         	  	  updateShelf = { updateShelf }
	         	  	/>
	         	  </li>
	          	))}
	          </ol>
	        ) : searchError && (
	          <div>
	          	<h3>Please type other word</h3>
	          </div>
	        )}  
        </div>
      </div>
    );
  }
}


export default SearchInput