import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { v4 as uuid } from "uuid";
import "./App.css";
import Header from "./Header";
import AddContact from "./AddContact";
import ContactList from "./ContactList";


function App() {
  const LOCAL_STORAGE_KEY = "contacts";
  const [contacts, setContacts] = useState(
    JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) ?? []
  );
  
  const addContactHandler = (contact) => {
    console.log(contact);
    setContacts([...contacts, { id: uuid(), ...contact }]);
  };

  const removeContactHandler = (id) => {
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    });

    setContacts(newContactList);
  };

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);

  return (
    <Router>
      <div className="ui container">
        <Header />
        <nav>
          <ul>
            <li>
              <Link to="/list">Contact List</Link>
            </li>
            <li>
              <Link to="/add">Add Contact</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/list" 
          element={<ContactList contacts={contacts} 
          getContactId={removeContactHandler} />}/>
          <Route path="/add" 
          element={<AddContact 
          addContactHandler={addContactHandler} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
