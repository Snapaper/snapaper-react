import Link from 'next/link'
import React from 'react'
import isMobile from 'ismobilejs'
import Header from '../../components/header'
import Footer from '../../components/footer'

export default class Alevel extends React.Component{
    constructor(props){
        super(props)
        this.state = {}
    }
    componentDidMount(){
        this.setState({
            isMobile: isMobile(window.navigator).any
        })
    }
    render(){
    return (
        <div>
            <Header></Header>
            <main className="ant-container">
                <h1>Hello World</h1>
            </main>
            <Footer></Footer>
        </div>
    )
    }
}