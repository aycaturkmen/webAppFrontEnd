import React, { Component } from 'react'
import { Table } from 'react-bootstrap'
import { Button, ButtonToolbar} from 'react-bootstrap'
import { AddProjectModal } from './AddProjectModal'
import { EditProjectModal } from './EditProjectModal'
import { DetailProjectModal } from './DetailProjectModal'

export class Projects extends Component {

    constructor(props){
        super(props);
        this.state = {projects:[], addModalShow: false, editModalShow: false, detailModalShow: false}
    }

    componentDidMount(){
        this.refreshList();
    }

    refreshList(){
        fetch('http://localhost:3001/api/projects/')
        .then(response => response.json())
        .then(data => {
            this.setState({projects:data});
        });
    }   

    componentDidUpdate(){
        this.refreshList();
    }


    deleteProject(projectid, projecttitle){
        if(window.confirm("'" + projecttitle + "' kullanıcısını silmek istediğinize emin misiniz?")){
            const delurl = "http://localhost:3001/api/projects/" + projectid;
            fetch(delurl, {
                method: "DELETE",
                headers: {"Accept": "application/json",
                "Content-Type": "application/json"}
            })
        }
    }

    render() {
        const {projects, projectid, projecttitle, projectdesc, projectddate, projectpeople} = this.state;
        let addModalClose = () => this.setState({addModalShow: false});
        let editModalClose = () => this.setState({editModalShow: false});
        let detailModalClose = () => this.setState({detailModalShow: false});
        return(
            <div>
            <Table className = "mt-4" striped boardered hover size="sm">
                <thead>
                    <tr>
                        <th>Project Title</th>
                        <th>Due Date </th>
                        <th>People</th>
                        <th>Options</th>
                    </tr>
                </thead>
                <tbody>
                    {projects.map(project =>
                        <tr key = {project._id}>
                        <td>{project.title}</td>
                        <td>{project.dueDate}</td>
                        <td>{project.people}</td>
                        <td>
                            <ButtonToolbar>
                                <Button
                                className = "mr-2" variant = "info"
                                onClick={() => this.setState({editModalShow: true, 
                                    projectid: project._id, 
                                    projecttitle: project.title,
                                    projectdesc: project.description,
                                    projectddate: project.dueDate,
                                    projectpeople: project.people})}
                                >
                                    Edit
                                </Button>

                                <Button
                                className = "mr-2" variant = "danger"
                                onClick={() => this.deleteProject(project._id, project.title)}
                                >
                                    Delete
                                </Button>

                                <Button
                                className = "mr-2" variant = "info"
                                onClick={() => this.setState({detailModalShow: true, 
                                    projectid: project._id, 
                                    projecttitle: project.title,
                                    projectdesc: project.description,
                                    projectddate: project.dueDate,
                                    projectpeople: project.people})}
                                >
                                    Details
                                </Button>

                                <EditProjectModal
                                show = {this.state.editModalShow}
                                onHide = {editModalClose}
                                projectid = {projectid}
                                projecttitle = {projecttitle}
                                projectdesc = {projectdesc}
                                projectddate = {projectddate}
                                projectpeople = {projectpeople}
                                />

                                <DetailProjectModal
                                show = {this.state.detailModalShow}
                                onHide = {detailModalClose}
                                projectid = {projectid}
                                projecttitle = {projecttitle}
                                projectdesc = {projectdesc}
                                projectddate = {projectddate}
                                projectpeople = {projectpeople}
                                />

                            </ButtonToolbar>
                        </td>
                        </tr>
                    )}
                </tbody>
            </Table>
            <ButtonToolbar>
                <Button
                variant = "primary"
                onClick = {() => this.setState({addModalShow: true})}
                >Add Project</Button>
                <AddProjectModal 
                show = {this.state.addModalShow}
                onHide = {addModalClose} 
                />

            </ButtonToolbar>
            </div>
        )
    }
}