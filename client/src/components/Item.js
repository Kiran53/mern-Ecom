import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from 'react-router';
import { get } from '../slices/item'
import {add} from '../slices/cart'
import "../static/itemstyles.css"
import { Link } from 'react-router-dom';

export default function Item(props) {
    const dispatch = useDispatch()
    const location = useLocation()
    const id = location.state;
    // const loading = useSelector(state => state.item.loading)
    const ele = useSelector(state => state.item.item)
    useEffect(() => {
        dispatch(get(id))
            .then(item => {
                
                setMainurl(item.payload.urls[0])
            })
            .catch(error=>{console.log(error)})
        // console.log(typeof ele)  
        // console.log(ele)  
    },[])
    let handlecart=()=>{
        const user= useSelector(state => state.auth.user)
        if(user===null)browserHis
        let data={
            uid:user,
            productId:
        }
        dispatch(add())
    }
    // //   const [loading, setLoading] = useState(true);
    const [mainurl, setMainurl] = useState();
    //   const [ele, setEle] = useState([])
    //   useEffect(() => {
    //     const fetchData = async () =>{
    //     //   setLoading(true);
    //       try {
    //         const {data: response} = await axios.get('/api/item/'+id);
    //         setEle(response);
    //         setMainurl(response.url)
    //       } catch (error) {
    //         console.error(error.message);
    //       }
    //     //   setLoading(false);
    //     }

    //     fetchData();
    //   });

    return (

        <div className="item">
            {ele===null? <h1>LOADING</h1> :  <div>
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" />
                <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js"></script>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
                <div className="container">
                    <div className="col-lg-8 border p-3 main-section bg-white">

                        <div className="row m-0">
                            <div className="col-lg-4 left-side-product-box pb-3">
                                <img alt="..." src={mainurl} className="border p-3" />
                                <span className="sub-img">
                                    <img alt="..." src={ele.urls[0]} onClick={(e) => setMainurl(e.target.src)} className="border p-2" />
                                    <img alt="..." src={ele.urls[1]} onClick={(e) => setMainurl(e.target.src)} className="border p-2" />
                                    <img alt="..." src={ele.urls[2]} onClick={(e) => setMainurl(e.target.src)} className="border p-2" />
                                </span>
                            </div>
                            <div className="col-lg-8">
                                <div className="right-side-pro-detail border p-3 m-0">
                                    <div className="row">
                                        <div className="col-lg-12">

                                            <p className="m-0 p-0">{ele.title}</p>
                                        </div>
                                        <div className="col-lg-12">
                                            <p className="m-0 p-0 price-pro">{ele.price}</p>
                                            <hr className="p-0 m-0" />
                                        </div>
                                        <div className="col-lg-12 pt-2">
                                            <h5 className="text-dark">Product Detail</h5>
                                            <span className ="text-dark">{ele.description}</span>
                                            <hr className="m-0 pt-2 mt-2" />
                                        </div>
                                        <div className="col-lg-12">
                                            <p className="tag-section"><strong>Tag : </strong><a href="">{ele.category}</a></p>
                                        </div>
                                        <div className="col-lg-12">
                                            <h6>Quantity :</h6>
                                            <input type="number" className="form-control text-center w-100" defaultValue="1" min="1" max="999" />
                                        </div>
                                        <div className="col-lg-12 mt-3">
                                            <div className="row">
                                                <div className="col-lg-6 pb-2">
                                                    <button  className="btn btn-danger w-100" onClick={handlecart}>Add To Cart</button>
                                                </div>

                                                <div className="col-lg-6">
                                                    <a href="#" className="btn btn-success w-100">Shop Now</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-12 text-center pt-3">
                                <h4>More Product</h4>
                            </div>
                        </div>
                        <div className="row mt-3 p-0 text-center pro-box-section">
                            <div className="col-lg-3 pb-2">
                                <div className="pro-box border p-0 m-0">
                                    <img alt="..." src="http://nicesnippets.com/demo/pd-b-image1.jpg" />
                                </div>
                            </div>
                            <div className="col-lg-3 pb-2">
                                <div className="pro-box border p-0 m-0">
                                    <img alt="..." src="http://nicesnippets.com/demo/pd-b-images2.jpg" />
                                </div>
                            </div>
                            <div className="col-lg-3 pb-2">
                                <div className="pro-box border p-0 m-0">
                                    <img alt="..." src="http://nicesnippets.com/demo/pd-b-images3.jpg" />
                                </div>
                            </div>
                            <div className="col-lg-3 pb-2">
                                <div className="pro-box border p-0 m-0">
                                    <img alt="..." src="http://nicesnippets.com/demo/pd-b-images4.jpg" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            }
        </div>
    )
}
