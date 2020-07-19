import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import Header from './components/header/Header'
import LoginPage from './components/pages/login/LoginPage';
import RegisterPage from './components/pages/register/RegisterPage';
import HomePage from './components/pages/home/HomePage';
import Projects from './components/pages/projects/Projects';
import Teams from './components/pages/teams/Teams';
import Topics from './components/pages/topics/TopicsPage';
import {connect} from 'react-redux';
import {userFetchData, userFetchLogOut} from './redux/actionCreators/user';

class App extends React.Component {
    componentDidMount() {
        const token = window.getSession();
        if(token) {
            this.props.fetchData({token})
        }
    }

    render() {
        return (<>
            <Header onLogOut={this.props.logOut}></Header>
            <Switch>
                <Route exact path='/' component={HomePage}/>
                <Route path='/login' component={LoginPage}/>
                <Route path='/register' component={RegisterPage}/>
                <Route path='/projects' component={Projects}/>
                <Route path='/teams' component={Teams}/>
                <Route path='/topics' component={Topics}/>
            </Switch>
            {window.getSession() ? '' : <Redirect to='/login'></Redirect>}
      </>);
    }
   
}

const mapStateToProps = (state) => {
    return {user: state.user}
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: (data) => dispatch(userFetchData(data)),
        logOut: () => dispatch(userFetchLogOut()),
    }
}
  
export default connect(mapStateToProps,mapDispatchToProps)(App)