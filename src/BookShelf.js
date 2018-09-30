import React, { Component } from 'react';
import BookList from './BookList';
import PropTypes from 'prop-types'

// set collection of shelf as shelves
const shelves = [
  	{
  		key: 'currentlyReading',
  		name: 'Currently Reading'
  	},
  	{
  		key: 'wantToRead',
  		name: 'Want To Read'
  	},
  	{
  		key: 'read',
  		name: 'Read'
  	}
  ]

class BookShelf extends Component {	
  static propTypes = {
    books: PropTypes.array.isRequired,
    updateShelf: PropTypes.func.isRequired
  }

  render() {
  	const { books, updateShelf } = this.props;

  	// get the books which have a same shelf key
  	function booksForShelf(shelfKey) {
	  return books.filter(book => 
		book.shelf === shelfKey)	
	}

    return (
      <div className="list-books-content">
        	{shelves.map((shelf) => ( 
        	<div key={shelf.key}>		
	          <div className="bookshelf">
	            <h2 className="bookshelf-title">{shelf.name}</h2>
	            <div className="bookshelf-books">      
	              <ol className="book-grid"> 
	                {booksForShelf(shelf.key).map((book) => (
	                  <li key={book.id} className="contact-list-item">
	                    <BookList 
	                    	book = { book }
	                    	books = { books }
	                    	updateShelf = { updateShelf }
	                    />
	                  </li>
	                ))}
	              </ol>
	            </div>
	          </div>
	        </div>  
	        ))}           
      </div>  
    );
  }
}



export default BookShelf;