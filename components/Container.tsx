import React, { Component } from 'react'
import AnimatedStyle from "../styles/Animation.module.css";
// interface PropsTypes{
//     children : React.ReactNode
// }
export default class Container extends Component<any> {
  render() {
    return (
        <div className={AnimatedStyle.fade_in} >
            {this.props.children}
        </div>
    )
  }
}
