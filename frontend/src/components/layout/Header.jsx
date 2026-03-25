import { Link } from 'react-router-dom';
import { useCartStore } from '../../store/useCartStore';
import { useSearchStore } from '../../store/useSearchStore';
const Header = () => {
  const { cart } = useCartStore();
  const { searchTerm, setSearchTerm } = useSearchStore();
  const totalItems = cart.reduce((total, item) => total + item.cantidad, 0);

  return (
      <header className="bg-cemaco-blue text-white shadow-lg sticky top-0 z-50 h-20 flex items-center">
        <div className="w-full max-w-[1400px] mx-auto px-6 flex items-center justify-between">

          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2 group">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-cemaco-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m0 0l-7 7-7-7M19 10v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span className="text-3xl font-extrabold tracking-tight hidden md:block">
              CEMACO
            </span>
            </Link>

            <button className="flex items-center gap-2 font-medium hover:text-gray-200 transition-colors cursor-pointer group text-sm md:text-base">
              Departamentos
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mt-0.5 group-hover:translate-y-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>

          <div className="flex-grow max-w-2xl mx-12 hidden lg:block">
            <div className="relative group">
              <input
                  type="search"
                  placeholder="Buscar por nombre o SKU..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-white text-gray-900 rounded-full py-2.5 px-6 pr-14 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-cemaco-orange transition-all"
              />
              <button className="absolute right-0 top-0 h-full px-5 text-gray-400 hover:text-cemaco-orange transition-colors cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </div>

          <div className="flex items-center gap-8">
            <Link to="/login" className="flex items-center gap-2.5 group hover:text-gray-200 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-sm font-medium tracking-tight">
              Iniciar sesión
            </span>
            </Link>

            <Link to="/carreta" className="relative group cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white group-hover:text-cemaco-orange transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
              </svg>

              {totalItems > 0 && (
                  <span className="absolute -top-1.5 -right-2 bg-cemaco-orange text-white text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center border-2 border-cemaco-blue">
                {totalItems}
              </span>
              )}
            </Link>
          </div>

        </div>
      </header>
  );
};

export default Header;