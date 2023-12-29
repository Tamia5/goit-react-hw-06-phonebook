import { Container, List, Item, Name, Btn } from './ContactList.styled';
import { deleteContact } from '../../redux/contactsSlice';
import { useSelector, useDispatch } from 'react-redux';

const ContactList = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts.list);
  const filter = useSelector(state => state.filter);

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <List>
      {filteredContacts.map(({ id, name, number }) => (
        <Item key={id}>
          <Container>
            <Name>{name}:</Name>
            <p>{number}</p>
          </Container>
          <Btn onClick={() => dispatch(deleteContact(id))}>Delete</Btn>
        </Item>
      ))}
    </List>
  );
};

export default ContactList;
