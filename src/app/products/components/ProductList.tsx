import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { Product } from "../types/Product";

interface Props {
  onSelect: (product: Product) => void;
  search: string;
}

const ProductList: React.FC<Props> = ({ onSelect, search }) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const snapshot = await getDocs(collection(db, "products"));
      setProducts(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Product),
        }))
      );
    };
    fetchProducts();
  }, []);

  return (
    <div className="grid">
      {products
        .filter((p) =>
          p.name.toLowerCase().includes(search.toLowerCase())
        )
        .map((product) => (
          <div
            key={product.id}
            className="card"
            onClick={() => onSelect(product)}
          >
            <img src={product.images[0]} />
            <h3>{product.name}</h3>
            <p>${product.price}</p>
          </div>
        ))}
    </div>
  );
};

export default ProductList;