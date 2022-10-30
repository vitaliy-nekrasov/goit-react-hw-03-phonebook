import PropTypes from 'prop-types';
import { List, Item, Text, Button } from './ContactList.styled';

export function ContactList({ array, onClick }) {
  return (
    <List>
      {array.map(contact => {
        return (
          <Item key={contact.id}>
            <Text>
              {contact.name}: {contact.number}
            </Text>
            <Button type="button" onClick={() => onClick(contact.id)}>
              Delete
            </Button>
          </Item>
        );
      })}
    </List>
  );
}

ContactList.propTypes = {
  array: PropTypes.array,
};
