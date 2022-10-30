import { Component } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';
import { Box } from './Box/Box';
import { Title, Subtitle } from './App.styled';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

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
          contacts: [obj, ...contacts],
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
          array={this.visibleContacts()}
          onClick={this.deleteContact}
        />
      </Box>
    );
  }
}
