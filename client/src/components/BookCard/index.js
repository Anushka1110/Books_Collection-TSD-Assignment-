import React from 'react';
import './index.css'; 

const BookCard = ({ book }) => {
  return (
    <div className="book-card">
      <h3>Title: {book.title}</h3>
      <p>Author: {book.author}</p>
      <p>Book ID: {book.book_id}</p>
      <p>Author ID: {book.author_id}</p>
      <p>Rating: {book.rating}</p>
      <p>Rating Count: {book.rating_count}</p>
      <p>Review Count: {book.review_count}</p>
      <p>Description: {book.description}</p>
      <p>Pages: {book.pages}</p>
      <p>Date of Publication: {book.date_of_publication}</p>
      <p>Edition Language: {book.edition_language}</p>
      <p>Price: {book.price}</p>
      <p>Online Stores: {book.online_stores}</p>
    </div>
  );
};

export default BookCard;
