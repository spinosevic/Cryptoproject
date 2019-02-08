import React from 'react'
import { Route, Link, Switch } from 'react-router-dom'
import Homepage from './HomePage.css'


const HomePage = props => {
  return(
    <>
    <div className="HomePage">
     <header className="showcase">
       <div className="grid-2bis">
         <div className="col-md-3 col-sm-3 col-xs-6 ">
          <Link className="btn btn-sm animated-button victoria-two" to='/signin'>Sign in</Link>
         </div>
         <div className="col-md-3 col-sm-3 col-xs-6 ">
         <Link className="btn btn-sm animated-button victoria-two" to='/signup'>Sign Up</Link> </div>
       </div>
       <div className="content">
         <img src="logo2.png" className="logo" alt="Traversy Media" />
         <div className="title">
         </div>
         <div className="text">
           Keep track of your cryptocurrencies and setup your strategies through bots.
         </div>
       </div>
     </header>
     {/* Services */}
     <section className="services">
       <div className="container grid-3 center">
         <div>
           <i className="fas fa-chart-line fa-3x" />
           <h3>Real Time Data</h3>
           <p>Keep track of your portfolio value</p>
         </div>
         <div>
           <i className="fas fa-robot fa-3x" />
           <h3>Bot</h3>
           <p>Set up strategies and create bots to automatically perform actions on the main markets.</p>
         </div>
         <div>
           <i className="fas fa-network-wired fa-3x" />
           <h3>Get insider info!</h3>
           <p>Connect with other crypto-enthusiasts and read last news</p>
         </div>
       </div>
     </section>
     {/* About */}
     <section className="about bg-light">
       <div className="container">
         <div className="grid-2">
           <div className="center">
             <i className="fas fa-laptop-code fa-10x" />
           </div>
           <div>
             <h3>About Us</h3>
             <p>This website was developed as final project for FlatIron School BootCamp.</p>
           </div>
         </div>
       </div>
     </section>
     <footer className="center bg-dark">
       <p>CryptoBot © 2018</p>
     </footer>
   </div>
    </>
  )
}

export default HomePage
