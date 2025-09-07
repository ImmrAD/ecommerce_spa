import { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';

interface Item {
  _id: string;
  name: string;
  category: string;
  price: number;
  imageUrl: string;
}

export default function HomePage() {
  // All the necessary state variables are declared here
  const [items, setItems] = useState<Item[]>([]);
  const [category, setCategory] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (category) params.append('category', category);
        if (minPrice) params.append('minPrice', minPrice);

        const response = await axios.get(`https://ecommerce-spa-55m5.onrender.com/api/items?${params.toString()}`);
        setItems(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchItems();
  }, [category, minPrice]);

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-800">
        Our Products
      </h1>
      
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 mb-8 p-4 bg-white rounded-lg shadow">
        <select value={category} onChange={e => setCategory(e.target.value)} className="p-2 border rounded-md w-full sm:w-auto">
          <option value="">All Categories</option>
          <option value="Electronics">Electronics</option>
          <option value="Apparel">Apparel</option>
          <option value="Books">Books</option>
        </select>
        <input 
          type="number" 
          value={minPrice} 
          onChange={e => setMinPrice(e.target.value)} 
          placeholder="Minimum Price"
          className="p-2 border rounded-md w-full sm:w-auto"
        />
      </div>

      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <div className="flex flex-wrap justify-center gap-4">
          {items.map(item => (
            <ProductCard
              key={item._id}
              id={item._id}
              name={item.name}
              price={item.price}
              imageUrl={item.imageUrl}
            />
          ))}
        </div>
      )}
    </div>
  );
}