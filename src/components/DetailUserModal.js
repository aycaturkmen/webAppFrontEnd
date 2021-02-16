import React, { Component } from 'react'
import { Modal, Button, Row, Col, Form } from 'react-bootstrap'
import Snackbar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton'

export class DetailUserModal extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className="container">
                <Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                    User Details
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
            
                <Row>
                    <Col sm={6} sl={1}>
                        <Form onSubmit={this.handleSubmit}>
                        <Form.Group controlId = "_id">
                                <Form.Label>User ID</Form.Label>
                                <Form.Control
                                    type = "text"
                                    name = "_id"
                                    required
                                    disabled
                                    defaultValue = {this.props.userid}
                                    placeholder = "User ID" />
                            </Form.Group>

                            <Form.Group controlId = "name">
                                <Form.Label>*User Name</Form.Label>
                                <Form.Control
                                    type = "text"
                                    name = "name"
                                    required
                                    disabled
                                    defaultValue = {this.props.username}
                                    placeholder = "User Name" />
                            </Form.Group>

                            <Form.Group controlId = "birthDate">
                                <Form.Label>Birth Date</Form.Label>
                                <Form.Control
                                    type = "date"
                                    name = "birthDate"
                                    disabled
                                    defaultValue = {this.props.userbdate}
                                    placeholder = "Birth Date" />
                            </Form.Group>

                            <Form.Group controlId = "position">
                                <Form.Label>*Position</Form.Label>
                                <Form.Control
                                    type = "text"
                                    name = "position"
                                    required
                                    disabled
                                    defaultValue = {this.props.userpos}
                                    placeholder = "Position" />
                            </Form.Group>

                            <Form.Group controlId = "projects">
                                <Form.Label>Projects</Form.Label>
                                <Form.Control
                                    type = "text"
                                    name = "projects"
                                    disabled
                                    defaultValue = {this.props.userproj}
                                    placeholder = "Projects" />
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