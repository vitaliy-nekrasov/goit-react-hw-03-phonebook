import { Component } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';
import { Box } from './Box/Box';
import { Title, Subtitle } from './App.styled';

const LS_KEY = 'contacts';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    try {
      const savedContacts = JSON.parse(localStorage.getItem(LS_KEY));
      if (savedContacts) {
        this.setState({ contacts: savedContacts });
      }
    } catch (error) {
      console.log(error);
    }
  }

  componentDidUpdate(_, prevState) {
    const { contacts } = this.state;
    if (contacts.length !== prevState.contacts.length) {
      localStorage.setItem(LS_KEY, JSON.stringify(contacts));
    }
  }

  filterInput = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  addContact = obj => {
    const findContact = this.state.contacts.find(contact =>
      contact.name.toLocaleLowerCase().includes(obj.name.toLocaleLowerCase())
    );
    findContact
      ? alert(`${obj.name} is already in contacts.`)
      : this.setState(({ contacts }) => ({
          contacts: [...contacts, obj],
        }));
  };

  deleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  visibleContacts = () => {
    const { filter, contacts } = this.state;
    const normalizeFilter = filter.toLocaleLowerCase();

    return contacts.filter(contact =>
      contact.name.toLocaleLowerCase().includes(normalizeFilter)
    );
  };

  render() {
    return (
      <Box p="20px">
        <Title>Phonebook</Title>
        <ContactForm onSubmit={this.addContact} />
        <Subtitle>Contacts</Subtitle>
        <Filter value={this.state.filter} onChange={this.filterInput} />
        <ContactList
          contacts={this.visibleContacts()}
          onClick={this.deleteContact}
        />
      </Box>
    );
  }
}
