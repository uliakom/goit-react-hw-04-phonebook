import PropTypes from 'prop-types';
import ContactListItem from './ContactListItem';
import { Container, ContactList } from './PhoneBook.styled';

const PhoneBook = ({ contacts, handleDelete }) => {
  return (
    <Container>
      <ContactList>
        {contacts.map(contact => (
          <ContactListItem
            key={contact.id}
            contact={contact}
            handleDelete={handleDelete}
          />
        ))}
      </ContactList>
    </Container>
  );
};

PhoneBook.prototype = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    })
  ),
  handleDelete: PropTypes.func.isRequired,
};
export default PhoneBook;
