import React, { Component } from 'react'
import { Link } from "react-router-dom"
export class Items extends Component {
    Click = () => {
        console.log("Hi there, user!");
      };
    constructor() {
        super()
        this.state = {
            items: []
        }
    }
    async componentDidMount() {
        let data = await fetch('/api/items')
        let pdata = await data.json()

        this.setState({ items: pdata })

    }
    

    render() {
        return (
            <div className="items">
                {this.state.items.map(ele => {
                    return <Link to= "/item" state= {ele._id} key={ele._id} style={{ width: "18rem",display:"flex" }}>
                        <div  className="card" style={{ width: "18rem" }}  >
                            <img src={ele.url} className="card-img-top" alt="..." />
                            <div className="card-body">
                                <h5 className="card-title">{ele.title}</h5>
                                <p className="card-text">{ele.description}</p>
                                <p>{ele.price}</p>

                            </div>
                        </div>
                        </Link>
                    
                })}
            </div>


        )
    }
}

export default Items
