import { Layout } from 'antd';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { addTranslation, initialize, LocalizeContextProps, withLocalize } from 'react-localize-redux';
import { connect } from 'react-redux';

import Routers from './components/routers';
import CONSTANTS from './utils/constants';

interface Props extends LocalizeContextProps {}
interface State {}

class App extends React.Component<Props, State> {
  componentDidMount = () => {
    const defaultLanguage = CONSTANTS.LANGUAGE_ES;

    if (localStorage.getItem('preferedLanguage')) {
      this.props.initialize({
        languages: CONSTANTS.AVAILABLE_LANGUAGES,
        options: {
          renderToStaticMarkup,
          defaultLanguage: localStorage.getItem('preferedLanguage') || undefined,
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

  render(): React.ReactNode {
    return (
      <>
        <Layout className="grid-container">
          <Routers />
        </Layout>
      </>
    );
  }
}

export default connect(
  null,
  { initialize, addTranslation }
)(withLocalize(App));
