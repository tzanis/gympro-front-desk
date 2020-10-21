import React, { useState, useEffect } from 'react';
import Head from 'next/head'
import Link from 'next/link'
import { Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faPlus } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

export default function Home({ data }) {
  const [instructors, setInstructors] = useState(data);

  useEffect(() => {
    setInstructors(data);
  }, []);

  const fetchInstructors = async () => {
    const res = await fetch('http://127.0.0.1:8000/api/instructors');
    const instructors = await res.json();
    setInstructors(instructors);
  };

  const onDelete = async (instructor) => {
    axios.delete(`http://127.0.0.1:8000/api/instructors/${instructor.id}`)
      .then(function (response) {
        fetchInstructors();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  console.log({ instructors });

  return (
    <>
      <Head>
        <title>Instructors</title>
      </Head>

      <section className="search-and-user">
        <h1>Instructors</h1>
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
        <Link href="/instructors/new">
          <a className="ml-auto btn btn-primary">
            <FontAwesomeIcon icon={faPlus} className="mr-2" />
            Add instructor
          </a>
        </Link>
      </div>

      <div className="row">
        { instructors.map(instructor => (
          <div key={instructor.id} className="col-12">
            <Card className="mb-3 border-0 shadow-sm">
              <Card.Body>
                <Card.Title className="d-flex mb-0">
                  <Link href={`/instructors/${instructor.id}/edit`}>
                    <a>
                      {instructor.name}
                    </a>
                  </Link>
                  <a className="ml-auto" onClick={() => onDelete(instructor)}>
                    <FontAwesomeIcon icon={faTimes} />
                  </a>
                </Card.Title>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </>
  )
}

export async function getServerSideProps() {
  const storeRes = await fetch('http://127.0.0.1:8000/api/stores/1');
  const store = await storeRes.json();
  const res = await fetch('http://127.0.0.1:8000/api/instructors');
  const data = await res.json();

  // Pass data to the page via props
  return { props: { data, store } }
}
