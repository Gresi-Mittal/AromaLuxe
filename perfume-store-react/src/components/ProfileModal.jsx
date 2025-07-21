import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { logoutUser } from '../utils';

const ProfileModal = ({ show, onHide }) => {
  const user = JSON.parse(localStorage.getItem("loggedInUser")) || {};

  const handleLogout = () => {
    logoutUser();
    onHide();
    window.location.reload();
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>User Profile</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Email: {user.email || 'Not provided'}</p>
        <p>Phone: {user.phone || 'Not provided'}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="danger" onClick={handleLogout}>
          Logout
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProfileModal;