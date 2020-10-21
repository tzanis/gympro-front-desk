import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { Card } from 'react-bootstrap';
import moment from 'moment';
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faPlus } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

export default function Home({ data }) {
  const [classes, setClasses] = useState(data);

  useEffect(() => {
    setClasses(data);
  }, []);

  const fetchClasses = async () => {
    const res = await fetch('http://127.0.0.1:8000/api/classes');
    const classes = await res.json();
    setClasses(classes);
  };

  const onDelete = async ({ id }) => {
    axios.delete(`http://127.0.0.1:8000/api/classes/${id}`)
      .then(function (response) {
        fetchClasses();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <>
      <Head>
        <title>Classes</title>
      </Head>

      <section className="search-and-user">
        <h1>Classes</h1>
        <div className="admin-profile">
          <span className="greeting">Hello admin</span>
          <div className="notifications">
            <span className="badge">1</span>
            <svg>
              aaa
            </svg>
          </div>
        </div>
      </section>

      <div className="d-flex mb-3">
        <Link href="/classes/new">
          <a className="ml-auto btn btn-primary">
            <FontAwesomeIcon icon={faPlus} className="mr-2" />
            Create new Class
          </a>
        </Link>
      </div>

      <div className="row">
        { classes.map(c => (
          <div key={c.id} className="col-12 col-md-6">
            <Card className="mb-4 border-0 shadow-sm">
              <Card.Body>
                <Card.Title className="d-flex">
                  <Link href={`/classes/${c.id}/edit`}>
                    <a>
                      {c.name}
                    </a>
                  </Link>
                  <a className="ml-auto" onClick={() => onDelete(c)}>
                    <FontAwesomeIcon icon={faTimes} />
                  </a>
                </Card.Title>
                <Card.Text>{c.description}</Card.Text>
              </Card.Body>

              <Card.Footer>
                {c.weekly_schedule && c.weekly_schedule.map(s => (
                  <div className="pr-2">
                    {moment().day(s.weekDay).format('dddd')}:
                    {' '}
                    {moment(s.startTime, 'HH:mm:ss').format('HH:mm')}
                    {' - '}
                    {moment(s.endTime, 'HH:mm:ss').format('HH:mm')}
                  </div>
                ))}
              </Card.Footer>
            </Card>
          </div>
        ))}
      </div>
    </>
  )
}

export async function getServerSideProps() {
  const storeRes = await fetch('http://127.0.0.1:8000/api/stores/1')
  const store = await storeRes.json()
  const res = await fetch('http://127.0.0.1:8000/api/classes')
  const data = await res.json()

  return { props: { data, store } }
}
