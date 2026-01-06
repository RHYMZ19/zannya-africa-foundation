import { useContext, useState } from "react";
import { Product } from "../types/Product";
import { CartContext } from "../context/CartContext";

interface Props {
  product: Product;
  goBack: () => void;
}

const ProductDetails: React.FC<Props> = ({ product, goBack }) => {
  const [active, setActive] = useState<number>(0);
  const { addToCart } = useContext(CartContext);

  return (
    <>
      <button onClick={goBack}>← Back</button>

      <div className="details-layout">
        <div>
          <img className="main-image" src={product.images[active]} />
          <div className="thumbnails">
            {product.images.map((img, i) => (
              <img key={i} src={img} onClick={() => setActive(i)} />
            ))}
          </div>
        </div>

        <div>
          <h2>{product.name}</h2>
          <p>${product.price}</p>
          <p><b>Quality:</b> {product.quality}</p>
          <p><b>Location:</b> {product.location}</p>

          <button onClick={() => addToCart(product)}>Add to Cart</button>
          <button className="order">Order Now</button>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
