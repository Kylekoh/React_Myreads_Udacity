import React, { Component } from 'react';
import PropTypes from 'prop-types'
import BookShelfChanger from './BookShelfChanger'



class BookList extends Component {
    static propTypes = {
      books: PropTypes.array.isRequired,
      updateShelf: PropTypes.func.isRequired,
      book: PropTypes.object.isRequired
    }

    render() {

  	const { books, book, updateShelf } = this.props

    return (
	    <div className="book">
	      <div className="book-top">
	        <div className="book-cover" style={{backgroundImage: `url("${book.imageLinks.thumbnail}")`}}></div>
			<BookShelfChanger 
				updateShelf = { updateShelf }
				books = { books }
				book = { book }
			/>
	      </div>
	      <div className="book-title">{book.title}</div>
	      <div className="book-authors">{book.authors}</div>
	    </div>
    )
  }
}


export default BookList;