import React, { Component } from "react";
import { Mutation } from "react-apollo";
import Queries from '../../graphql/queries';
import Mutations from "../../graphql/mutations";
import { withRouter } from 'react-router';
import './messages.css';
const { FETCH_MESSAGES } = Queries;
const { NEW_MESSAGE } = Mutations;

class CreateMessage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      body: "",
      message: "",
      channel: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  update(field) {
    return e => this.setState({ [field]: e.target.value });
  }

  updateCache(cache, { data }) {
    let messages;
    try {
      messages = cache.readQuery({ query: FETCH_MESSAGES });
    } catch (err) {
      return;
    }
    if (messages) {
      let messageArray = messages.messages;
      let newMessage = data.newMessage;
      cache.writeQuery({
        query: FETCH_MESSAGES,
        data: { messages: messageArray.concat(newMessage) }
      });
    }
  }

  handleSubmit(e, newMessage) {
    e.preventDefault();
    newMessage({
      variables: {
        body: this.state.body,
        user_id: "",
        channel: this.props.history.location.pathname.split("/").slice(-1)[0]
      }
    });
  }

  render() {
    return (
      <Mutation
        mutation={NEW_MESSAGE}
        onError={err => this.setState({ message: err.message })}
        update={(cache, data) => this.updateCache(cache, data)}
        onCompleted={data => {
          const { body } = data.newMessage;
        }}
      >
        {(newMessage, { data }) => (
          <div className="send-message-form">
            <form onSubmit={e => this.handleSubmit(e, newMessage)}>
              <textarea
                onChange={this.update("body")}
                value={this.state.body}
                placeholder="Message..."
              />
              <button type="submit">Send Message</button>
            </form>
          </div>
        )}
      </Mutation>
    );
  }
}

export default withRouter(CreateMessage);