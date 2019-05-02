import React, { Component } from "react";
import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";
import SearchResultContainer from "../components/SearchResultContainer";
import "../pages/savedBook.css"
class Books extends Component {
  state = {
    books: [],
    title: "",
    author: "",
    synopsis: ""
  };

  componentDidMount() {
    this.loadBooks();
  }

  loadBooks = () => {
    API.getBooks()
      .then(res =>
        this.setState({ books: res.data, title: "", author: "", synopsis: "" })
      )
      .catch(err => console.log(err));
  };

  deleteBook = id => {
    API.deleteBook(id)
      .then(res => this.loadBooks())
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.title && this.state.author) {
      API.saveBook({
        title: this.state.title,
        author: this.state.author,
        synopsis: this.state.synopsis
      })
        .then(res => this.loadBooks())
        .catch(err => console.log(err));
    }
  };

  render() {
    return (
      <Container fluid>
        <Row>          
          <Col size="md-12">
            <Jumbotron>
                <img src=""></img>
              <h1>Books On My List</h1>
            </Jumbotron>
            {this.state.books.length ? (
              <List className="list-group">
                {this.state.books.map(book => (
                  <ListItem className="list-group-item" key={book.id}>
                  <strong>{book.title} by {book.authors} </strong>
                  <a href={book.link} target="_black">
                  <button type="button" className="btn btn-primary mt-3 btnNew">View</button>
                  </a>
                  <button type="button"  onClick={() => this.deleteBook(book._id)} className="btn btn-primary mt-3 btnNew">Delete</button>
                  <p></p>
                  <Row>
                      <Col size="md-2">
                  <img alt={book.title} className="img-fluid" src={book.image} />
                  </Col>
                  <Col size="md-10">
                  <span id="synopsis">{book.synopsis}</span>    
                  </Col></Row>      
                  </ListItem>             
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Books;
