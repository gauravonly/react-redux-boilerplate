import React from 'react';
import { Switch, Route, withRouter, Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import loadable from 'react-loadable';
import Loader from '../Presentational/Loader';
import Error from '../Presentational/Error';
import * as campaignerActions from '../../actions/campaigner';

const LoadingComponent = () => <Loader loading="true" />;

// home component
const AsyncHomeComponent = loadable({
  loader: () => import('../Container/Home'),
  loading: LoadingComponent
});


// Error component
const AsyncErrorComponent = loadable({
  loader: () => import('../Presentational/Error'),
  loading: LoadingComponent
});

const Routes = props => {
  return (
    <main>
      <Switch>
        <Route path="/" component={AsyncHomeComponent} exact />
        <Route component={AsyncErrorComponent} />
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
  )(Routes)
);
