import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactsForm/ContactForm';
import { Filter } from './Filt/Filter';
import { ContactList } from './ContactList/ContactList';
const LOCAL_STORAGE_KEY = 'contacts';
export const App = () => {
  const [contacts, setContacts] = useState([
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);
  const [filt, setFilter] = useState("");


  useEffect(() => {
    const contactslocaolStorage = localStorage.getItem(LOCAL_STORAGE_KEY);
    const parseContactslocaolStorage = JSON.parse(contactslocaolStorage);
    if (parseContactslocaolStorage) {
      setContacts(parseContactslocaolStorage);
    }

  }, []);

  const chancheContact = ({ name, number }) => {
    const isFindCopyContact = contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
    if (isFindCopyContact) {
      alert(`${name} is already in contacts`);
      return;
    }
    const Contact = { id: nanoid(), name, number };
    setContacts([Contact, ...contacts]);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify([Contact, ...contacts]));
  };

  const deleteContact = contactId => {
    const contactsAnswer = contacts.filter(({ id }) => id !== contactId);
    setContacts(contactsAnswer);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contactsAnswer));
  };

  const onChangeFilter = evt => {
    setFilter(evt.target.value)
  };

  const renderFilter = () => {
    const filterMassive = contacts.filter(({ name }) => name.toLowerCase().includes(filt.toLowerCase())
    );
    return filterMassive;
  }
  const filterMassive = renderFilter();

  return (
    <>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={chancheContact} constacts={contacts} />

      <h2>Contacts</h2>
      <Filter value={filt} onChange={onChangeFilter} />
      <ContactList
        data={filterMassive}
        onDeleteContact={deleteContact}
      />
    </>
  );

}