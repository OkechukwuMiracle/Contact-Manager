import React, { useState, useEffect } from 'react';
import { Search, Plus, Edit2, Trash2, Save, X, Users, Phone, Mail, AlertCircle, CheckCircle } from 'lucide-react';

const ContactManager = () => {
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddingContact, setIsAddingContact] = useState(false);
  const [editingContact, setEditingContact] = useState(null);
  const [alert, setAlert] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [errors, setErrors] = useState({});

  // Load contacts from localStorage
  useEffect(() => {
    const savedContacts = localStorage.getItem('contacts');
    if (savedContacts) setContacts(JSON.parse(savedContacts));
  }, []);

  // Save contacts to localStorage
  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const showAlert = (message, type = 'success') => {
    setAlert({ message, type });
    setTimeout(() => setAlert(null), 3000);
  };

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePhone = (phone) => /^[\+]?[1-9][\d]{0,15}$/.test(phone.replace(/[\s\-\(\)]/g, ''));

  const validateForm = (data) => {
    const newErrors = {};
    if (!data.name.trim()) newErrors.name = 'Name is required';
    if (!data.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(data.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!data.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!validatePhone(data.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    if (editingContact) {
      const updatedContacts = contacts.map((c) =>
        c.id === editingContact.id ? { ...c, ...formData } : c
      );
      setContacts(updatedContacts);
      setEditingContact(null);
      showAlert('Contact updated successfully!');
    } else {
      const newContact = { id: Date.now(), ...formData, createdAt: new Date().toISOString() };
      setContacts([...contacts, newContact]);
      setIsAddingContact(false);
      showAlert('Contact added successfully!');
    }

    setFormData({ name: '', email: '', phone: '' });
    setErrors({});
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      setContacts(contacts.filter((c) => c.id !== id));
      showAlert('Contact deleted successfully!', 'error');
    }
  };

  const handleEdit = (contact) => {
    setEditingContact(contact);
    setFormData({ name: contact.name, email: contact.email, phone: contact.phone });
    setErrors({});
  };

  const handleCancel = () => {
    setEditingContact(null);
    setIsAddingContact(false);
    setFormData({ name: '', email: '', phone: '' });
    setErrors({});
  };

  const filteredContacts = contacts.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.phone.includes(searchTerm)
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-6 flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
              <Users className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Contact Manager</h1>
              <p className="text-gray-600">Manage your contacts efficiently</p>
            </div>
          </div>
          <button
            onClick={() => setIsAddingContact(true)}
            className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-2 rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all duration-200 flex items-center gap-2 font-medium"
          >
            <Plus size={20} />
            Add Contact
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Alerts */}
        {alert && (
          <div
            className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${
              alert.type === 'success'
                ? 'bg-green-50 text-green-800 border border-green-200'
                : 'bg-red-50 text-red-800 border border-red-200'
            }`}
          >
            {alert.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
            {alert.message}
          </div>
        )}

        {/* Search */}
        <div className="mb-8 relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search contacts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
          />
        </div>

        {/* Add/Edit Form */}
        {(isAddingContact || editingContact) && (
          <div className="mb-8 bg-white p-6 rounded-xl shadow-lg border">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              {editingContact ? 'Edit Contact' : 'Add New Contact'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-3 gap-4">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={`w-full px-3 py-2 border rounded-lg outline-none ${
                      errors.name ? 'border-red-300 focus:ring-red-500' : 'border-gray-200 focus:ring-purple-500'
                    }`}
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>
                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={`w-full px-3 py-2 border rounded-lg outline-none ${
                      errors.email ? 'border-red-300 focus:ring-red-500' : 'border-gray-200 focus:ring-purple-500'
                    }`}
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>
                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className={`w-full px-3 py-2 border rounded-lg outline-none ${
                      errors.phone ? 'border-red-300 focus:ring-red-500' : 'border-gray-200 focus:ring-purple-500'
                    }`}
                  />
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-2 rounded-lg flex items-center gap-2"
                >
                  <Save size={16} />
                  {editingContact ? 'Update Contact' : 'Save Contact'}
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="bg-gray-500 text-white px-6 py-2 rounded-lg flex items-center gap-2"
                >
                  <X size={16} />
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Contacts */}
        {filteredContacts.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl shadow-sm border">
            <Users size={48} className="text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-500 mb-2">
              {contacts.length === 0 ? 'No contacts yet' : 'No contacts found'}
            </h3>
            <p className="text-gray-400">
              {contacts.length === 0 ? 'Add your first contact to get started!' : 'Try a different search term'}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="text-sm text-gray-600 mb-4">
              Showing {filteredContacts.length} of {contacts.length} contacts
            </div>

            {/* Table view (desktop) */}
            <div className="hidden md:block bg-white rounded-xl shadow-sm border overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Name</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Email</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Phone</th>
                    <th className="px-6 py-4 text-right text-sm font-medium text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredContacts.map((c) => (
                    <tr key={c.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium text-gray-900">{c.name}</td>
                      <td className="px-6 py-4 text-gray-600 flex items-center gap-2">
                        <Mail size={14} /> {c.email}
                      </td>
                      <td className="px-6 py-4 text-gray-600 flex items-center gap-2">
                        <Phone size={14} /> {c.phone}
                      </td>
                      <td className="px-6 py-4 text-right flex justify-end gap-2">
                        <button
                          onClick={() => handleEdit(c)}
                          className="text-blue-600 hover:text-blue-800 p-2 rounded-lg hover:bg-blue-50"
                          title="Edit"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(c.id)}
                          className="text-red-600 hover:text-red-800 p-2 rounded-lg hover:bg-red-50"
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Card view (mobile) */}
            <div className="grid gap-4 md:hidden">
              {filteredContacts.map((c) => (
                <div key={c.id} className="bg-white rounded-xl shadow-sm border p-4">
                  <h3 className="font-semibold text-gray-900 text-lg">{c.name}</h3>
                  <div className="mt-2 space-y-1 text-gray-600">
                    <div className="flex items-center gap-2">
                      <Mail size={14} /> {c.email}
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone size={14} /> {c.phone}
                    </div>
                  </div>
                  <div className="mt-3 flex gap-2">
                    <button
                      onClick={() => handleEdit(c)}
                      className="text-blue-600 hover:text-blue-800 px-3 py-1 rounded-lg hover:bg-blue-50 flex items-center gap-1"
                    >
                      <Edit2 size={14} /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(c.id)}
                      className="text-red-600 hover:text-red-800 px-3 py-1 rounded-lg hover:bg-red-50 flex items-center gap-1"
                    >
                      <Trash2 size={14} /> Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactManager;
