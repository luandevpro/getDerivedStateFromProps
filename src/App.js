import React, { Component } from 'react'
import styled from 'styled-components'
import { FaAngleUp ,FaAngleDown } from "react-icons/fa"
import { getstock, setPrice} from './hocs'

const IconColors = color => key => {
   return <IconColor color={color}>{key}</IconColor>
}

class StockPrice extends Component{
   state = {}

  
   static getDerivedStateFromProps(props,state){
      if(!state.price){
         return {
            price: props.price,
            direction: 'initial',
            color: 'transparent'
         }
      }else if(props.price > state.price){
         return {
            price: props.price,
            direction: 'up',
            color: 'yellow'
         }
      }else if(props.price < state.price){
         return {
            price: props.price,
            direction: 'down',
            color: 'red'
         }
      }
   }
   showIcon = (direction,color)=> {
      switch(direction){
         case 'up':
            return IconColors(color)(<FaAngleUp />)
         case 'down':
            return IconColors(color)(<FaAngleDown />)
         default:
            break   
      }
   }
   render(){
      return (
         <h1>
            { this.showIcon(this.state.direction,this.state.color) }
            <Text color={this.state.color}>{this.props.price}</Text>
         </h1>
      )
   }
}
export default class App extends Component {
   state = {
      price: getstock()
   }
   
   fetch = () => {
      this.setState(setPrice(getstock()))
   }
   componentDidMount(){
      setInterval(this.fetch , 5000)
   }
  render() {
     console.log("number tow")
    return (
      <div className="row mt-5">
         <div className="col-md-6 offset-md-3 text-center">
            <div className="btn btn-primary btn-lg">
               <div className="text-center p-3">
                  <StockPrice price = {this.state.price}/>
               </div>
            </div>
         </div>
      </div>
    )
  }
}

export const Text = styled.span`
   color: ${props => props.color}
`

export const IconColor = styled.span`
   color: ${props => props.color}
`