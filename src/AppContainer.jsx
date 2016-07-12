import React, { Component } from 'react';
import * as actions from "./actions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

class AppContainer extends Component {
  componentWillMount() {
    // this.props.actions.getUsers();
    this.props.actions.getUser();
    this.props.actions.createUser('john', 'kaey');
  }

  renderUsers(users) {
    const array = users.map(u => {
      return <li key={u.firstName} >{u.firstName}</li>
    });
    return <ol>{ array }</ol>
  }

  render() {
    const { users } = this.props;
    console.log('users', users);
    return <div>
      { this.renderUsers(users) }
    </div>
  }
}


function mapStateToProps(state) {
  return {
    users: state.users,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer)
