import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "../static/style.css"
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../slices/auth'
export default function Nav() {
    const user = useSelector(state => state.auth.user)
    // console.log("user="+user)
    const nav = useNavigate()
    const dispatch = useDispatch();

    let Handlelogout = async (e) => {
        e.preventDefault();
        dispatch(logout())
            .then(() => nav('/'))
    }
    return (
        <div>

            <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
                rel="stylesheet" />
            <link rel="stylesheet" href="../static/style.css" />
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

                {user === null ?
                    <Link to='/login' className="item">

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
                

                    <div className="group">
                        <i className="material-icons" >
                            account_circle
                        </i>
                        <button onClick={Handlelogout} className="btn btn-link text-white">
                            <div className="detail">
                                Logout
                            </div>
                        </button>
                    </div>
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
