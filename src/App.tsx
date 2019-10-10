import './App.css';

import { Layout } from 'antd';
import React, { Component, ReactNode } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { addTranslation, initialize } from 'react-localize-redux';
import { connect } from 'react-redux';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import Footer from './components/globals/Footer';
import Header from './components/globals/Header';
import CONSTANTS from './constants';
import Login from './containers/auth/Login';

interface Props {
  initialize(config: object): any;
  addTranslation(config: object): any;
}
interface State {}

class App extends Component<Props, State> {
  componentDidMount = () => {
    const defaultLanguage = CONSTANTS.LANGUAGE_ES;

    if (localStorage.getItem('preferedLanguage')) {
      this.props.initialize({
        languages: CONSTANTS.AVAILABLE_LANGUAGES,
        options: {
          renderToStaticMarkup,
          defaultLanguage: localStorage.getItem('preferedLanguage'),
          onMissingTranslation: () => ''
        }
      });
    } else {
      this.props.initialize({
        languages: CONSTANTS.AVAILABLE_LANGUAGES,
        options: {
          renderToStaticMarkup,
          defaultLanguage,
          onMissingTranslation: () => ''
        }
      });
      localStorage.setItem('preferedLanguage', defaultLanguage);
    }

    this.props.addTranslation(require('./locales/generic.json'));
    this.props.addTranslation(require('./locales/validations.json'));
    this.props.addTranslation(require('./locales/nav.json'));
    this.props.addTranslation(require('./locales/auth.json'));
  };

  render(): ReactNode {
    return (
      <>
        <Layout className="grid-container">
          <Header />
          <BrowserRouter>
            <Switch>
              <Route exact path="/" component={Login} />

              <Route path="/" render={() => <Redirect to="/" />} />
            </Switch>
          </BrowserRouter>
          <Footer />
        </Layout>
      </>
    );
  }
}

export default connect(
  null,
  { initialize, addTranslation }
)(App);
