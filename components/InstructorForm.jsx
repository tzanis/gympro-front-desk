import { Form, Field } from 'react-final-form';
import axios from 'axios';
import Router from 'next/router';

const onSubmit = async (values, isCreate) => {
  console.log({ values, isCreate });
  if (isCreate) {
    axios.post('http://127.0.0.1:8000/api/instructors', values)
      .then(function (response) {
        Router.push('/instructors');
      })
      .catch(function (error) {
        console.log(error);
      });
  } else {
    axios.put(`http://127.0.0.1:8000/api/instructors/${values.id}`, values)
      .then(function (response) {
        Router.push('/instructors');
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}

const InstructorForm = ({ initialValues }) => (
  <Form
    onSubmit={(values => onSubmit(values, typeof initialValues === 'undefined'))}
    initialValues={{ store_id: 1, ...initialValues }}
    render={({ handleSubmit, form, submitting, pristine, values }) => (
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name</label>
          <Field
            name="name"
            component="input"
            type="text"
            placeholder="Name"
          />
        </div>

        <div className="buttons">
          <button className="btn btn-primary" type="submit" disabled={submitting || pristine}>
            Submit
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={form.reset}
            disabled={submitting || pristine}
          >
            Reset
          </button>
        </div>
      </form>
    )}
  />
);

export default InstructorForm;
