import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import uuid4 from 'uuid4';
import * as campaignerActions from '../actions/campaigner';
import '../assets/styles/home.scss';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount = () => {};

  componentWillUnmount = () => {};

  componentDidUpdate = () => {};

  render() {
    return <div className="home-container">HOME</div>;
  }
}
const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch =>
  bindActionCreators(campaignerActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
