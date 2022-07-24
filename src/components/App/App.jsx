import React, { Component } from 'react';
import shortid from 'shortid';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Container, Title, SubTitle } from './App.styled';
import ContactForm from 'components/ContactForm';
import PhoneBook from 'components/PhoneBook';
import Filter from 'components/Filter';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');

    if (contacts) {
      const parsedContacts = JSON.parse(contacts);
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  formSubmitHandler = ({ name, number }) => {
    const newContact = {
      id: shortid.generate(),
      name: name.toLowerCase(),
      number,
    };

    if (this.state.contacts.some(contact => contact.name === newContact.name)) {
      return Notify.warning(
        `${newContact.name} is already in contacts.
        Please choose other name.`,
        {
          position: 'center-center',
          timeout: 4000,
        }
      );
    }
    this.setState(prevState => ({
      contacts: [newContact, ...prevState.contacts],
    }));
  };

  deleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  handleFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  filterContacts = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();
    const visibleContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
    return visibleContacts;
  };

  render() {
    const { deleteContact, handleFilter, filterContacts } = this;
    const { filter } = this.state;
    const filteredContacts = filterContacts();

    return (
      <Container>
        <Title>Phonebook</Title>
        <ContactForm onSubmit={this.formSubmitHandler} />
        <SubTitle>Contacts</SubTitle>
        <Filter value={filter} onChange={handleFilter} />
        <PhoneBook contacts={filteredContacts} handleDelete={deleteContact} />
      </Container>
    );
  }
}

export default App;
