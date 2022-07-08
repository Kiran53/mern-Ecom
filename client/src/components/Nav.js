import React from 'react'
import{Link} from 'react-router-dom'
import "../static/style.css"
import { useSelector } from 'react-redux'
export default function Nav() {
    const user=useSelector(state=>state.user)
    console.log(user)
    return (
        <div>
            
            <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
                rel="stylesheet" />
            <link rel="stylesheet" href="../static/style.css"/>
            <meta name="viewport" content="initial-scale=1, maximum-scale=1"></meta>
            <nav className="navbar">
                <i className="material-icons menu-icon">
                    menu
                </i>
                <div className="logo">
                    <img src="https://github.com/subeshb1/GrabCheap/blob/master/img/logo_inverse.jpg?raw=true" alt="logo" />
                    <Link to="/">Grab it</Link>
                </div>
                <div className="item search right" tabIndex="0">
                    <div className="search-group">
                        <select>
                            <option value="all">All</option>
                            <option value="all">Mens</option>
                            <option value="all">Womens</option>
                            <option value="all">Winter</option>
                            <option value="all">Summer</option>
                        </select>
                        <input type="text" />
                        <i className="material-icons search-icon">
                            search
                        </i>
                    </div>
                </div>

                {user===null? 
                <Link to="/login" className="item">

                    <div className="group">
                        <i className="material-icons" >
                            account_circle
                        </i>
                        <div className="detail">
                            Account
                            <div className="sub">Sign In</div>
                        </div>
                    </div>
                </Link>
                :
                <Link to="/logout" className="item">

                    <div className="group">
                        <i className="material-icons" >
                            account_circle
                        </i>
                        <div className="detail">
                            Logout
                        </div>
                    </div>
                </Link>
                }
                <Link to="/login" className="item">
                    <div className="group">
                        <i className="material-icons">
                            shopping_cart
                        </i>
                        <div className="detail">
                            Cart
                            <div className="sub">Rs 0.0</div>
                        </div>
                    </div>
                </Link>
            </nav>
        </div>
    )
}
