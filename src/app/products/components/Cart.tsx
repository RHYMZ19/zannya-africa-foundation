import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { AuthContext } from "../context/AuthContext";


const Cart: React.FC = () => {
  const { cart, removeFromCart } = useContext(CartContext);

  const { user } = useContext(AuthContext);

 const checkout = async () => {
  if (!user) return alert("Login first");

  await addDoc(collection(db, "orders"), {
    userId: user.uid,
    items: cart,
    total: cart.reduce((sum, i) => sum + i.price, 0),
    status: "pending",
    createdAt: Date.now(),
  });

  alert("Order placed!");
 };

  return (
    <div>
      <h2>Cart</h2>
      {cart.map((item) => (
        <div key={item.id}>
          {item.name} - ${item.price}
          <button onClick={() => removeFromCart(item.id!)}>Remove</button>
        </div>
      ))}
      <button onClick={checkout}>Checkout</button>
    </div>
  );
};

export default Cart;