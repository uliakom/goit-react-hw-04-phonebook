import { useState, useEffect } from 'react';
import shortid from 'shortid';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Container, Title, SubTitle } from './App.styled';
import ContactForm from 'components/ContactForm';
import PhoneBook from 'components/PhoneBook';
import Filter from 'components/Filter';

const useLocalStorage = (key, defaultValue) => {
  const [state, setState] = useState(() => {
    return JSON.parse(window.localStorage.getItem(key)) ?? defaultValue;
  });
  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
};

const App = () => {
  const [contacts, setContacts] = useLocalStorage('contacts', [
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);
  const [filter, setFilter] = useState('');

  const formSubmitHandler = (name, number) => {
    const newContact = {
      id: shortid.generate(),
      name: name.toLowerCase(),
      number,
    };

    if (contacts.some(contact => contact.name === newContact.name)) {
      return Notify.warning(
        `${newContact.name} is already in contacts.
        Please choose other name.`,
        {
          position: 'center-center',
          timeout: 4000,
        }
      );
    }
    setContacts(prev => [newContact, ...prev]);
  };

  const deleteContact = id => {
    setContacts(prev => prev.filter(contact => contact.id !== id));
  };

  const handleFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const filterContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    const visibleContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
    return visibleContacts;
  };

  const filteredContacts = filterContacts();

  return (
    <Container>
      <Title>Phonebook</Title>
      <ContactForm onSubmit={formSubmitHandler} />
      <SubTitle>Contacts</SubTitle>
      <Filter value={filter} onChange={handleFilter} />
      <PhoneBook contacts={filteredContacts} handleDelete={deleteContact} />
    </Container>
  );
};

export default App;
