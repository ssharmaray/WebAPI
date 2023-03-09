import React, { useState, useEffect, Fragment } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Badge from 'react-bootstrap/Badge';
import Card from 'react-bootstrap/Card';

const CRUD = () => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [artistName, setArtistName] = useState('');
    const [feedbackComments, setFeedbackComments] = useState('');
    const [isDigitalArtwork, setIsDigitalArtwork] = useState(0);

    const [editId, setEditId] = useState('');
    const [editArtistName, setEditArtistName] = useState('');
    const [editFeedbackComments, setEditFeedbackComments] = useState('');
    const [editIsDigitalArtwork, setEditIsDigitalArtwork] = useState(0);

    
    const [data, setData] = useState([]);

    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        axios.get('http://localhost:5254/api/Feedback')
        .then((result) => {
            setData(result.data)
        })
        .catch((error) => {
                console.log(error);
        })
    }

    const handleEdit = (id) => {
        handleShow();
        axios.get(`http://localhost:5254/api/Feedback/${id}`)
        .then((result) => {
            setEditArtistName(result.data.artistName);
            setEditFeedbackComments(result.data.feedbackComments);
            setEditIsDigitalArtwork(result.data.isDigitalArtwork);
            setEditId(id);
        })
        .catch((error) => {
                console.log(error);
        })
    }

    const handleDelete = (id) => {
        if(window.confirm("Are you sure to delete this feedback?") == true)
        {
            axios.delete(`http://localhost:5254/api/Feedback/${id}`)
            .then((result) => {
                if(result.status === 200)
                {
                    toast.success("Feedback has been deleted!");
                    getData();
                }
            })
            .catch((error) => {
                toast.error(error);
            })        
        }
         
    }

    const handleUpdate = () => {
        const url = `http://localhost:5254/api/Feedback/${editId}`;
        const data = {
            "id": editId,
            "artistName": editArtistName,
            "feedbackComments": editFeedbackComments,
            "isDigitalArtwork": editIsDigitalArtwork
        }
        axios.put(url, data)
        .then((result) => {
            handleClose();
            getData();
            clear();
            toast.success("Feedback has been updated!");
        })
        .catch((error) => {
            toast.error(error);
        })

    }

    const handleSave = () => {
        const url = 'http://localhost:5254/api/Feedback';
        const data = {
            "artistName": artistName,
            "feedbackComments": feedbackComments,
            "isDigitalArtwork": isDigitalArtwork
        }
        axios.post(url, data)
        .then((result) => {
            getData();
            clear();
            toast.success("Feedback has been added!");
        })
        .catch((error) => {
            toast.error(error);
        })
    }

    const clear = () => {
        setArtistName('');
        setFeedbackComments('');
        setIsDigitalArtwork(0);
        setEditArtistName('');
        setEditFeedbackComments('');
        setEditIsDigitalArtwork(0);
        setEditId('');
    }

    const handleIsDigitalChange = (e) => {
        if(e.target.checked)
        {
            setIsDigitalArtwork(1);
        }
        else
        {
            setIsDigitalArtwork(0);
        }
    }

    const handleEditIsDigitalChange = (e) => {
        if(e.target.checked)
        {
            setEditIsDigitalArtwork(1);
        }
        else
        {
            setEditIsDigitalArtwork(0);
        }
    }   

    return (
        <Fragment>
            <ToastContainer/>
            <Card>
                <Card.Header>
                    <div>
                        <h1>
                            Dive In Colors
                        </h1>
                    </div>
                </Card.Header>
                <Card.Body>
                    <Card.Title>Recommendations and Feedback for Artists/Purchases</Card.Title>
                    <Card.Text>
                        Submit a recommendation for your favourite Artist or a brief feedback for your last purchase.
                    </Card.Text>
                </Card.Body>
                </Card>
            <Container>    
                <Row>
                    <Col colspan="4">
                        <div>
                            <h3>
                                Recommendations/Feedback
                            </h3>
                        </div>
                    </Col>
                </Row>        
                <Row>
                    <Col>
                        <input type="text" className='form-control' placeholder='Artist Name' 
                            value={artistName}
                            onChange={(e) => setArtistName(e.target.value)}
                            />
                    </Col>
                    <Col>
                        <input type="text" className='form-control' placeholder='Recommendation/Feedback' 
                        value={feedbackComments}
                        onChange={(e) => setFeedbackComments(e.target.value)}
                        />
                    </Col>
                    <Col>
                        <input type="checkbox" 
                        checked={isDigitalArtwork === 1 ? true : false}
                        value={isDigitalArtwork}
                        onChange={(e) => handleIsDigitalChange(e)}
                        />
                        <label>Digital Artwork</label>
                    </Col>
                    <Col>
                        <button className='btn btn-primary' onClick={() => {handleSave()}}>Submit</button>
                    </Col>
                </Row>
            </Container>
            <br></br>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Artist Name</th>
                        <th>Recommendation/Feedback</th>
                        <th>Medium</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data && data.length > 0 ?
                            data.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{item.artistName}</td>
                                        <td>{item.feedbackComments}</td>
                                        <td>{item.isDigitalArtwork === 1 ? 'Digital' : 'Traditional Canvas'}</td>
                                        <td colspan={2}>
                                            <button className='btn btn-primary' onClick={() => handleEdit(item.id)}>Edit</button> &nbsp;
                                            <button className='btn btn-danger' onClick={() => handleDelete(item.id)}>Delete</button> 
                                        </td>
                                    </tr>
                                    )
                            })
                            :
                            'Loading...'
                    }
                    
                </tbody>
            </Table>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Modify/Update Feedback</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Row>
                    <Col>
                        <input type="text" className='form-control' placeholder='Enter Name' 
                            value={editArtistName}
                            onChange={(e) => setEditArtistName(e.target.value)}
                            />
                    </Col>
                    <Col>
                        <input type="text" className='form-control' placeholder='Enter Recommendations/Feedback' 
                        value={editFeedbackComments}
                        onChange={(e) => setEditFeedbackComments(e.target.value)}
                        />
                    </Col>
                    <Col>
                        <input type="checkbox" 
                        checked={editIsDigitalArtwork === 1 ? true : false}
                        value={editIsDigitalArtwork}
                        onChange={(e) => handleEditIsDigitalChange(e)}
                        />
                        <label>Digital Artwork</label>
                    </Col>
                </Row>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleUpdate}>
                    Save Changes
                </Button>
                </Modal.Footer>
            </Modal>
            <Container>
                <Row>
                    <Col colspan="4">
                        <a href="https://localhost:44377/"><Badge bg="secondary">Back To Home</Badge></a>
                    </Col>
                </Row> 
            </Container>
        </Fragment>
    )
}

export default CRUD;

