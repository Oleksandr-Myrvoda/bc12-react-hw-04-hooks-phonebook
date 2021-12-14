import { useState, useEffect } from "react";

import ContactForm from "./components/ContactForm/ContactForm";
import ContactList from "./components/ContactList";
import Filter from "./components/Filter";
import * as storage from "./services/localStorage";

import "./App.css";

const STORAGE_KEY = "contacts";

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState("");

  const addContact = ({ name, number, id }) => {
    const newContact = {
      name,
      number,
      id,
    };
    if (
      contacts
        .map((contact) => contact.name.toLowerCase())
        .includes(newContact.name.toLowerCase())
    ) {
      alert(`${newContact.name} is already in contacts`);
    } else {
      setContacts((prevContacts) => [newContact, ...prevContacts]);
    }
  };

  const deleteContact = (contactId) => {
    setContacts(contacts.filter((contact) => contact.id !== contactId));
  };

  const changeFilter = (e) => {
    setFilter(e.currentTarget.value);
  };

  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter((contacts) =>
      contacts.name.toLowerCase().includes(normalizedFilter)
    );
  };

  useEffect(() => {
    const savedContacts = storage.get(STORAGE_KEY);
    if (savedContacts) setContacts(savedContacts);
  }, []);

  useEffect(() => {
    storage.save(STORAGE_KEY, contacts.length ? contacts : null);
  }, [contacts]);

  return (
    <div className="mainBox">
      <section title="Phonebook" className="section">
        <h1>Phonebook</h1>
        <ContactForm onSubmit={addContact} />
      </section>

      <section title="Contacts" className="section">
        <h2>Contacts</h2>
        <Filter value={filter} onChange={changeFilter} />
        <ContactList
          contacts={getVisibleContacts()}
          deleteContact={deleteContact}
        />
      </section>
    </div>
  );
};

export default App;

// class App extends Component {
//   state = {
//     contacts: [
//       { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
//       { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
//       { id: "id-3", name: "Eden Clements", number: "645-17-79" },
//       { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
//     ],
//     filter: "",
//   };

//   componentDidMount() {
//     const savedContacts = storage.get(STORAGE_KEY);
//     if (savedContacts) {
//       this.setState({ contacts: savedContacts });
//     }
//   }

//   componentDidUpdate(prevProps, prevState) {
//     const { contacts } = this.state;
//     if (prevState.contacts !== contacts) {
//       storage.save(STORAGE_KEY, contacts);
//     }
//   }

//   addContact = ({ name, number, id }) => {
//     const { contacts } = this.state;
//     const newContact = {
//       name,
//       number,
//       id,
//     };
//     if (
//       contacts
//         .map((contact) => contact.name.toLowerCase())
//         .includes(newContact.name.toLowerCase())
//     ) {
//       alert(`${newContact.name} is already in contacts`);
//     } else {
//       this.setState((prevState) => ({
//         contacts: [newContact, ...prevState.contacts],
//       }));
//     }
//   };

//   deleteContact = (contactId) => {
//     this.setState((prevState) => ({
//       contacts: prevState.contacts.filter(
//         (contact) => contact.id !== contactId
//       ),
//     }));
//   };

//   changeFilter = (event) => {
//     this.setState({ filter: event.currentTarget.value });
//   };

//   getVisibleContacts = () => {
//     const { filter, contacts } = this.state;
//     const normalizedFilter = filter.toLowerCase();

//     return contacts.filter((contacts) =>
//       contacts.name.toLowerCase().includes(normalizedFilter)
//     );
//   };

//   render() {
//     const { filter } = this.state;
//     const visibleContacts = this.getVisibleContacts();
//     return (
//       <div className="mainBox">
//         <section title="Phonebook" className="section">
//           <h1>Phonebook</h1>
//           <ContactForm onSubmit={this.addContact} />
//         </section>

//         <section title="Contacts" className="section">
//           <h2>Contacts</h2>
//           <Filter value={filter} onChange={this.changeFilter} />
//           <ContactList
//             contacts={visibleContacts}
//             deleteContact={this.deleteContact}
//           />
//         </section>
//       </div>
//     );
//   }
// }

// export default App;

// npm install --save gh-pages
// npm install --save-dev prop-types
// npm i uuid
