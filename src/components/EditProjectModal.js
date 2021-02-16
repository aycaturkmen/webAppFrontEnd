import React, { Component } from 'react'
import { Modal, Button, Row, Col, Form } from 'react-bootstrap'
import Snackbar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton'

export class EditProjectModal extends Component{
    constructor(props){
        super(props);
        this.state = {users:[], snackbaropen: false, snackbarmsg: ""};
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    snackbarClose = (event) => {
        this.setState({snackbaropen: false});
    }

    componentDidMount(){
        fetch('http://localhost:3001/api/users/')
        .then(response => response.json())
        .then(data => {
            this.setState({users: data}); 
        });
    }
    
    handleSubmit(event){
        event.preventDefault();
        const patchurl = "http://localhost:3001/api/projects/" + this.props.projectid;

        fetch(patchurl, {
            method: "PATCH",
            headers: {"Accept": "application/json", 
            "Content-Type" : "application/json"},
            body: JSON.stringify({
                title: event.target.title.value,
                description: event.target.description.value,
                dueDate: event.target.dueDate.value,
                people: event.target.people.value
            })
        })
        .then(res => res.json())
        .then((result) =>
        {
            this.setState({snackbaropen: true, snackbarmsg:"'" + event.target.title.value + "' başarıyla düzenlendi!"})
        },
        (error) => {
            //alert("Yeni proje ekleme başarısız!")
            this.setState({snackbaropen: true, snackbarmsg:"'" + event.target.title.value + "' düzenlenemedi!"})
        }
        )
    }

    render(){
        return(
            <div className="container">
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
                    Edit Project
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
            
                <Row>
                    <Col sm={6} sl={1}>
                        <Form onSubmit={this.handleSubmit}>
                        <Form.Group controlId = "_id">
                                <Form.Label>Project ID</Form.Label>
                                <Form.Control
                                    type = "text"
                                    name = "_id"
                                    required
                                    disabled
                                    defaultValue = {this.props.projectid}
                                    placeholder = "Project ID" />
                            </Form.Group>

                            <Form.Group controlId = "title">
                                <Form.Label>Project Title</Form.Label>
                                <Form.Control
                                    type = "text"
                                    name = "title"
                                    required
                                    defaultValue = {this.props.projecttitle}
                                    placeholder = "Project Title" />
                            </Form.Group>

                            <Form.Group controlId = "description">
                                <Form.Label>Description</Form.Label>
                                <Form.Control
                                    type = "text"
                                    name = "description"
                                    defaultValue = {this.props.projectdesc}
                                    placeholder = "Description" />
                            </Form.Group>

                            <Form.Group controlId = "dueDate">
                                <Form.Label>Due Date</Form.Label>
                                <Form.Control
                                    type = "date"
                                    name = "dueDate"
                                    required
                                    defaultValue = {this.props.projectddate}
                                    placeholder = "Due Date" />
                            </Form.Group>

                            <Form.Group controlId = "people">
                                <Form.Label>People</Form.Label>
                                <Form.Control as= "select">
                                  {this.state.users.map(user => 
                                    <option key={user._id}>{user.name}</option>
                                    )}
                              </Form.Control>
                            </Form.Group>

                            <Form.Group>
                                <Button variant="primary" type="submit">
                                    Update Project
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