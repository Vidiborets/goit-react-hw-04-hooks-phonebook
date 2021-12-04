import { useState } from "react";

import PropTypes from 'prop-types';
import s from './ContactForm.module.scss'

export default function ContactForm({ onSubmit }) {

    const [name, setName] = useState('');
    const [number, setNumber] = useState('');


    const handleChange = e => {
        const { name, value } = e.currentTarget;

        
        switch (name) {
            case 'name':
                setName(value);
                break;
            case 'number':
                setNumber(value);
                break;
            default:
                return
        }
    };

    const handleSubmit = e => {
        e.preventDefault();
        onSubmit({ name,number });
        resetForm();
    }

    const resetForm = () => {
        setNumber('')
        setName('')
    }
    return (
        <form className={s.form} onSubmit={handleSubmit}>
            <label>
                <input
                    type="text"
                    name="name"
                    value={name}
                    onChange={handleChange}
                    className={s.input}
                    placeholder={'Имя'}
                    pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                    title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
                    required
                />
            </label>
            <label>
                <input
                    type="tel"
                    name="number"
                    value={number}
                    onChange={handleChange}
                    className={s.input}
                    placeholder={'Номер'}
                    pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                    title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                    required
                />
            </label>
            <button className={s.button} type="submit">Добавить контакт</button>
        </form>
    );
}
ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};


