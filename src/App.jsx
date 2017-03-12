import React, { Component } from 'react';
import './App.css';

import StyleEditer from './StyleEditer';
import ResumeEditer from './ResumeEditer';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      style: '',
      resume: '',
      isMarkdown: false,
    }

    this.interval = 40;
    this.styleEditorContent = [
`
/*
  * Hello, 我是扎鲁特
  *
  * 这是用react版的动态简历
  * 希望大家能够喜欢 :)
  */

/* 所以我们就开始吧！首先给所有元素加上过渡效果 */
* {
-webkit-transition: all .3s;
  transition: all .3s;
}
/* 白色背景太单调了，我们来点背景 */
html {
  background: #000000; 
}
.style-editor {
  padding: .5em;
  margin: .5em;
  border: 1px solid;
  overflow: auto;
  width: 45vw; height: 90vh;
}
/* 哈哈，有没有一点儿黑客效果*/
/* 再加一点 3D 效果，更加地酷炫 */
html{
  -webkit-perspective: 1000px;
  perspective: 1000px;
}
.style-editor {
  position: fixed; left: 0; top: 0;
  transition: none;
  transform: rotateY(10deg) translateZ(-100px) ;
}
/* 不知道以上对代码框的修改你是否喜欢呢？ */

/* 接下来我给自己准备一个编辑器，用来存放我的简历内容 */
.resume-editor{
  position: fixed; right: 0; top: 0;
  padding: .5em;  margin: .5em;
  width: 48vw; height: 90vh; 
  border: 1px solid;
  background: white; color: #222;
  overflow: auto;
}
`
,
`
/*  
  * 这个简历好像差点什么
  * 对了，这是 Markdown 格式的，我需要变成对 HR 更友好的格式
  * 简单，用开源工具翻译成 HTML 就行了
  *           3          
  *           2          
  *           1          
  *        action！
  */
`
,
`
/* 再对 HTML 加点样式 */
.resume-editor{
  padding: 2em;
}
.resume-editor h1{
  display: block;
  width: 80px;
  margin: 0 auto;
}
.resume-editor h2{
  display: inline-block;
  border-bottom: 1px solid;
  margin: 1em 0 .5em;
}
.resume-editor h3{
  display: inline-block;
  margin: 0.5em 0;
}
.resume-editor a{
  color: #000;
}
.resume-editor ul{
  list-style: none;
}
.resume-editor ul>li::before {
  content: "•";
  margin-left: 1em;
  margin-right: 0.5em;
}
.resume-editor blockquote {
  margin: 1em;
  padding: .5em;
  background: #ddd;
}
`
    ];

    this.resumeEditorContent = `
# react版动态简历

## 个人资料
  1. 姓名：扎鲁特
	2. 联系方式：186****8888

## 个人爱好

	1. 技能树：
			html(5)，css(3)，ES5，ES6，scss，react；
			android，node，php，java（这些很久不用了）；
	2. 生活：
			乒乓球,电影；
			LOL（大学玩的真的是昏天暗地啊，间接证明是真爱！😝😝工作后忙了，基本没时间玩了）；

## 博客

**GitHub: **https://github.com/zarudYin

> 如果你喜欢这个效果，Fork [我的项目](https://github.com/zarudYin/react-resume)，打造你自己的简历¡`;
  }

  addToStyle(char) {
    this.setState({
      style: this.state.style + char,
    });
  }

  addToResume(char) {
    this.setState({
      resume: this.state.resume + char,
    });
  }

  render() {
    return (
      <div>
        <style>{this.state.style}</style>
        <StyleEditer content={this.state.style} />
        <ResumeEditer content={this.state.resume} isMarkdown={this.state.isMarkdown} />
      </div>
    );
  }

  componentDidMount() {
    this.startShow();
  }

  async startShow() {
    await this.showStyleEditorContent(0);
    await this.showResumeContent();
    await this.showStyleEditorContent(1);
    await this.setResumeMarkdown();
    await this.showStyleEditorContent(2);
    console.log('startShow end');
  }

  showStyleEditorContent(n) {
    let lastContentLength = this.state.style.length;
    let style = this.styleEditorContent[n];
    let len = style.length;
    return new Promise((resolve, reject) => {
      let showStyle = function () {
        let currentLen = this.state.style.length - lastContentLength;
        if (currentLen < len) {
          this.addToStyle(style.substring(currentLen, currentLen + 1));
          setTimeout(showStyle, this.interval);
        } else {
          resolve();
        }
      }.bind(this);

      showStyle();
    });
  }

  showResumeContent() {
    let content = this.resumeEditorContent;
    let len = content.length;
    return new Promise((resolve, reject) => {
      let showContent = function () {
        let currentLen = this.state.resume.length;
        if (currentLen < len) {
          this.addToResume(content.substring(currentLen, currentLen + 1));
          setTimeout(showContent, this.interval);
        } else {
          resolve();
        }
      }.bind(this);

      showContent();
    });
  }

  setResumeMarkdown() {
    return new Promise((resolve, reject) => {
      this.setState({
        isMarkdown: true
      }, () => {
        resolve();
      })
    });
  }
}

export default App;
