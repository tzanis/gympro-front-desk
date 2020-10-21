import Head from 'next/head'

import InstructorForm from './../../components/InstructorForm';


export default function Home() {
  return (
    <>
      <Head>
        <title>New instructor</title>
      </Head>

      <div className="row">
        <InstructorForm />
      </div>
    </>
  )
}
