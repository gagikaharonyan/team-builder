import React from 'react';
import {connect} from 'react-redux';
import { Redirect } from "react-router-dom";

class HomePage extends React.Component {

    render() {
        if(!window.getSession()) {
            return <Redirect to="/login" /> 
        } 
        return(
            <Redirect to="/teams" /> 
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

// const mapDispatchToProps = (dispatch) => {
//     return {
       
//     };
// };

export default connect(null, null)(HomePage);