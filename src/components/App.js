import React, { Component } from 'react';
import axios from 'axios';

import './App.css';

import Header from './Header/Header';
import Compose from './Compose/Compose';
import Post from './Post/Post'

class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: []
    };

    this.updatePost = this.updatePost.bind( this );
    this.deletePost = this.deletePost.bind( this );
    this.createPost = this.createPost.bind( this );
    this.searchPosts = this.searchPosts.bind( this );
  }
  
  componentDidMount() {
    let url = 'https://practiceapi.devmountain.com/api/posts';
    axios.get(url)
     .then (res => {
      this.setState({posts: res.data});
    });

  }

  updatePost(id, text) {
    let url = 'https://practiceapi.devmountain.com/api/posts';
    axios.put(url+=`?id=${id}`, {text})
    .then (res => {
      this.setState({posts:res.data})
    })
  }

  deletePost(id) {
    let url = 'https://practiceapi.devmountain.com/api/posts';
    axios.delete(url+=`?id=${id}`)
    .then (res => {
      this.setState({posts:res.data})
    })
  }

  createPost(text) {
    let url = 'https://practiceapi.devmountain.com/api/posts';
    axios.post(url, {text})
    .then(res => {
        this.setState({posts:res.data});
      }
    )
  }

  searchPosts(text){
    let url = 'https://practiceapi.devmountain.com/api/posts';

    if(text){
    axios.get(url+=`/filter?text=${text}`)
    .then(res => {
      console.log(res.data)
      if(res.data[0]){
      this.setState({posts:res.data});
      }else{
        this.setState({posts:[{text:`I'm sorry, there are no posts that contain the word ${text}`}]})
      }})
    }else{
      this.componentDidMount();
    }  
      }

  render() {
    const { posts } = this.state;

    return (
      <div className="App__parent">
        <Header searchPostsFn={this.searchPosts}/>

        <section className="App__content">

          <Compose createPostFn={this.createPost}/>
          {posts.map( post => ( 
            <Post deletePostFn={this.deletePost} id={post.id} updatePostFn={this.updatePost} text={post.text} date={post.date} key={post.id}/>
          ))}
        </section>
      </div>
    );
  }
}

export default App;
