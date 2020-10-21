import Head from 'next/head'

import ClassForm from './../../components/ClassForm';


export default function CreateClassView({ instructors }) {
  return (
    <>
      <Head>
        <title>New Class</title>
      </Head>

      <div className="row">
        <ClassForm instructors={instructors}/>
      </div>
    </>
  )
}

export async function getServerSideProps() {
  const res = await fetch('http://127.0.0.1:8000/api/instructors');
  const instructors = await res.json();

  return { props: { instructors } }
}

