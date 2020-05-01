import Link from 'next/link'
import React from 'react'
import isMobile from 'ismobilejs'
import Header from '../components/header'
import Footer from '../components/footer'
import { InfoCircleFilled } from '@ant-design/icons'

export default class Index extends React.Component{
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
                <section className="next-index-section-one">
                    <section className="next-index-card-large">
                        <img src="https://static.ouorz.com/feature-component-actionsheet-icon.png"/>
                        <div>
                            <h1>One Step</h1>
                            <p>A nice and easy way to find a paper</p>
                        </div>
                    </section>
                    <section className="next-index-section-cards">
                        <Link href="/cate/igcse">
                        <div className="card">
                            <div><img src="https://static.ouorz.com/ribbon.png" /></div>
                            <div>
                                <h2>IGCSE</h2>
                                <p>Cambridge International General Certificate of Secondary Education</p>
                            </div>
                        </div>
                        </Link>
                        <Link href="/cate/alevels">
                        <div className="card">
                            <div><img src="https://static.ouorz.com/school.png" /></div>
                            <div>
                                <h2>A Levels</h2>
                                <p>Cambridge International General Certificate of Education Advanced Level</p>
                            </div>
                        </div>
                        </Link>
                        <Link href="/topic/ebooks">
                        <div className="card">
                            <div><img src="https://static.ouorz.com/library-icon.png" /></div>
                            <div>
                                <h2>PDF eBooks</h2>
                                <p>Cambridge International Curriculum PDF electronic textbooks</p>
                            </div>
                        </div>
                        </Link>
                        <Link href="/topic/savemyexams">
                        <div className="card">
                            <div><img src="https://static.ouorz.com/shapes.png" /></div>
                            <div>
                                <h2>Save My Exams</h2>
                                <p>Awesome practice exams from SaveMyExams website (Mark Scheme Only)</p>
                            </div>
                        </div>
                        </Link>
                    </section>
                </section>
                <section className="next-index-section-two">
                    <div className="next-index-card-left">
                        <Link href="/page/about">
                            <div>
                            <h1>About Us <InfoCircleFilled /></h1>
                                <p>Everything about the Snapaper platform and the ones behind it</p>
                            </div>
                        </Link>
                    </div>
                    <div className="next-index-card-right">
                        <Link href="/page/donation">
                            <div>
                                <h1>Donation</h1>
                                <p>Snapaper is alway going to be powered by Love</p>
                            </div>
                        </Link>
                        <div>
                            <img src="https://static.ouorz.com/donation.jpg" />
                        </div>
                    </div>
                </section>
            </main>
            <Footer></Footer>
        </div>
    )
    }
}