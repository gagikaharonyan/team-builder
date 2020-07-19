import React from 'react';
import {connect} from 'react-redux';
import { Redirect } from "react-router-dom";
import {topicsFetchData, fetchNewTopic, fetchDeleteTopic, fetchVoteTopic} from '../../../redux/actionCreators/topics';
import './TopicsPage.css';
import Loading from '../../loading/Loading';

class TopicsPage extends React.Component {
    componentDidMount() {
        this.props.fetchData();
    }

    handleCreateTopic = (title) => {
        this.props.addTopic(title);
    }

    handleDeleteTopic = (id) => {
        this.props.deleteTopic(id);
    }

    handleVoteTopic = (id, type) => {
        this.props.voteTopic(id, type);
    }

    render() {
        const {topics} = this.props;
        console.log(topics)
        if(!window.getSession()) {
            return <Redirect to="/login" /> 
        }

        return(
            <div className="Topics-page page row-container">
                <AddTopic onCreateTopic={this.handleCreateTopic} topicIsAdding={topics.topicIsAdding}></AddTopic>
                {topics.areLoading
                ?<Loading></Loading>
                :topics.data.map(topic =>
                    <Topic
                        key={topic.id}
                        title={topic.title}
                        votingsCount={topic.votingsCount}
                        votedByMe={topic.votedByMe}
                        canDelete={topic.canDelete}
                        onDelete={() => this.handleDeleteTopic(topic.id)}
                        onVote={() => this.handleVoteTopic(topic.id, topic.votedByMe? 'unlike' : 'like')}
                    ></Topic>)}
            </div> 
        );
    }
}

const mapStateToProps = (state) => {
    return {
        topics: state.topics,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
       fetchData: () => dispatch(topicsFetchData()),
       addTopic: (title) => dispatch(fetchNewTopic(title)),
       deleteTopic: (id) => dispatch(fetchDeleteTopic(id)),
       voteTopic: (id, type) => dispatch(fetchVoteTopic(id, type))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TopicsPage);

class AddTopic extends React.Component {
    state = {
        addBtnClicked: false,
        newTopicName: ''
    }

    handleNameInput = (event) => {
        this.setState({newTopicName: event.target.value});
    }

    handleNameInputDisplay = () => {
        this.setState({addBtnClicked: !this.state.addBtnClicked});
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.handleNameInputDisplay();
        this.props.onCreateTopic(this.state.newTopicName);
    }
 
    render() {
        const {addBtnClicked, newTopicName} = this.state;
        if(addBtnClicked) {
            return (<div className="Topic container row-container">
                        <form onSubmit={this.handleSubmit}>
                            <div className="topic-header">
                                <input className="add-topic-input" type="text" placeholder="Topic name" value={newTopicName} 
                                    onChange={this.handleNameInput} maxLength="20" required></input>
                            </div>
                            <div>
                                <button type="submit" className="action-btn create-topic-btn">Create topic</button>
                                <button type="button" className="action-btn cancel-topic-btn"
                                   onClick={this.handleNameInputDisplay}>Cancel</button>
                            </div>                            
                        </form>
                        </div>);
        }

        return this.props.topicIsAdding
        ?<span className="adding-topic-loader">Adding new topic ...</span>
        :<i className="fas fa-plus action-btn add-topic-btn" onClick={this.handleNameInputDisplay}></i>
    }
}

function Topic (props) {
    return(
        <div className="Topic container row-container">
            <div className="topic-header">
                <span>{props.title}</span>
            </div>
            <div className="topic-action-bar col-container">
                <div className="topic-votings-count col-container">
                    <i className={`fas fa-thumbs-up vote-mark ${props.votedByMe? 'voted-' : 'unvoted-'}topic-mark`}
                        onClick={props.onVote}></i>
                    <span>{props.votingsCount}</span>       
                    <i className={`fas fa-trash delete-mark ${!props.canDelete? 'inactive-btn' : ''}`}
                        onClick={props.onDelete}></i>             
                </div>
            </div>
        </div>
    );
}