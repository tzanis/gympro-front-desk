import Link from 'next/link'
import { useRouter } from "next/router";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faIdCard, faUsers, faShoePrints } from '@fortawesome/free-solid-svg-icons'

export default function Home({ store }) {
  const router = useRouter();

  return (
    <nav>
      <Link href="/">
        <a>
          <img className="logo" src={store.logo} alt={store.name} />
        </a>
      </Link>
      <button className="toggle-mob-menu" aria-expanded="false" aria-label="open menu">
        aaa
      </button>
      <ul className="admin-menu">
        <li className="menu-heading">
          <h3>Front Desk</h3>
        </li>

        <li className={router.pathname === '/members' ? 'active' : ''}>
          <Link href="/members">
            <a>
              <FontAwesomeIcon icon={faIdCard} />
              Members
            </a>
          </Link>
        </li>

        <li className={router.pathname === '/classes' ? 'active' : ''}>
          <Link href="/classes">
            <a>
              <FontAwesomeIcon icon={faUsers} />
              Classes
            </a>
          </Link>
        </li>

        <li className={router.pathname === '/instructors' ? 'active' : ''}>
          <Link href="/instructors">
            <a>
              <FontAwesomeIcon icon={faShoePrints} />
              Instructors
            </a>
          </Link>
        </li>

        {/*<li  className="mt-auto">*/}
        {/*  <button className="collapse-btn" aria-expanded="true" aria-label="collapse menu">*/}
        {/*    <span>Collapse</span>*/}
        {/*  </button>*/}
        {/*</li>*/}
      </ul>
    </nav>
  )
}
