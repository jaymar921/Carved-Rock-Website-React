import React, {useState} from "react";
import { useParams, useNavigate } from 'react-router-dom';
import useFetch from "./services/useFetch";
import Spinner from "./Spinner";
import PageNotFound from "./PageNotFound";
import { useCart } from "./cartContext";

export default function Detail(props) {
    const {dispatch} = useCart();
    const { id } = useParams();
    const navigate = useNavigate();
    const [sku, setSku] = useState('');
    const {data: product, error, loading} = useFetch('products/'+id);

    if(loading) return <Spinner />;
    if(!product) return <PageNotFound />
    if(error) throw error;


    //TODO: Display these products details
    return (
        <div id="detail">
        <h1>{product.name}</h1>
        <p>{product.description}</p>
        <p id="price">${product.price}</p>
        <select id="size" value={sku} onChange={(e) => {setSku(e.target.value);}}>
              <option value="">What size?</option>
              { product.skus.map((s) => (
                <option key={s.sku} value={s.sku}>
                    {s.size}
                </option>
              ))}
        </select>
        <p>
            <button 
            className="btn btn-primary" 
            onClick={() => {
                dispatch({ type: "add", id, sku });
                navigate('/cart')
            }} 
            disabled={!sku}
            >Add to cart</button>
        </p>
        <img src={`/images/${product.image}`} alt={product.category} />
        </div>
    );
}
