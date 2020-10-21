import Head from 'next/head'

import ClassForm from '../../../components/ClassForm';


export default function Home({ cl, instructors }) {
  return (
    <>
      <Head>
        <title>{cl && cl.name}</title>
      </Head>

      <div className="row">
        <ClassForm initialValues={cl} instructors={instructors} />
      </div>
    </>
  )
}

// This gets called on every request
export async function getServerSideProps({ query }) {
  const { id } = query;
  const res = await fetch(`http://127.0.0.1:8000/api/classes/${id}`);
  const cl = await res.json();

  const instructorsRes = await fetch('http://127.0.0.1:8000/api/instructors');
  const instructors = await instructorsRes.json();

  return { props: { cl, instructors } }
}
