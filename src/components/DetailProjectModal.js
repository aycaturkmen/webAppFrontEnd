import React, { Component } from 'react'
import { Modal, Button, Row, Col, Form } from 'react-bootstrap'
import Snackbar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton'

export class DetailProjectModal extends Component{
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
                    Project Details
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
                                    disabled
                                    defaultValue = {this.props.projecttitle}
                                    placeholder = "Project Title" />
                            </Form.Group>

                            <Form.Group controlId = "description">
                                <Form.Label>Description</Form.Label>
                                <Form.Control
                                    type = "text"
                                    name = "description"
                                    disabled
                                    defaultValue = {this.props.projectdesc}
                                    placeholder = "Description" />
                            </Form.Group>

                            <Form.Group controlId = "dueDate">
                                <Form.Label>Due Date</Form.Label>
                                <Form.Control
                                    type = "date"
                                    name = "dueDate"
                                    required
                                    disabled
                                    defaultValue = {this.props.projectddate}
                                    placeholder = "Due Date" />
                            </Form.Group>

                            <Form.Group controlId = "people">
                                <Form.Label>People</Form.Label>
                                <Form.Control
                                    type = "text"
                                    name = "people"
                                    required
                                    disabled
                                    defaultValue = {this.props.projectpeople}
                                    placeholder = "People" />
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