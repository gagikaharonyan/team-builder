import React from 'react';
import {connect} from 'react-redux';
import { Redirect } from "react-router-dom";
import store from '../../../redux/store'

class HomePage extends React.Component {
    

    componentDidMount() {
        console.log(store.getState())
    }

    render() {
        if(!window.getSession()) {
            console.log('REDIRECTING Home -> Login')
            return <Redirect to="/login" /> 
        }

        return(
            <div className="Home-page page">
                <h1>Home</h1>
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

export default connect(null, mapDispatchToProps)(HomePage);