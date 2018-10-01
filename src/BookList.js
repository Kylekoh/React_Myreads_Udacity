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

  	// If imageLinks exist, show its image thumbnail else show blank image.
  	const imgURL = book.imageLinks ? `${book.imageLinks.thumbnail}` : `https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Solid_white.svg/2000px-Solid_white.svg.png`
  	const divStyle = {
  		backgroundImage: 'url('+ imgURL+ ')'
  	}

    return (
	    <div className="book">
	      <div className="book-top">
	        <div className="book-cover" style={divStyle}></div>
			<BookShelfChanger 
				updateShelf = { updateShelf }
				books = { books }
				book = { book }
			/>
	      </div>
	      <div className="book-title">{book.title}</div>
	      <div className="book-authors">{book.authors ? book.authors.join(', ') : 'Unknown'}</div>
	    </div>
    )
  }
}


export default BookList;