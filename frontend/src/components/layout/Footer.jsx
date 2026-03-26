import { useState } from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {

  const [openSections, setOpenSections] = useState({
    servicios: false,
    valores: false,
    venta: false,
    grupo: false
  });

  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
      <footer className="w-full flex flex-col font-sans">

        {/* Barra Azul Superior de Contacto */}
        <div className="bg-[#0f1f8c] text-white text-sm font-medium py-3 px-4">
          <div className="max-w-[1400px] mx-auto flex flex-wrap justify-center md:justify-between items-center gap-4">

            <div className="flex items-center gap-2 cursor-pointer hover:text-cemaco-orange transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
              <span>Tiendas</span>
            </div>

            <div className="flex items-center gap-2 cursor-pointer hover:text-cemaco-orange transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              <span>tusamigos@cemaco.com</span>
            </div>

            <div className="flex items-center gap-2 cursor-pointer hover:text-cemaco-orange transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
              <span>Compra por WhatsApp</span>
            </div>

            <div className="flex items-center gap-2 cursor-pointer hover:text-cemaco-orange transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M5 3a2 2 0 00-2 2v1c0 8.284 6.716 15 15 15h1a2 2 0 002-2v-3.28a1 1 0 00-.684-.948l-4.493-1.498a1 1 0 00-1.21.502l-1.13 2.257a11.042 11.042 0 01-5.516-5.517l2.257-1.128a1 1 0 00.502-1.21L9.228 3.683A1 1 0 008.279 3H5z" /></svg>
              <span>(502) 2499-9990</span>
            </div>

            <div className="flex items-center gap-2 cursor-pointer hover:text-cemaco-orange transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
              <span>Chat en línea</span>
            </div>

          </div>
        </div>

        {/* Cuerpo principal del Footer (Acordeones en móvil, Columnas en Desktop) */}
        <div className="bg-[#f5f5f5] text-gray-800 py-4 md:py-10 px-0 md:px-6">
          <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-0 md:gap-8 text-sm">

            {/* 1. Servicios */}
            <div className="border-b border-gray-300 md:border-none">
              <button
                  onClick={() => toggleSection('servicios')}
                  className="w-full flex justify-between items-center py-4 px-6 md:p-0 bg-white md:bg-transparent md:cursor-auto"
              >
                <h3 className="font-bold text-base text-black">Servicios</h3>
                {/* Icono flecha solo visible en móvil */}
                <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 md:hidden transition-transform ${openSections.servicios ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className={`px-6 pb-4 md:p-0 ${openSections.servicios ? 'block' : 'hidden'} md:block md:mt-4`}>
                <ul className="space-y-3 md:space-y-2 text-gray-700">
                  <li><Link to="/" className="hover:underline">Instalaciones</Link></li>
                  <li><Link to="/" className="hover:underline">Blog</Link></li>
                  <li><Link to="/" className="hover:underline">Tiendas</Link></li>
                  <li><Link to="/" className="hover:underline">Privilegio</Link></li>
                  <li><Link to="/" className="hover:underline">Servicio a empresas</Link></li>
                  <li><Link to="/" className="hover:underline">Bodas</Link></li>
                  <li><Link to="/" className="hover:underline">Actividades</Link></li>
                </ul>
              </div>
            </div>

            {/* 2. Nuestros valores */}
            <div className="border-b border-gray-300 md:border-none">
              <button
                  onClick={() => toggleSection('valores')}
                  className="w-full flex justify-between items-center py-4 px-6 md:p-0 bg-white md:bg-transparent md:cursor-auto"
              >
                <h3 className="font-bold text-base text-black">Nuestros valores</h3>
                <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 md:hidden transition-transform ${openSections.valores ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className={`px-6 pb-4 md:p-0 ${openSections.valores ? 'block' : 'hidden'} md:block md:mt-4`}>
                <ul className="space-y-3 md:space-y-2 text-gray-700">
                  <li><Link to="/" className="hover:underline">Sostenibilidad</Link></li>
                  <li><Link to="/" className="hover:underline">Garantía total</Link></li>
                  <li><Link to="/" className="hover:underline">Sistema B</Link></li>
                </ul>
              </div>
            </div>

            {/* 3. Venta en línea */}
            <div className="border-b border-gray-300 md:border-none">
              <button
                  onClick={() => toggleSection('venta')}
                  className="w-full flex justify-between items-center py-4 px-6 md:p-0 bg-white md:bg-transparent md:cursor-auto"
              >
                <h3 className="font-bold text-base text-black">Venta en línea</h3>
                <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 md:hidden transition-transform ${openSections.venta ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className={`px-6 pb-4 md:p-0 ${openSections.venta ? 'block' : 'hidden'} md:block md:mt-4`}>
                <ul className="space-y-3 md:space-y-2 text-gray-700">
                  <li><Link to="/" className="hover:underline">Retirar en tienda</Link></li>
                  <li><Link to="/" className="hover:underline">Métodos de pago</Link></li>
                  <li><Link to="/" className="hover:underline">Preguntas frecuentes</Link></li>
                  <li><Link to="/" className="hover:underline">Instalar CEMACO.com</Link></li>
                </ul>
              </div>
            </div>

            {/* 4. Grupo Cemaco */}
            <div className="border-b border-gray-300 md:border-none">
              <button
                  onClick={() => toggleSection('grupo')}
                  className="w-full flex justify-between items-center py-4 px-6 md:p-0 bg-white md:bg-transparent md:cursor-auto"
              >
                <h3 className="font-bold text-base text-black">Grupo Cemaco</h3>
                <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 md:hidden transition-transform ${openSections.grupo ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className={`px-6 pb-4 md:p-0 ${openSections.grupo ? 'block' : 'hidden'} md:block md:mt-4`}>
                <ul className="space-y-3 md:space-y-2 text-gray-700">
                  <li><Link to="/" className="hover:underline">Únete a nuestro equipo</Link></li>
                  <li><Link to="/" className="hover:underline">Sobre nosotros</Link></li>
                  <li><Link to="/" className="hover:underline">Deseas ser proveedor</Link></li>
                  <li><Link to="/" className="hover:underline">Juguetón</Link></li>
                  <li><Link to="/" className="hover:underline">Bebé Juguetón</Link></li>
                </ul>
              </div>
            </div>

            {/* Bloque de Certificaciones y Newsletter (Siempre visible) */}
            <div className="lg:col-span-2 flex flex-col gap-6 px-6 md:px-0 pt-8 md:pt-0">

              <div className="flex flex-col sm:flex-row gap-6 items-start">
                {/* Certificado B */}
                <div className="flex items-center gap-3">
                  <div className="w-12 h-16 border-[3px] border-black flex flex-col items-center justify-center rounded-sm font-serif bg-white">
                    <span className="text-[10px] font-bold leading-tight uppercase">Empresa</span>
                    <span className="text-3xl font-bold leading-none -mt-1">B</span>
                    <span className="text-[8px] mt-1 border-t border-black w-full text-center">Certificada</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-black leading-tight">Somos una empresa B</h4>
                    <p className="text-xs text-gray-600 mt-1 leading-tight max-w-[150px]">
                      Estamos orgullosos de ser reconocidos por los más altos estándares de sostenibilidad social y ambiental.
                    </p>
                    <Link to="/" className="text-xs font-bold underline mt-1 block hover:text-cemaco-blue">Conoce más</Link>
                  </div>
                </div>

                {/* Opiniones */}
                <div className="w-24 h-24 rounded-full border-4 border-black flex flex-col items-center justify-center bg-white shadow-sm relative shrink-0">
                  <div className="text-2xl font-black text-black leading-none">582K</div>
                  <div className="text-cemaco-orange flex gap-0.5 text-[10px] mt-1">★★★★★</div>
                  <div className="text-[9px] font-bold text-center leading-tight mt-1 uppercase">Opiniones<br/>certificadas</div>
                </div>
              </div>

              {/* Newsletter */}
              <div className="mt-2 bg-white md:bg-transparent p-6 md:p-0 rounded-lg shadow-sm md:shadow-none">
                <h3 className="font-bold text-base text-black">Suscríbete</h3>
                <p className="text-sm text-gray-700 mb-3">Recibe ofertas, beneficios y noticias</p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                      type="email"
                      placeholder="Tu correo electrónico"
                      className="flex-grow border border-gray-400 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-cemaco-blue focus:ring-1 focus:ring-cemaco-blue"
                  />
                  <button className="bg-[#0f1f8c] hover:bg-blue-900 text-white font-bold text-xs tracking-wide uppercase px-6 py-2.5 rounded-full transition-colors whitespace-nowrap">
                    Suscribirme
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Barra Inferior (Privacidad, Redes) */}
        <div className="bg-[#f5f5f5] py-6 px-6 border-t border-gray-200">
          <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-gray-700">

            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 text-center">
              <Link to="/" className="underline hover:text-black">Privacidad</Link>
              <Link to="/" className="underline hover:text-black">Términos y condiciones</Link>
              <span className="text-xs text-gray-500 hidden md:inline">| Prueba Técnica por Jeancarlo Ruano</span>
            </div>

            <div className="flex gap-3">
              {['Tiktok', 'Facebook', 'Instagram', 'X', 'Youtube', 'Pinterest'].map((red) => (
                  <div key={red} className="w-8 h-8 rounded-full bg-gray-500 hover:bg-[#0f1f8c] cursor-pointer transition-colors flex items-center justify-center text-white text-xs font-bold" title={red}>
                    {red[0]}
                  </div>
              ))}
            </div>

          </div>
        </div>

      </footer>
  );
};

export default Footer;