import React from 'react';
import {connect} from 'react-redux';
import { Redirect } from "react-router-dom";
import {projectsFetchData, fetchVoteProject} from '../../../redux/actionCreators/projects';
import './ProjectsPage.css';
import Loading from '../../loading/Loading';

class ProjectsPage extends React.Component {
    componentDidMount() {
        this.props.fetchData();
    }

    handleVoteProject = (id, type) => {
        this.props.voteProject(id, type);
    }

    render() {
        const {projects} = this.props;
        console.log(projects)
        if(!window.getSession()) {
            return <Redirect to="/login" /> 
        }

        return(
            <div className="Projects-page page row-container">
                {projects.areLoading
                ?<Loading></Loading>
                :projects.data.map(project =>
                    <Project
                        key={project.id}
                        title={project.title}
                        description={project.description}
                        votedByMe={project.votedByMe}
                        onVote={() => this.handleVoteProject(project.id, project.votedByMe? 'unlike' : 'like')}
                    ></Project>)}
            </div> 
        );
    }
}

const mapStateToProps = (state) => {
    return {
        projects: state.projects,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
       fetchData: () => dispatch(projectsFetchData()),
       voteProject: (id, type) => dispatch(fetchVoteProject(id, type))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsPage);

function Project (props) {
    return(
        <div className="Project container row-container">
            <div className="project-header">
                <span>{props.title}</span>
            </div>
            <div className="project-body col-container">
                <span className="procet-description col-11">{props.description}</span>
                <i className={`col-1 fas fa-thumbs-up project-vote-mark ${props.votedByMe? 'voted-' : 'unvoted-'}topic-mark`}
                    onClick={props.onVote}></i>
            </div>
        </div>
    );
}