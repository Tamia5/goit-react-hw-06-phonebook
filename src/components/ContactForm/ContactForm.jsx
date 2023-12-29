import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Container, Label, Btn, Err } from './ContactForm.styled';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from '../../redux/contactsSlice';
import { nanoid } from 'nanoid';

const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  number: Yup.string().min(2, 'Too Short!').required('Required'),
});

export const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts.list);

  const handleSubmit = (values, { resetForm }) => {
    const { name, number } = values;

    const newContact = {
      id: nanoid(),
      name,
      number,
    };

    const isDuplicate = contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (isDuplicate) {
      alert('This name already exists. Please enter a different name.');
      return;
    }

    dispatch(addContact(newContact));
    resetForm();
  };

  return (
    <Formik
      initialValues={{
        name: '',
        number: '',
      }}
      validationSchema={SignupSchema}
      onSubmit={handleSubmit}
    >
      <Container>
        <Label htmlFor="Name">Name</Label>
        <Field type="text" name="name" />
        <ErrorMessage name="name" component={Err} />

        <Label htmlFor="Number">Number</Label>
        <Field type="tel" name="number" />
        <ErrorMessage name="number" component={Err} />

        <Btn type="submit">Add contact</Btn>
      </Container>
    </Formik>
  );
};
