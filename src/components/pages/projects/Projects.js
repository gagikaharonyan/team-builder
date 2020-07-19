import React from 'react';
import {connect} from 'react-redux';
import { Redirect } from "react-router-dom";
import './Projects.css'

class ProjectsPage extends React.Component {

    componentDidMount() {
        
    }

    render() {
        if(!window.getSession()) {
            return <Redirect to="/login" /> 
        }

        return(
            <div className="Projects-page page">
                <h1>ProjectsPage</h1>
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

export default connect(null, mapDispatchToProps)(ProjectsPage);