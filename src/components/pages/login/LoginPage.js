import React from 'react'
import './LoginPage.css'
import { Redirect, Link } from "react-router-dom";
import {userFetchData} from '../../../redux/actionCreators/user';

import {connect} from 'react-redux';

class LoginPage extends React.Component {
    render() {
        if(this.props.user.isLoggedIn) {
            return <Redirect to='/'></Redirect>
        }

        return (
            <div className="Login-page page row-container">
                <LoginForm onLogin={this.props.fetchData}></LoginForm>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {user: state.user }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: (data) => dispatch(userFetchData(data))
    };
};
  
export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);


class LoginForm extends React.Component {
    state = {
        formData: {email: '', password: ''},
    }

    handleOnChange = event => {
        this.setState({formData: {...this.state.formData, [event.target.name]: event.target.value}});
    }

    handleOnSubmit = (event) => {
        event.preventDefault();
        this.props.onLogin(this.state.formData);
    }

    render() {
        const submitting = false;
        
        return (
            <div className="Login-form container row-container">
                <h1 className="form-caption">Log In</h1>
                 <form onSubmit={this.handleOnSubmit}>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Email address</label>
                        <input name="email" type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                            value={this.state.formData.email} onChange={this.handleOnChange} required></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input name="password" type="password" className="form-control" id="exampleInputPassword1"
                            value={this.state.formData.password} onChange={this.handleOnChange} required></input>
                    </div>
                    <div className="form-group form-check">
                        <input type="checkbox" className="form-check-input" id="exampleCheck1"></input>
                        <label className="form-check-label" htmlFor="exampleCheck1">Remember me</label>
                    </div>
                    <div className="form-row">
                        <button type="submit" className={`btn btn-success ${submitting ? 'inactive-btn' : ''}`}>Submit</button>
                        <Link className="action-btn register-btn" to="/register">Create account</Link>
                    </div>                    
                </form>
            </div>
        );
    }
}