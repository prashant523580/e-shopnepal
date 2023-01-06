import React, { Component } from 'react'
import AnimatedStyle from "../styles/Animation.module.css";
// interface PropsTypes{
//     children : React.ReactNode
// }
export default class Container extends Component<any> {
  render() {
    return (
        <div className={AnimatedStyle.fade_in + " px-2 lg:px-8 py-6"} >
            {this.props.children}
        </div>
    )
  }
}
