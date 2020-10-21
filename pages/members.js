import Head from 'next/head'
import { Card } from 'react-bootstrap';

export default function Home({ classes }) {
  return (
    <>
      <Head>
        <title>Members</title>
      </Head>

      <section className="search-and-user">
        <h1>Members</h1>
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

      <div className="row">
        { classes.map(c => (
          <div key={c.id} className="col-12 col-md-6">
            <Card className="mb-4 border-0 shadow-sm">
              <Card.Body>
                <Card.Title>{c.name}</Card.Title>
                <Card.Text>{c.description}</Card.Text>
              </Card.Body>
              <Card.Footer>
                <Card.Link href="#">Card Link</Card.Link>
                <Card.Link href="#">Another Link</Card.Link>
              </Card.Footer>
            </Card>
          </div>
        ))}
      </div>
    </>
  )
}

// This gets called on every request
export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch('http://127.0.0.1:8000/api/classes')
  const classes = await res.json()
  const storeRes = await fetch('http://127.0.0.1:8000/api/stores/1')
  const store = await storeRes.json()

  // Pass data to the page via props
  return { props: { classes, store } }
}
