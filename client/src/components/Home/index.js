import React, { Component } from 'react';
import { TailSpin } from 'react-loader-spinner';
import NavBar from '../Navbar';
import Footer from '../Footer';
import './index.css';
import BookCard from '../BookCard'; 

class Home extends Component {
  state = {
    userInput: '',
    bookList: [],
    filteredBookList: [], 
    isLoadingBooks: false,
  };

  getBookDetails = async () => {
    const { userInput, bookList } = this.state;
    this.setState({ isLoadingBooks: true });

    const url ='http://localhost:3005/book'; 
    try {
      const response = await fetch(url);
      const data = await response.json();

      if (response.ok) {
        this.setState({ bookList: data, filteredBookList: data, isLoadingBooks: false });
      }
    } catch (error) {
      console.error('Error fetching book details:', error);
      this.setState({ isLoadingBooks: false });
    }
  };

  onChangeCity = (event) => {
    this.setState({ userInput: event.target.value });
  };

  searchBooks = () => {
    const { userInput, bookList } = this.state;
    const filteredBooks = bookList.filter(
      (book) => book.title.toLowerCase().includes(userInput.toLowerCase())
    );
    this.setState({ filteredBookList: filteredBooks });
  };

  componentDidMount() {
    // Fetch book details when the component mounts
    this.getBookDetails();
  }

  render() {
    const { userInput, filteredBookList, isLoadingBooks } = this.state;
    return (
      <>
        <NavBar />
        <div className="home-bg-container">
          <div className="input-btn-container">
            <input
              id="userInput"
              className="input-user"
              type="search"
              value={userInput}
              onChange={this.onChangeCity}
            />
            <button className="search-btn" type="button" onClick={this.searchBooks}>
              Search Books
            </button>
          </div>
          {isLoadingBooks ? (
            <TailSpin />
          ) : (
            <div className="book-card-container">
              <h2>Book Details</h2>
              <ul className="unorder-list-container">
                {filteredBookList.map((book) => (
                  <BookCard key={book.book_id} book={book} />
                ))}
              </ul>
            </div>
          )}
        </div>
        <Footer />
      </>
    );
  }
}

export default Home;