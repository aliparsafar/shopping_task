import { useState, useEffect } from "react";
import axios from "axios";
import EmptyBagMessage from "../components/emptybagmassage"; 

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://strapi-store-server.onrender.com/api/products");
        
        const productsWithQuantity = response.data.data.map(product => ({
          ...product,
          quantity: 1,
        }));
        setProducts(productsWithQuantity);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const clearProducts = () => {
    setProducts([]);
  };

  const removeProduct = (id) => {
    setProducts(products.filter(product => product.id !== id));
  };

  const increaseQuantity = (id) => {
    setProducts(products.map(product =>
      product.id === id ? { ...product, quantity: product.quantity + 1 } : product
    ));
  };

  const decreaseQuantity = (id) => {
    setProducts(products.map(product =>
      product.id === id && product.quantity > 1
        ? { ...product, quantity: product.quantity - 1 }
        : product
    ));
  };


  const totalPrice = products.reduce(
    (total, product) => total + (Number(product.attributes.price) * product.quantity),
    0
  );

  return (
    <div className="p-6">
      <button 
        onClick={clearProducts} 
        className="bg-amber-50 text-black px-4 py-2 rounded mb-4 hover:bg-cyan-900 w-40 h-10 flex justify-center items-center mt-20 ml-160"
      >
        Clear All Products
      </button>
      
      <h2 className="text-2xl font-bold text-center mb-4 mr-350 text-amber-50">Products</h2>
      
      {products.length === 0 ? (
        <EmptyBagMessage />
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((product) => (
              <div key={product.id} className="p-4 rounded shadow-xl bg-cyan-900">
                <img 
                  src={product.attributes.image}
                  alt={product.attributes.title} 
                  className="w-full h-48 object-cover rounded mb-2"
                />
                <h3 className="text-lg font-semibold">{product.attributes.title}</h3>
                <p className="text-blue-500 font-bold mt-2">${product.attributes.price}</p>
                <p className="text-gray-500 text-sm">Category: {product.attributes.category}</p>
                
                <div className="flex items-center space-x-2 mt-2">
                  <button 
                    onClick={() => decreaseQuantity(product.id)} 
                    className="bg-gray-300 text-black px-2 py-1 rounded hover:bg-gray-400"
                  >
                    -
                  </button>
                  <span className="text-lg font-semibold">{product.quantity}</span>
                  <button 
                    onClick={() => increaseQuantity(product.id)} 
                    className="bg-gray-300 text-black px-2 py-1 rounded hover:bg-gray-400"
                  >
                    +
                  </button>
                </div>
                
                <button 
                  onClick={() => removeProduct(product.id)} 
                  className="bg-red-500 text-white px-2 py-1 rounded mt-2 hover:bg-red-700"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <div className="mt-4 text-right  bg-amber-50 w-50 h-10 rounded-2xl flex items-center justify-center">
            <p className="text-xl font-bold">Total: ${totalPrice}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default Products;





