import React from 'react' 
import './Header.css'
import NavBar from '../navBar/NavBar'
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import UserProfileDisplay from './UserProfileDisplay';

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
                <Link className="app-logo" to='/'><span>Team Builder</span></Link>        
                {window.getSession() 
                ?<>
                    <NavBar links={navLinks}></NavBar>
                    <UserInfo src={user.data} onLogOut={this.props.onLogOut}/>
                </>
                :<Link className="unlogined-logo" to='/'><span>Team Builder</span></Link>  }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {user: state.user}
}
  
export default connect(mapStateToProps,null)(Header)

class UserInfo extends React.Component {
    state = {
        isUserDisplayOpen: false
    }
    
    render() {
        const {src} = this.props;
        return(<>
            <div className="header-user-info col-container">
                <Link to="#">
                    <div className="col-container" onClick={() => this.setState({isUserDisplayOpen: !this.state.isUserDisplayOpen})}>
                        <span className="col-4">{src.firstName}</span>
                        <span className="col-5">{src.lastName}</span>
                        <div className="col-3">
                            <img src={src.avatarUrl} alt="user"></img>
                        </div>
                    </div>
                </Link>
                <button className="action-btn log-out-btn col-3" onClick={this.props.onLogOut}>Log out</button>            
            </div>
            {this.state.isUserDisplayOpen && <UserProfileDisplay 
                                                src={src}
                                                onClose={() => this.setState({isUserDisplayOpen: false})}>
                                            </UserProfileDisplay>}
            </>
        );  
    }
     
}

