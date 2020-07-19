import React from 'react' 
import './Header.css'
import NavBar from '../navBar/NavBar'
import {Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {userFetchLogOut} from '../../redux/actionCreators/user'

class Header extends React.Component {
    
    render() {
        const{user} = this.props;
        const navLinks = [
            {url: '/teams', title: 'Teams'},
            {url: '/topics', title: 'Topics'},
            {url: '/projects', title: 'Projects'},
        ]

        return(
            <div className="Header col-container">
                <Link className="col-1" to='/'><span>Team Builder</span></Link>        
                {window.getSession() && <NavBar links={navLinks}></NavBar>}
                <div className="col-4 col-container">
                   {window.getSession() && <UserInfo src={user.data} onLogOut={this.props.onLogOut}/>}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {user: state.user}
}
  
export default connect(mapStateToProps,null)(Header)

function HeaderLinks() {
    return (
        <div className="header-links">
            <Link to="/login">Log in</Link>
            <Link className="action-btn register-btn" to="/register">Create account</Link>
        </div>
    );
}

function UserInfo(props) {
    const {src} = props;
    return(
        <div className="header-user-info col-container">
            <div className="col-9 col-container">
                <span className="col-4">{src.firstName}</span>
                <span className="col-5">{src.lastName}</span>
                <div className="col-3">
                    <img src={src.avatarUrl}></img>
                </div>
            </div>
            <button className="action-btn log-out-btn col-3" onClick={props.onLogOut}>Log out</button>            
        </div>
    );   
}

