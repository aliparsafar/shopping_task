import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
const Navbar = () => {
  return (
    <nav className="bg-pink-300 p-4 text-white flex justify-between items-center ">
      <h1 className="bg-clip-text bg-linear-to-r text-transparent from-[#F97316] to-[#22C55E] text-2xl">Shopedia</h1>
      <div>
      <Link to="/products" className="hover:underline mr-5">Products</Link>
        <Link to="/login" className="mr-4 hover:underline">Login</Link>
        <Link to="/signup" className="hover:underline">Signup</Link>
        <Link to="/cart" className="">
          <FaShoppingCart size={24} className="inline ml-5" />
          {/* You can add a badge here to show cart item count */}
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;

