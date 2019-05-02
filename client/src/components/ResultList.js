import React from "react";
import { Component } from "react";
import { ListItem, List } from "./List";
import { Col, Row } from "../components/Grid";
import "../pages/savedBook.css";
class ResultList extends Component {
  render() {
    return (
      <List className="list-group">
        {this.props.results.map(result => (
          <ListItem className="list-group-item" key={result.id}>
            <div style={{ float: "left" }}>
              <strong>
                {result.volumeInfo.title} by {result.volumeInfo.authors}{" "}
              </strong>
            </div>
            <a href={result.volumeInfo.previewLink} target="_black">
              <button type="button" className="btn btn-primary mt-3 btnNew">
                View
              </button>
            </a>
            <button
              type="button"
              id={result.id}
              onClick={this.props.saveAction}
              className="btn btn-primary mt-3 btnNew"
            >
              Save
            </button>
            <br />
            <br />
            <Row>
              <Col size="md-2">
                <img
                  alt={result.volumeInfo.title}
                  className="img-fluid"
                  src={result.volumeInfo.imageLinks.smallThumbnail}
                />
              </Col>
              <Col size="md-10">
                <span id="synopsis">{result.volumeInfo.description}</span>
              </Col>
            </Row>
          </ListItem>
        ))}
      </List>
    );
  }
}
export default ResultList;
