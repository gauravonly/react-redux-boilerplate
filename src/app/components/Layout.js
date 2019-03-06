import React from 'react';
import { Switch, Route, withRouter, Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import loadable from 'react-loadable';
import Loader from './Loader';
import * as campaignerActions from '../actions/campaigner';

const LoadingComponent = () => <Loader loading="true" />;

// home component
const AsyncHomeComponent = loadable({
  loader: () => import('./Home'),
  loading: LoadingComponent
});

const Layout = props => {
  return (
    <main>
      <Switch>
        <Route path="/" component={AsyncHomeComponent} exact />
        <Route component={AsyncHomeComponent} />
      </Switch>
    </main>
  );
};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch =>
  bindActionCreators(campaignerActions, dispatch);

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Layout)
);
