import React, { useRef} from "react";
import { useParams, useNavigate } from 'react-router-dom';
import useFetch from "./services/useFetch";
import Spinner from "./Spinner";
import PageNotFound from "./PageNotFound";

export default function Detail(props) {

    const { id } = useParams();
    const skuRef = useRef();
    const navigate = useNavigate();
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
        <select 
            id="size" 
            ref={skuRef} 
        >
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
            id="btnsubmit"
            onClick={() => {
                // the current property references the HTML document
                const sku = skuRef.current.value;
                props.addToCart(id, sku);
                navigate('/cart')
            }} 
            >Add to cart</button>
        </p>
        <img src={`/images/${product.image}`} alt={product.category} />
        </div>
    );
}
