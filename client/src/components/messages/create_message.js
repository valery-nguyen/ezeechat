import React, { Component } from "react";
import { Mutation } from "react-apollo";
import Queries from '../../graphql/queries';
import Mutations from "../../graphql/mutations";
const { FETCH_MESSAGES, IS_LOGGED_IN } = Queries;
const { NEW_MESSAGE } = Mutations;

class CreateMessage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      body: "",
      message: ""
    };
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
        user_id: ""
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
          <div>
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

export default CreateMessage;