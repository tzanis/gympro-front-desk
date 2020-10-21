import Head from 'next/head'

import InstructorForm from '../../../components/InstructorForm';


export default function Home({ instructor }) {
  return (
    <>
      <Head>
        <title>{instructor && instructor.name}</title>
      </Head>

      <div className="row">
        <InstructorForm initialValues={instructor} />
      </div>
    </>
  )
}

// This gets called on every request
export async function getServerSideProps({ query }) {
  const { id } = query;
  const res = await fetch(`http://127.0.0.1:8000/api/instructors/${id}`);
  const instructor = await res.json();

  // Pass data to the page via props
  return { props: { instructor } }
}
