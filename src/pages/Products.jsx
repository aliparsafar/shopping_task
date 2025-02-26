import { useState, useEffect } from "react";
import axios from "axios";

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://strapi-store-server.onrender.com/api/products");
        setProducts(response.data.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const clearProducts = () => {
    setProducts([]);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-center mb-4 mr-350">Products</h2>
     
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <div key={product.id} className=" p-4 rounded shadow-xl bg-pink-200">
            <img 
              src={`YOUR_STRAPI_BASE_URL${product.attributes.image?.data?.attributes?.url}`} 
              alt={product.attributes.title} 
              className="w-full h-48 object-cover rounded mb-2"
            />
            <h3 className="text-lg font-semibold">{product.attributes.title}</h3>
            <p className="text-blue-500 font-bold mt-2">${product.attributes.price}</p>
            <p className="text-gray-500 text-sm">Category: {product.attributes.category}</p>
          </div>
        ))}
         <button 
        onClick={clearProducts} 
        className="bg-red-500 text-white px-4 py-2 rounded mb-4 hover:bg-red-700 w-40 h-10 flex justify-center items-center mt-20 ml-40"
      >
        Clear All Products
      </button>
      </div>
    </div>
  );
};

export default Products;


