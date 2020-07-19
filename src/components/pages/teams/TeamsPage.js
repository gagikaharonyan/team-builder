import React from 'react';
import {connect} from 'react-redux';
import { Redirect } from "react-router-dom";
import {teamsFetchData} from '../../../redux/actionCreators/teams';
import './TeamsPage.css';
import Loading from '../../loading/Loading';

class TeamsPage extends React.Component {
    componentDidMount() {
        this.props.fetchData();
    }

    render() {
        const {teams} = this.props;
        if(!window.getSession()) {
            return <Redirect to="/login" /> 
        }

        return(
            <div className="Teams-page page row-container">
                {teams.areLoading
                ?<Loading></Loading>
                :teams.data.map(team =>
                    <Team
                        key={team.id}
                        src={team}
                    ></Team>)}
            </div>);
    }
}

const mapStateToProps = (state) => {
    return {
        teams: state.teams,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
       fetchData: () => dispatch(teamsFetchData()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TeamsPage);

function Team ({src}) {
    return(
        <div className="Team container col-container">
            <div className="team-info row-container col-6">
                <span>{src.name}</span>
                <small>Name</small>
                <span>{src.topic}</span>
                <small>Topic</small>
                <span>{src.project}</span>
                <small>Project</small>
            </div>
            <div className="team-members row-container col-6">
                <h3>Team members</h3>
                {src.members.map((member, index) => (
                    <div key={index} className="member col-container">
                        <span>{member.firstName + ' ' + member.lastName}</span>
                        <img src={member.avatarUrl} alt='member'></img>
                    </div>
                ))}
            </div>
        </div>
    );
}