// LibraryService.js
import React, { useState } from 'react';
import './LibraryService.css';

const LibraryService = () => {
  const initialBooks = [
    /*...*/ // (Add 30 book titles here)
    "Book 1", "Book 2", "Book 3", //... upto "Book 30"
  ];

  const [books, setBooks] = useState(initialBooks.map((book) => ({ title: book, reserved: false })));
  const [reservedBooks, setReservedBooks] = useState([]);

  const handleReserve = (title) => {
    if (reservedBooks.length < 5) {
      setBooks(books.map(book => book.title === title ? { ...book, reserved: true } : book));
      setReservedBooks([...reservedBooks, title]);
    } else {
      alert("You can reserve a maximum of 5 books.");
    }
  };

  const handleCheckout = () => {
    if (reservedBooks.length > 0) {
      alert(`Successfully reserved: ${reservedBooks.join(", ")}`);
    } else {
      alert("No books selected for reservation.");
    }
  };

  return (
    <div>
      <h2>Library Book Service</h2>
      <ul className="book-list">
        {books.map((book, index) => (
          <li key={index}>
            {book.title}
            {!book.reserved && <button onClick={() => handleReserve(book.title)}>Reserve</button>}
          </li>
        ))}
      </ul>
      <button onClick={handleCheckout} className="checkout-button">Checkout</button>
    </div>
  );
};

export default LibraryService;
