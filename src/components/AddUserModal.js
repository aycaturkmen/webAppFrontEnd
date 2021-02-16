import React, { Component } from 'react'
import { Modal, Button, Row, Col, Form } from 'react-bootstrap'
import Snackbar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton'

export class AddUserModal extends Component{
    constructor(props){
        super(props);

        this.state = {snackbaropen: false, snackbarmsg: ""};
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    snackbarClose = (event) => {
        this.setState({snackbaropen: false});
    }

    handleSubmit(event){
        event.preventDefault();
        const posturl = "http://localhost:3001/api/users/newUser";

        fetch(posturl, {
            method: "POST",
            headers: {"Accept": "application/json", 
            "Content-Type" : "application/json"},
            body: JSON.stringify({
                name: event.target.name.value,
                birthDate: event.target.birthDate.value,
                position: event.target.position.value,
                projects: event.target.projects.value
            })
        })
        .then(res => res.json())
        .then((result) =>
        {
            //alert(event.target.name.value + " başarıyla DB'ye eklendi!");
            this.setState({snackbaropen: true, snackbarmsg:"'" + event.target.name.value + "' başarıyla database'e eklendi!"})
        },
        (error) => {
            //alert("Yeni user ekleme başarısız!")
            this.setState({snackbaropen: true, snackbarmsg:"'" + event.target.name.value + "' database'e eklenemedi!"})
        }
        )
    }

    render(){
        return(
            <div className="contaniner">
                <Snackbar
              anchorOrigin = {{vertical: "bottom", horizontal: "left" }}
              open = {this.state.snackbaropen}
              autoHideDuration = {2000}
              onClose = {this.snackbarClose}

              message = {<span id= "message-id">{this.state.snackbarmsg}</span>}
              action = {[
                  <IconButton
                  key = "close"
                  arial-label = "close"
                  color = "inherit"
                  onClick = {this.snackbarClose}
                  >
                      x
                  </IconButton>
              ]}

              >

              </Snackbar>


            <Modal
            {...this.props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                Add New User
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Row>
                  <Col sm={6}>
                      <Form onSubmit={this.handleSubmit}>
                          <Form.Group controlId = "name">
                              <Form.Label>*User Name</Form.Label>
                              <Form.Control
                                type = "text"
                                name = "name"
                                required
                                placeholder = "User Name" />
                          </Form.Group>

                          <Form.Group controlId = "birthDate">
                              <Form.Label>Birth Date</Form.Label>
                              <Form.Control
                                type = "date"
                                name = "birthDate"
                                placeholder = "Birth Date" />
                          </Form.Group>

                          <Form.Group controlId = "position">
                              <Form.Label>*Position</Form.Label>
                              <Form.Control
                                type = "text"
                                name = "position"
                                required
                                placeholder = "Position" />
                          </Form.Group>

                          <Form.Group controlId = "projects">
                              <Form.Label>Projects</Form.Label>
                              <Form.Control
                                type = "text"
                                name = "projects"
                                placeholder = "Projects" />
                          </Form.Group>

                          <Form.Group>
                              <Button variant="primary" type="submit">
                                  Add User
                              </Button>
                          </Form.Group>

                      </Form>
                  </Col>
              </Row>
            </Modal.Body>
            <Modal.Footer>
                <Button variant = "danger" onClick={this.props.onHide}>Close</Button>
            </Modal.Footer>
            </Modal>
            </div>
        )
    }

}