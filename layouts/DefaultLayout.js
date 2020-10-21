import React from 'react';
import NavBar from './../components/NavBar';

export default class Layout extends React.Component {
  constructor() {
    super();
    this.state = {
      store: {
        name: null,
        logo: null,
      }
    };
  }

  async componentDidMount() {
    const storeRes = await fetch('http://127.0.0.1:8000/api/stores/1')
    const store = await storeRes.json()

    this.setState({store });
  }

  render() {
    const { children } = this.props;
    const { store } = this.state;

    return (
      <div className="wrapper">
        <header className="page-header">
          {store && (
            <NavBar store={store}/>
          )}
        </header>

        <section className="page-content d-flex flex-column">
          {children}

          <footer className="page-footer mt-auto">
            <small>&copy; {store.name}
            </small>
          </footer>
        </section>
      </div>
    );
  }
};
