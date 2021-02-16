import React, { Component } from 'react'
import { Table } from 'react-bootstrap'
import { Button, ButtonToolbar} from 'react-bootstrap'
import { AddUserModal } from './AddUserModal'
import { EditUserModal } from './EditUserModal'
import { DetailUserModal } from './DetailUserModal'

export class Users extends Component {

    constructor(props){
        super(props);
        this.state = {users:[], addModalShow: false, editModalShow: false, detailModalShow: false}
    }

    componentDidMount(){
        this.refreshList();
    }

    refreshList(){
        fetch('http://localhost:3001/api/users/')
        .then(response => response.json())
        .then(data => {
            this.setState({users:data});
        });
    }   

    componentDidUpdate(){
        this.refreshList();
    }


    deleteUser(userid, username){
        if(window.confirm("'" + username + "' kullanıcısını silmek istediğinize emin misiniz?")){
            const delurl = "http://localhost:3001/api/users/" + userid;
            fetch(delurl, {
                method: "DELETE",
                headers: {"Accept": "application/json",
                "Content-Type": "application/json"}
            })
        }
    }

    render() {
        const {users, userid, username, userbdate, userpos, userproj} = this.state;
        let addModalClose = () => this.setState({addModalShow: false});
        let editModalClose = () => this.setState({editModalShow: false});
        let detailModalClose = () => this.setState({detailModalShow: false});
        return(
            <div>
            <Table className = "mt-4" striped boardered hover size="sm">
                <thead>
                    <tr>
                        <th>User Name</th>
                        <th>Birth Date</th>
                        <th>Position</th>
                        <th>Options</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user =>
                        <tr key = {user._id}>
                        <td>{user.name}</td>
                        <td>{user.birthDate}</td>
                        <td>{user.position}</td>
                        <td>
                            <ButtonToolbar>
                                <Button
                                className = "mr-2" variant = "info"
                                onClick={() => this.setState({editModalShow: true, 
                                    userid: user._id, 
                                    username: user.name,
                                    userbdate: user.birthDate,
                                    userpos: user.position,
                                    userproj: user.projects})}
                                >
                                    Edit
                                </Button>

                                <Button
                                className = "mr-2" variant = "danger"
                                onClick={() => this.deleteUser(user._id, user.name)}
                                >
                                    Delete
                                </Button>

                                <Button
                                className = "mr-2" variant = "info"
                                onClick={() => this.setState({detailModalShow: true, 
                                    userid: user._id, 
                                    username: user.name,
                                    userbdate: user.birthDate,
                                    userpos: user.position,
                                    userproj: user.projects})}
                                >
                                    Details
                                </Button>

                                <EditUserModal
                                show = {this.state.editModalShow}
                                onHide = {editModalClose}
                                userid = {userid}
                                username = {username}
                                userbdate = {userbdate}
                                userpos = {userpos}
                                userproj = {userproj}
                                />

                                <DetailUserModal
                                show = {this.state.detailModalShow}
                                onHide = {detailModalClose}
                                userid = {userid}
                                username = {username}
                                userbdate = {userbdate}
                                userpos = {userpos}
                                userproj = {userproj}
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
                >Add User</Button>
                <AddUserModal 
                show = {this.state.addModalShow}
                onHide = {addModalClose} 
                />
            </ButtonToolbar>
            </div>
        )
    }
}