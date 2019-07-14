import React, { Component } from 'react';
import { render } from 'react-dom';
import Hello from './Hello';
import './style.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
      userPosts: [],
      postDetails: "",
      mode: 1,
      commentList: []
    };
    fetch("https://jsonplaceholder.typicode.com/users").then(res => res.json()).then(res => this.setState({ users: res }))
  }
  setUsersPosts = (id) => {
    this.setState({ mode: 2,userPosts:[] })
    fetch("https://jsonplaceholder.typicode.com/posts?userId=" + id + "&skip=0&limit=10").then(res => res.json()).then(res => this.setState({ userPosts: res }))
  }
  setPostDetails = (id) => {
    this.setState({ mode: 3,commentList:[] })
    fetch("https://jsonplaceholder.typicode.com/posts/" + id).then(res => res.json()).then(res => this.setState({ postDetails: res }))
  }
  setCommentList = (id) => {
    fetch("https://jsonplaceholder.typicode.com/posts/" + id + "/comments").then(res => res.json()).then(res => this.setState({ commentList: res }))
  }
  deletePost = (id) => {
    fetch("https://jsonplaceholder.typicode.com/posts/" + id, { method: "DELETE" }).then(res => res.json()).then(res => {
      this.setUsersPosts(id)
    })
  }

  render() {
    return (
      <div>
        {this.state.mode === 1 ?
          <table>
            <tr>
              <th>Name</th>
              <th>Company</th>
              <th>Blog Post</th>
            </tr>
            {
              this.state.users.map((x, i) => {
                return (
                  <tr>
                    <td>{x.name}</td>
                    <td>{x.company.name}</td>
                    <td onClick={() => this.setUsersPosts(x.id)}>Posts</td>
                  </tr>)
              })
            }
          </table> : ""}
        {this.state.mode === 2 ?
          this.state.userPosts.map(x => {
            return (
              <div>
                <h4>{x.title}</h4>
                <p>{x.body}</p>
                <button onClick={() => this.setPostDetails(x.id)}>Post details</button>
              </div>
            )
          }) : ""

        }
        {this.state.mode === 3 ? <div>
          <button onClick={() => this.deletePost(this.state.postDetails.id)}>Delete Post</button>
          <h4>{this.state.postDetails.title}</h4>
          <p>{this.state.postDetails.body}</p>
          <button onClick={() => this.setCommentList(this.state.postDetails.id)}>Comments</button>
          {this.state.commentList.map(x => {
            return (<span>
              <h4>{x.name}</h4>
              <h5>{x.email}</h5>
              <p>{x.body}</p>
            </span>)
          })
          }
        </div>
          : ""
        }
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
