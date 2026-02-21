import { Link } from 'react-router-dom';
import { FaBoxOpen, FaPlus } from 'react-icons/fa';

const Navbar = () => {
    return (
        <nav className="bg-slate-800/70 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-lg mb-8 px-8 py-4 flex justify-between items-center mt-4">
            <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-[--color-primary]">
                <FaBoxOpen />
                <span>ProductApp</span>
            </Link>

            <Link to="/add" className="bg-gradient-to-br from-[--color-primary] to-[--color-primary-hover] text-white px-6 py-3 rounded-lg font-semibold transition-all hover:-translate-y-0.5 hover:shadow-[0_10px_15px_-3px_rgba(139,92,246,0.3)] flex items-center gap-2">
                <FaPlus />
                <span>Add Product</span>
            </Link>
        </nav>
    );
};

export default Navbar;
