import { Link } from 'react-router-dom';
import { FaBoxOpen, FaPlus } from 'react-icons/fa';

const Navbar = () => {
    return (
        <nav className="glass-panel" style={{
            marginBottom: '2rem',
            padding: '1rem 2rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: '1rem'
        }}>
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--primary)' }}>
                <FaBoxOpen />
                <span>ProductApp</span>
            </Link>

            <Link to="/add" className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <FaPlus />
                <span>Add Product</span>
            </Link>
        </nav>
    );
};

export default Navbar;
