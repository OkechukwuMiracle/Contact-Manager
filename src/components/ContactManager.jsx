import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./ContactManager.css";

const ContactManager = () => {
  const [contacts, setContacts] = useState([]);
  const [newContact, setNewContact] = useState({ name: "", email: "", phone: "" });
  const [editIndex, setEditIndex] = useState(null);

  const handleChange = (e) => {
    setNewContact({ ...newContact, [e.target.name]: e.target.value });
  };

  const handleAdd = () => {
    if (!newContact.name || !newContact.email || !newContact.phone) return;
    setContacts([...contacts, newContact]);
    setNewContact({ name: "", email: "", phone: "" });
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setNewContact(contacts[index]);
  };

  const handleSave = () => {
    const updatedContacts = [...contacts];
    updatedContacts[editIndex] = newContact;
    setContacts(updatedContacts);
    setEditIndex(null);
    setNewContact({ name: "", email: "", phone: "" });
  };

  const handleDelete = (index) => {
    setContacts(contacts.filter((_, i) => i !== index));
  };

  return (
    <div className="container py-4">
      <h2 className="text-center mb-4">📇 Contact Manager</h2>

      {/* Contact Form */}
      <div className="card shadow-sm p-3 mb-4">
        <div className="row g-3">
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="Name"
              name="name"
              value={newContact.name}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-4">
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              name="email"
              value={newContact.email}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-3">
            <input
              type="text"
              className="form-control"
              placeholder="Phone"
              name="phone"
              value={newContact.phone}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-1 d-flex">
            {editIndex !== null ? (
              <button className="btn btn-success w-100" onClick={handleSave}>
                <i className="fas fa-save"></i>
              </button>
            ) : (
              <button className="btn btn-primary w-100" onClick={handleAdd}>
                <i className="fas fa-plus"></i>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Contacts Table */}
      <table className="table table-striped table-hover shadow-sm">
        <thead className="table-dark">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {contacts.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center text-muted">
                <i className="fas fa-user-slash"></i> No contacts yet
              </td>
            </tr>
          ) : (
            contacts.map((contact, index) => (
              <tr key={index}>
                <td>{contact.name}</td>
                <td>{contact.email}</td>
                <td>{contact.phone}</td>
                <td className="text-center">
                  <button
                    className="btn btn-sm btn-warning me-2"
                    onClick={() => handleEdit(index)}
                  >
                    <i className="fas fa-edit"></i>
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(index)}
                  >
                    <i className="fas fa-trash-alt"></i>
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ContactManager;
