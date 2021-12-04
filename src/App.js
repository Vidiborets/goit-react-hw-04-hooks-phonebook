import { useState,useEffect } from 'react'
import shortid from 'shortid'
import Container from './components/Container'
import ContactForm from './components/ContactForm'
import ContactList from './components/ContactList'
import ContactFilter from './components/ContactFilter'
import Section from './components/Section'
import s from './App.module.scss'




const CONTACTS = [
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];


export default function App() {
    
    const [contacts, setContacts] = useState(
        JSON.parse(window.localStorage.getItem("contacts")) ?? CONTACTS
    );

    useEffect(() => {
        localStorage.setItem("contacts",JSON.stringify(contacts))
    },[contacts])

    const [filter, setFilter] = useState('');

    const formSubmit = ({ name, number, }) => {
        const duplicateName = name

        const findName = contacts.find(
            contact => contact.name === duplicateName,
         );
        
         if (findName) {
             alert(`${duplicateName} is already on contacts`);
            return;
         }


        const contact = {
            id: shortid.generate(),
            name,
            number,
        };
        setContacts((prev) => [...prev, contact]);
    };
    
    const renderId = (id) => {
        setContacts(prevState => 
            prevState.filter(contact => contact.id !== id),
        )
    };

  const getFilterSearch = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

    const changeFilter = (e) => {
        setFilter(
            e.currentTarget.value)
    }

    return (
        <Container>
            <Section>
                <h1 className={s.title}>Телефонная книга</h1>
                <ContactForm onSubmit={formSubmit} />
                <h1 className={s.titleContact}>Контакты</h1>
                <ContactFilter value={filter} onChange={changeFilter} />
                <ContactList contacts={getFilterSearch()} renderId={renderId} />
            </Section>
        </Container>
    );
    };











