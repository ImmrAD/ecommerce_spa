import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext'; // 1. Import useAuth
import { useNavigate } from 'react-router-dom'; // 2. Import useNavigate

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
}

function ProductCard({ id, name, price, imageUrl }: ProductCardProps) {
  const { addToCart } = useCart();
  const { token } = useAuth(); // 3. Get the user's token from the AuthContext
  const navigate = useNavigate(); // 4. Get the navigate function

  const handleAddToCart = () => {
    // 5. Check if the user is logged in
    if (token) {
      // If logged in, add the item to the cart
      const itemToAdd = { _id: id, name, price, imageUrl };
      addToCart(itemToAdd);
      alert(`${name} added to cart!`);
    } else {
      // If not logged in, redirect to the login page
      alert('You must be logged in to add items to the cart.');
      navigate('/login');
    }
  };

  return (
    <div className="border rounded-lg shadow-lg overflow-hidden m-4 w-72 bg-white transform hover:scale-105 transition-transform duration-300">
      <img className="w-full h-48 object-cover" src={imageUrl} alt={name} />
      <div className="p-4">
        <h3 className="font-bold text-xl mb-2 text-gray-800">{name}</h3>
        <p className="text-gray-600 text-lg">${price.toFixed(2)}</p>
      </div>
      <div className="px-4 pb-4">
        <button
          onClick={handleAddToCart}
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;