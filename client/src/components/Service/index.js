import React, { Component } from 'react';
import { TailSpin } from 'react-loader-spinner';
import NavBar from '../Navbar';
import Footer from '../Footer';
import './index.css';
import AuthorCard from '../AuthorCard'; 

class Service extends Component {
  state = {
    userInput: '',
    authorList: [],
    filteredAuthorList: [],
    isLoadingAuthors: false,
  };

  getAuthorDetails = async () => {
    const { userInput } = this.state;
    this.setState({ isLoadingAuthors: true });

    const url ='http://localhost:3005/author'; // Update with your backend endpoint for authors
    try {
      const response = await fetch(url);
      const data = await response.json();

      if (response.ok) {
        this.setState({
          authorList: data,
          filteredAuthorList: data,
          isLoadingAuthors: false,
        });
      }
    } catch (error) {
      console.error('Error fetching author details:', error);
      this.setState({ isLoadingAuthors: false });
    }
  };

  onChangeCity = (event) => {
    this.setState({ userInput: event.target.value });
  };

  searchAuthors = () => {
    const { userInput, authorList } = this.state;
    const filteredAuthors = authorList.filter(
      (author) => author.name.toLowerCase().includes(userInput.toLowerCase())
    );
    this.setState({ filteredAuthorList: filteredAuthors });
  };

  componentDidMount() {
    // Fetch author details when the component mounts
    this.getAuthorDetails();
  }

  render() {
    const { userInput, filteredAuthorList, isLoadingAuthors } = this.state;
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
            <button className="search-btn" type="button" onClick={this.searchAuthors}>
              Search Authors
            </button>
          </div>
          {isLoadingAuthors ? (
            <TailSpin />
          ) : (
            <div className="author-card-container">
              <h2>Author Details</h2>
              <ul className="unorder-list-container">
                {filteredAuthorList.map((author) => (
                  <AuthorCard key={author.author_id} author={author} />
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

export default Service;