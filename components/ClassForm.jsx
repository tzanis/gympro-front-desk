import { Form, Field } from 'react-final-form';
import axios from 'axios';
import Router from 'next/router';
import arrayMutators from 'final-form-arrays'
import { FieldArray } from 'react-final-form-arrays';
import moment from 'moment';

const onSubmit = (values, isCreate) => {
  return new Promise(function(resolve, reject) {
    if (isCreate) {
      axios.post('http://127.0.0.1:8000/api/classes', values)
        .then(function (response) {
          Router.push('/classes');
        })
        .catch(function (error) {
          console.log('a', error.response.data.errors);
          resolve(error.response.data.errors);
        });
    } else {
      axios.put(`http://127.0.0.1:8000/api/classes/${values.id}`, values)
        .then(function (response) {
          Router.push('/classes');
        })
        .catch(function (error) {
          return Promise.reject(error.response);
        });
    }
  });
}

const ClassForm = ({ initialValues, instructors }) => (
  <Form
    mutators={{
      ...arrayMutators
    }}
    onSubmit={(values => onSubmit(values, typeof initialValues === 'undefined'))}
    initialValues={{ store_id: 1, ...initialValues }}
    render={({ handleSubmit, submitError, form, submitting, pristine, values }) => (
      <form onSubmit={handleSubmit}>
        <div>
          <Field name="name">
            {({ input, meta }) => (
              <div>
                <label>Name</label>
                <input {...input} type="text" />
                {meta.submitError && meta.touched && <span>{meta.submitError}</span>}
              </div>
            )}
          </Field>
          {submitError && <div className="error">{submitError}</div>}
        </div>

        <div>
          <Field name="description">
            {({ input, meta }) => (
              <div>
                <label>Description</label>
                <input {...input} type="text"/>
                {meta.submitError && meta.touched && <span>{meta.submitError}</span>}
              </div>
            )}
          </Field>
        </div>

        <div>
          <Field name="instructor_id">
            {({ input, meta }) => (
              <div>
                <label>Instructor</label>
                  <select {...input}>
                    <option value="">Select one..</option>
                    {instructors.map(({id, name}) => (
                      <option key={id} value={id}>{name}</option>
                    ))}
                  </select>
                {meta.submitError && meta.touched && <span>{meta.submitError}</span>}
              </div>
            )}
          </Field>
        </div>

        <div className="my-3">
          <FieldArray name="weekly_schedule">
            {({ fields }) => (
              <div>
                {fields.map((name, index) => (
                  <div key={name}>
                    <div>
                      <label>Day</label>
                      <Field name={`${name}.weekDay`} component="select">
                        <option value="">Select one..</option>
                        {[0,1,2,3,4,5,6].map(weekDay => (
                          <option key={weekDay} value={weekDay}>{moment().day(weekDay).format('dddd')}</option>
                        ))}
                      </Field>
                    </div>
                    <div>
                      <label>Start</label>
                      <Field name={`${name}.startTime`} component="input" />
                    </div>
                    <div>
                      <label>End time</label>
                      <Field name={`${name}.endTime`} component="input" />
                    </div>

                    <button type="button" onClick={() => fields.remove(index)}>
                      Remove
                    </button>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={() => fields.push()}
                >
                  Add weekly session
                </button>
              </div>
            )}
          </FieldArray>
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

export default ClassForm;
