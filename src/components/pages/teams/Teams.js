import React from 'react';
import {connect} from 'react-redux';
import { Redirect } from "react-router-dom";
import './Teams.css'

class TeamsPage extends React.Component {

    render() {
        if(!window.getSession()) {
            return <Redirect to="/login" /> 
        }

        return(
            <div className="Teams-page page">
                <h1>Teams</h1>
            </div> 
        );
    }
}

// const mapStateToProps = (state) => {
//     return {
//         user: state.user,
//         hasError: state.itemsHaveError,
//         isLoading: state.itemsAreLoading
//     };
// };

const mapDispatchToProps = (dispatch) => {
    return {
       
    };
};

export default connect(null, mapDispatchToProps)(TeamsPage);