import React from 'react';
import './RegisterPage.css';
import Loading from '../../loading/Loading';
import { Redirect } from "react-router-dom";
import {connect} from 'react-redux';
import {userProfileEditFetch} from '../../../redux/actionCreators/user';

 class RegisterPage extends React.Component {
     state = {
         isRegistered: false
     }
    handleSubmit = (data) => {
        if(this.props.match.params.as === 'register'){
            window.client.register(data, (res) => this.setState({isRegistered: true}));
        } else {
            this.props.profileEditeFetch(data);
        }
    }

    render() {
        const as = this.props.match.params.as;
        if(!window.getSession() && as !== 'register' || this.state.isRegistered) {
            return <Redirect to="/login" /> 
        }
        
        return (
            <div className="Registe-page page row-container">
                <RegisterForm as={as} user={this.props.user.data} onSubmit={this.handleSubmit}></RegisterForm>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {user: state.user}
}

const mapDispatchToProps = (dispatch) => {
    return {
        profileEditeFetch: (data) => dispatch(userProfileEditFetch(data))
    };
};
  
  
export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);

class RegisterForm extends React.Component {
    state = {
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                birthDate: '',
                sex: 'male',
                avatarUrl: '',
                jsExperience: '',
                reactExperience: '',
                companyId: 1,
                companies: []
          }

    componentDidMount() {
        window.client.getCompanies((companies) => this.setState({companies}));
        if(this.props.as === 'edit_profile') {
            this.setState(this.props.user);
        } 
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.as === 'edit_profile') {
            this.setState(nextProps.user);
        } 
    }

    handleOnChange = event => {
        this.setState({[event.target.name]: event.target.value});
    }

    handleOnSubmit = (event) => {
        event.preventDefault();
        this.props.onSubmit(this.state);
    }

    render() {
        const {companies} = this.state;

        return(
            <div className="Register-form row-container container">
               {this.props.as === 'register' ?  <h1>Create Account</h1> : <h1>Edit Profile</h1>}
                <form onSubmit={this.handleOnSubmit}>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label htmlFor="inputEmail4">Email</label>
                            <input name="email" type="email" className="form-control" id="inputEmail4" value={this.state.email}
                                 onChange={this.handleOnChange}  maxLenght="20" required></input>
                            <small id="emailHelp" className="form-text text-muted">Email shouldn't be used for another account.</small>
                        </div>
                        {this.props.as === 'register'
                         ?  <div className="form-group col-md-6">
                                <label htmlFor="inputPassword4">Password</label>
                                <input name="password" type="password" className="form-control" id="inputPassword4" 
                                    value={this.state.password} onChange={this.handleOnChange} minLength="6" maxLenght="20" required></input>
                                <small id="emailHelp" className="form-text text-muted">Password must be at least 6 characters.</small>
                            </div>
                         : ''}
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label htmlFor="inputFirstName">First name</label>
                            <input name="firstName" type="text" className="form-control" id="inputFirstName"
                                value={this.state.firstName} onChange={this.handleOnChange}  maxLenght="15" required></input>
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="inputLastname">Last name</label>
                            <input name="lastName" type="text" className="form-control" id="inputLastname" 
                                value={this.state.lastName} onChange={this.handleOnChange}  maxLenght="15" required></input>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-4">
                            <label htmlFor="inputSex">Sex</label>
                            <select name="sex" id="inputState" className="form-control" value={this.state.sex} onChange={this.handleOnChange}>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                        </div>
                        <div className="form-group col-md-8">
                            <label htmlFor="inputBirthDate">Birth Date</label>
                            <input name="birthDate" type="date" className="form-control" id="inputBirthDate" 
                                data-date-format="YYYY MMMM DD" value={this.state.birthDate} onChange={this.handleOnChange} required></input>
                        </div>            
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-12">
                            <label htmlFor="inputPhotoUrl">Photo URL</label>
                            <input name="avatarUrl" type="text" className="form-control" id="inputPhotoUrl" value={this.state.avatarUrl} onChange={this.handleOnChange} required></input>
                            <small id="emailHelp" className="form-text text-muted">Past link of your photo here.</small>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-3">
                            <label htmlFor="inputJsExperience">Js experience</label>
                            <input name="jsExperience" type="number" className="form-control" id="inputJsExperience" min="0" value={this.state.jsExperience} onChange={this.handleOnChange} required></input>
                            <small className="form-text text-muted">by month</small>
                        </div>    
                        <div className="form-group col-md-3">
                            <label htmlFor="inputReactJsExperience">React experience</label>
                            <input name="reactExperience" type="number" className="form-control" id="inputReactJsExperience" min="0" value={this.state.reactExperience} onChange={this.handleOnChange} required></input>
                            <small className="form-text text-muted">by month</small>
                        </div>    
                        <div className="form-group col-md-6 row-container">
                            <label htmlFor="inputCompanyName">Company name</label>
                            {companies.length !== 0
                            ?<select name="companyId" id="inputState" className="form-control" value={this.state.companyId} onChange={this.handleOnChange}>
                                {companies.map((comp) => <option key={comp.id} value={comp.id}>{comp.name}</option>)}
                            </select>
                            :<Loading></Loading>}   
                        </div>                        
                    </div>
                    <button type="submit" className="btn btn-primary">{this.props.as === 'register' ? 'Create account' : 'Save'}</button>
                </form>
            </div>
        );
    }
}