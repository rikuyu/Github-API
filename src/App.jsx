import React, { Component } from "react";
import "./App.css";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      bio: "",
      avatar_url: "",
      userId: "",
    };
  }

  getUserInfo = async () => {
    const response = await fetch("https://api.github.com/users/rikuyu");
    console.log(`ステータスコード：${response.status}`);
    return response.json();
  };

  createView = (userInfo) => {
    this.setState({
      name: userInfo.name,
      bio: userInfo.bio,
      avatar_url: userInfo.avatar_url,
      userId: userInfo.id,
    });

    const profile = `<p>【Username】${this.state.name}</p>
        <img src="${this.state.avatar_url}" alt="avatar-img" height="100" width="100"/>
        <div>
        ${this.state.bio}
        </div>
        <div>
        <p>【Recent Contribution】</p>
        <img src="https://grass-graph.moshimo.works/images/rikuyu.png?" />
        </div>
    `;

    return profile;
  };

  main = () => {
    this.getUserInfo()
      .then((response) => {
        const profile = this.createView(response);
        const profileTag = document.getElementById("profile");
        profileTag.innerHTML = profile;
      })
      .catch((error) => {
        console.log("エラー発生" + error);
      });
  };

  render() {
    return (
      <div className="profile">
        <p className="title">Github API</p>
        <button className="get-info-button" onClick={this.main}>
          Get User Information
        </button>
        <div className="user-info" id="profile"></div>
      </div>
    );
  }
}
