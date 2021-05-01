import React from 'react'
import {Modal, Container, Row, Col} from 'react-bootstrap';

const MovieCardModal = (props) => {

    return (
        <>
            <Modal className="movie-modal-container" show={props.showModal} onHide={props.hideModal} size="xl" centered>
                <Modal.Body>
                    <Container>
                        <Row>
                            <Col className="text-center">
                                <img src={props.url} alt={props.title}/>
                            </Col>
                            <Col>
                                <h3 className="movie-modal-title">{props.title}</h3>
                                <p>{props.description}</p>
                            </Col>
                        </Row>
                    </Container>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default MovieCardModal