import React, { useState, useEffect } from 'react';
import { 
  Trophy, 
  Users, 
  History, 
  Camera, 
  Mail, 
  Menu, 
  X, 
  Calendar, 
  MapPin, 
  Instagram, 
  Facebook,
  Shield,
  Star,
  ChevronRight,
  User,
  Quote
} from 'lucide-react';

// --- CONFIGURACIÓN DE DATOS ---

const TEAM_INFO = {
  name: "FLR FC",
  founded: "2018",
  // Definición de la paleta de colores personalizada usando valores arbitrarios de Tailwind
  theme: {
    primary: "bg-[#0E0E0E]", // Negro principal
    secondary: "bg-[#262224]", // Gris oscuro
    accent: "text-[#ECB7CB]", // Rosa fuerte (texto)
    accentBg: "bg-[#ECB7CB]", // Rosa fuerte (fondos)
    accentLight: "bg-[#DABBC7]", // Rosa pálido
    accentDark: "text-[#8B727B]", // Malva oscuro
    textMain: "text-white", // CAMBIO: Texto principal a blanco para fondo oscuro
    textLight: "text-gray-300"
  },
  logoUrl: "/api/placeholder/150/150" 
};

const PALMARES = [
  { id: 1, title: "Campeón Torneo de Verano", year: "2024", icon: Trophy, desc: "Final ganada 3-2 en penales." },
  { id: 2, title: "Copa de la Amistad", year: "2022", icon: Star, desc: "Invictos en fase de grupos." },
  { id: 3, title: "Tercer Lugar Liga Distrital", year: "2020", icon: Shield, desc: "Mejor defensa del campeonato." },
];

// Datos extraídos del archivo "Planilla Jugadores Verano 2026.xlsx"
const JUGADORES_2026 = [
  { id: 1, name: "Piero Divasto", number: "1", position: "Arquero", profession: "Ing. Civil Informático", bio: "Seguridad bajo los tres palos. Fundamental en la organización defensiva.", image: "/api/placeholder/150/150" },
  { id: 2, name: "Renato Del Carpio Chavez", number: "2", position: "Poli funcional", profession: "Tecnologo médico", bio: "El comodín del equipo. Rinde donde se le necesite con gran despliegue físico.", image: "/api/placeholder/150/150" },
  { id: 3, name: "Sebastian Valenzuela", number: "3", position: "Delantero", profession: "Ing. Civil industrial", bio: "Olfato goleador y potencia en el área rival.", image: "/api/placeholder/150/150" },
  { id: 4, name: "José Ignacio Oviedo", number: "4", position: "Mediocampo", profession: "Arquitecto", bio: "Constructor de juego. Diseña cada ataque con precisión.", image: "/api/placeholder/150/150" },
  { id: 5, name: "Felipe Navarro Bustos", number: "5", position: "Delantero", profession: "Product Lead", bio: "Velocidad y definición letal en el ataque. Siempre bien ubicado.", image: "/api/placeholder/150/150" },
  { id: 6, name: "Matías Iturra Marambio", number: "6", position: "Lateral", profession: "Ingeniero Comercial", bio: "Desborde constante por la banda y férrea cobertura defensiva.", image: "/api/placeholder/150/150" },
  { id: 7, name: "Aaron Perez Alarcon", number: "7", position: "Defensa", profession: "Profesor de Educación Física", bio: "Orden táctico y gran capacidad física para la marca.", image: "/api/placeholder/150/150" },
  { id: 8, name: "Jose Ignacio Ferrer", number: "8", position: "El Distinto", profession: "Administracion gastronomica", bio: "Magia pura. Cuando él juega, el equipo baila a su ritmo.", image: "/api/placeholder/150/150" },
  { id: 9, name: "Matias Mahave Tapia", number: "9", position: "Lateral", profession: "Ingeniero Comercial", bio: "Recorrido constante por la banda. Aporta tanto en defensa como en ataque.", image: "/api/placeholder/150/150" },
  { id: 10, name: "Tomas Vargas", number: "10", position: "Central", profession: "Ing civil industrial", bio: "La muralla del equipo. Liderazgo y solidez en la última línea.", image: "/api/placeholder/150/150" },
  { id: 11, name: "Felipe Canales Guzman", number: "11", position: "Delantero", profession: "Ingeniero Civil Industrial", bio: "Potencia física y olfato de gol en los metros finales.", image: "/api/placeholder/150/150" },
  { id: 12, name: "Diego Fuentes", number: "12", position: "Defensa", profession: "Profesor de Ed. Física", bio: "Experiencia y solidez defensiva. Impasable en el uno contra uno.", image: "/api/placeholder/150/150" },
];

const PLANTELES_HISTORICOS = [
  {
    year: "2025",
    description: "Semifinalistas Liga Mayor.",
    players: ["Piero Divasto", "Renato Del Carpio", "Sebastian Valenzuela", "José Oviedo", "Aaron Perez", "Matías Fernández (Ex)", "Felipe Soto"]
  },
  {
    year: "2024",
    description: "Campeones Torneo de Verano. Inolvidable.",
    players: ["Piero Divasto", "Renato Del Carpio", "Sebastian Valenzuela", "José Oviedo", "Esteban Paredes (Invitado)", "Jorge Valdivia (Invitado)"]
  },
  {
    year: "2023",
    description: "Debut en primera división amateur.",
    players: ["Piero Divasto", "Renato Del Carpio", "Roberto Carlos", "José Oviedo", "Zinedine Zidane"]
  }
];

const GALERIA = [
  { id: 1, title: "Festejo 2024", url: "/api/placeholder/400/300" },
  { id: 2, title: "El equipo antes del partido", url: "/api/placeholder/400/300" },
  { id: 3, title: "Tercer tiempo", url: "/api/placeholder/400/300" },
  { id: 4, title: "Viaje al torneo regional", url: "/api/placeholder/400/300" },
];

// --- COMPONENTES ---

const SectionTitle = ({ children, icon: Icon }) => (
  <div className="flex items-center gap-3 mb-10 pb-4 border-b border-[#8B727B]/30">
    {Icon && <Icon className={`w-8 h-8 ${TEAM_INFO.theme.accentDark}`} />}
    <h2 className={`text-4xl font-black uppercase tracking-tighter ${TEAM_INFO.theme.textMain}`}>{children}</h2>
  </div>
);

const PlayerCard = ({ player }) => (
  <div className="bg-[#1A1A1A] group rounded-none relative overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border-l-4 border-[#262224] hover:border-[#ECB7CB]">
    <div className="flex flex-col md:flex-row h-full">
      {/* Imagen */}
      <div className="md:w-2/5 w-full relative overflow-hidden h-64 md:h-auto bg-[#0E0E0E]">
        <img 
          src={player.image} 
          alt={player.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0 opacity-80 group-hover:opacity-100"
        />
        {/* Número Overlay */}
        <div className={`absolute bottom-0 right-0 w-12 h-12 bg-[#ECB7CB] flex items-center justify-center text-[#0E0E0E] font-black text-xl z-10`}>
          {player.number}
        </div>
        <div className={`absolute inset-0 bg-[#0E0E0E]/30 group-hover:bg-transparent transition-colors duration-300`}></div>
      </div>
      
      {/* Info */}
      <div className="md:w-3/5 w-full p-6 flex flex-col justify-between bg-[#1A1A1A] relative">
        {/* Decoración de fondo */}
        <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
          <Shield size={100} color="white" />
        </div>

        <div>
          <div className="flex justify-between items-start mb-1">
             <span className={`text-xs font-bold tracking-widest uppercase ${TEAM_INFO.theme.accentDark} mb-1 block`}>
              {player.position}
            </span>
          </div>
          <h3 className={`text-2xl font-black uppercase leading-none mb-4 text-white`}>
            {player.name}
          </h3>
          
          <div className="flex items-center gap-2 mb-4 text-sm font-medium text-gray-400 border-t border-[#333] pt-3">
             <User size={14} className="text-[#ECB7CB]" />
             <span>{player.profession}</span>
          </div>

          <div className="relative pl-6">
            <Quote className="absolute left-0 top-0 text-[#DABBC7] w-4 h-4 -mt-1 opacity-60" />
            <p className="text-gray-400 text-sm leading-relaxed italic">
              {player.bio}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const HistoricCard = ({ yearData }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-[#1A1A1A] mb-4 border border-[#333] group">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex justify-between items-center p-6 transition-colors text-left group-hover:bg-[#222] ${isOpen ? 'bg-[#222]' : 'bg-[#1A1A1A]'}`}
      >
        <div className="flex items-center gap-6">
          <span className={`text-4xl font-black text-white opacity-20 group-hover:opacity-100 transition-opacity`}>{yearData.year}</span>
          <div className="h-8 w-[1px] bg-[#8B727B]/30 hidden sm:block"></div>
          <span className="text-gray-400 font-medium hidden sm:block uppercase tracking-wide text-sm">{yearData.description}</span>
        </div>
        <div className={`p-2 rounded-full ${isOpen ? TEAM_INFO.theme.accentBg + ' text-[#0E0E0E]' : 'text-gray-400 bg-[#333]'}`}>
           <ChevronRight className={`w-5 h-5 transform transition-transform duration-300 ${isOpen ? 'rotate-90' : ''}`} />
        </div>
      </button>
      
      <div className={`transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="p-6 bg-[#151515] border-t border-[#333]">
          <p className="sm:hidden text-gray-400 italic mb-4 text-sm">{yearData.description}</p>
          <h4 className={`font-bold text-sm uppercase tracking-wider mb-4 ${TEAM_INFO.theme.accentDark}`}>Plantel {yearData.year}</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {yearData.players.map((player, idx) => (
              <div key={idx} className="flex items-center gap-2 text-gray-400 text-sm">
                <div className={`w-1.5 h-1.5 rounded-full ${TEAM_INFO.theme.accentBg}`}></div>
                {player}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    setIsMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const NavLink = ({ to, label }) => (
    <button 
      onClick={() => scrollToSection(to)}
      className={`font-bold transition-all px-4 py-2 uppercase text-xs tracking-widest hover:text-[#ECB7CB] text-white`}
    >
      {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-[#0E0E0E] font-sans text-white">
      
      {/* NAVBAR */}
      <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'bg-[#0E0E0E]/95 backdrop-blur-md shadow-lg py-3 border-b border-[#333]' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          {/* Logo / Nombre */}
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => scrollToSection('home')}>
            <div className={`w-10 h-10 ${TEAM_INFO.theme.accentBg} flex items-center justify-center text-[#0E0E0E] transition-transform group-hover:rotate-12`}>
              <Shield size={20} />
            </div>
            <span className={`text-2xl font-black uppercase tracking-tighter text-white group-hover:text-[#ECB7CB] transition-colors`}>
              {TEAM_INFO.name}
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-2">
            <NavLink to="historia" label="Historia" />
            <NavLink to="plantel2026" label="Plantel" />
            <NavLink to="historicos" label="Históricos" />
            <NavLink to="fotos" label="Galería" />
            <NavLink to="palmares" label="Títulos" />
            <NavLink to="contacto" label="Contacto" />
            
            <button 
              onClick={() => scrollToSection('contacto')}
              className={`ml-4 px-6 py-2 ${TEAM_INFO.theme.accentBg} text-[#0E0E0E] font-bold uppercase text-xs tracking-widest hover:bg-white hover:text-[#0E0E0E] border border-transparent hover:border-[#0E0E0E] transition-all`}
            >
              Únete
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className={`md:hidden p-2 text-white`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden bg-[#0E0E0E] absolute top-full left-0 w-full flex flex-col p-8 animate-in slide-in-from-top-5 gap-4 shadow-2xl border-b border-[#333]">
            <button onClick={() => scrollToSection('historia')} className="text-white text-lg font-bold uppercase tracking-wider text-left">Historia</button>
            <button onClick={() => scrollToSection('plantel2026')} className="text-white text-lg font-bold uppercase tracking-wider text-left">Plantel</button>
            <button onClick={() => scrollToSection('historicos')} className="text-white text-lg font-bold uppercase tracking-wider text-left">Históricos</button>
            <button onClick={() => scrollToSection('fotos')} className="text-white text-lg font-bold uppercase tracking-wider text-left">Galería</button>
            <button onClick={() => scrollToSection('contacto')} className="text-[#ECB7CB] text-lg font-bold uppercase tracking-wider text-left">Contacto</button>
          </div>
        )}
      </nav>

      {/* HERO SECTION */}
      <header id="home" className="relative h-screen flex items-center justify-center overflow-hidden bg-[#0E0E0E]">
        {/* Background Image Overlay */}
        <div className="absolute inset-0 z-0 opacity-30">
          <img 
            src="/api/placeholder/1920/1080" 
            alt="Fondo cancha" 
            className="w-full h-full object-cover grayscale"
          />
        </div>
        
        {/* Gradient Overlay for aesthetic */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0E0E0E] via-[#0E0E0E]/80 to-[#0E0E0E]/50"></div>

        <div className="relative z-10 text-center px-4 flex flex-col items-center max-w-4xl">
          <div className="mb-6 animate-fade-in-up">
             <div className="inline-block border-2 border-[#ECB7CB] p-1 rounded-full mb-6">
                <div className="w-4 h-4 bg-[#ECB7CB] rounded-full animate-pulse"></div>
             </div>
          </div>
          <h1 className="text-6xl md:text-9xl font-black text-white uppercase tracking-tighter mb-2 leading-none">
            {TEAM_INFO.name}
          </h1>
          <div className="w-24 h-2 bg-[#ECB7CB] mb-8"></div>
          <p className="text-xl md:text-2xl text-gray-400 font-light max-w-2xl tracking-wide mb-10">
            Fútbol y Amistad. Estilo y Pasión. <span className="text-[#ECB7CB]">Desde 2018.</span>
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
             <button onClick={() => scrollToSection('plantel2026')} className={`px-10 py-4 bg-transparent border border-[#ECB7CB] text-white font-bold uppercase tracking-widest hover:bg-[#ECB7CB] hover:text-[#0E0E0E] transition-all duration-300`}>
               Ver Plantel 2026
             </button>
          </div>
        </div>
      </header>

      {/* HISTORIA SECTION */}
      <section id="historia" className="py-24 bg-[#0E0E0E] relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#DABBC7] rounded-full filter blur-3xl opacity-5 -translate-y-1/2 translate-x-1/2"></div>

        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <SectionTitle icon={History}>Nuestra Historia</SectionTitle>
              <div className="space-y-6 text-lg text-gray-400 leading-relaxed font-light">
                <p>
                  Todo comenzó en una tarde de 2018. Un grupo de amigos, unidos por algo más que el fútbol, decidió que era hora de llevar su pasión al siguiente nivel. Así nació <strong className="text-white">FLR FC</strong>.
                </p>
                <p>
                  No somos solo un equipo; somos una familia que ha evolucionado. Desde canchas de tierra hasta competir en las ligas más exigentes, siempre manteniendo nuestra identidad: juego limpio y compañerismo inquebrantable.
                </p>
                <div className="border-l-4 border-[#ECB7CB] pl-6 py-2 my-8">
                  <p className="text-xl italic text-gray-200 font-serif">
                    "En la cancha se deja la vida, pero fuera de ella somos hermanos."
                  </p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 border-2 border-[#262224] opacity-50 transform translate-x-4 translate-y-4"></div>
              <img 
                src="/api/placeholder/600/800" 
                alt="Foto fundacional" 
                className="relative w-full h-[500px] object-cover grayscale hover:grayscale-0 transition-all duration-700 shadow-2xl brightness-75 hover:brightness-100"
              />
              <div className={`absolute bottom-0 right-0 bg-[#ECB7CB] text-[#0E0E0E] px-8 py-4`}>
                <span className="block text-sm uppercase tracking-widest text-[#0E0E0E]/70">Fundación</span>
                <span className="text-3xl font-black">2018</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PLANTEL 2026 SECTION */}
      <section id="plantel2026" className="py-24 bg-[#0E0E0E]">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16">
            <div>
              <span className={`text-[#8B727B] font-bold tracking-widest uppercase mb-2 block`}>Temporada 2026</span>
              <h2 className="text-5xl md:text-6xl font-black text-white uppercase tracking-tighter leading-none">
                El Plantel
              </h2>
            </div>
            <p className="text-gray-500 max-w-md text-right hidden md:block mt-4 md:mt-0">
              Una combinación letal de técnica, potencia y amistad. Conoce a los protagonistas de esta nueva campaña.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {JUGADORES_2026.map((player) => (
              <PlayerCard key={player.id} player={player} />
            ))}
          </div>
        </div>
      </section>

      {/* PLANTELES HISTÓRICOS SECTION */}
      <section id="historicos" className="py-24 bg-[#0E0E0E]">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
             <div className="text-center mb-16">
                <SectionTitle icon={Calendar}>Legado Histórico</SectionTitle>
             </div>
             {PLANTELES_HISTORICOS.map((yearData, idx) => (
               <HistoricCard key={idx} yearData={yearData} />
             ))}
          </div>
        </div>
      </section>

      {/* GALERÍA SECTION */}
      <section id="fotos" className={`py-24 bg-[#262224] text-white overflow-hidden`}>
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-4xl font-black uppercase tracking-tighter text-white">Momentos <span className="text-[#ECB7CB]">Inolvidables</span></h2>
            <Camera className="w-8 h-8 text-[#ECB7CB]" />
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {GALERIA.map((foto, index) => (
              <div key={foto.id} className={`group relative overflow-hidden cursor-pointer ${index === 0 ? 'col-span-2 row-span-2' : ''}`}>
                <img 
                  src={foto.url} 
                  alt={foto.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0 opacity-80 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-[#0E0E0E]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <p className="font-bold text-white uppercase tracking-widest border border-[#ECB7CB] px-4 py-2">{foto.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PALMARES SECTION */}
      <section id="palmares" className="py-24 bg-[#0E0E0E] relative">
        <div className="container mx-auto px-6">
          <SectionTitle icon={Trophy}>Nuestras Conquistas</SectionTitle>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-16">
            {PALMARES.map((trophy, index) => (
              <div key={trophy.id} className="relative group">
                <div className="absolute top-0 left-0 w-20 h-20 border-t-4 border-l-4 border-[#ECB7CB] -translate-x-2 -translate-y-2 transition-all group-hover:translate-x-0 group-hover:translate-y-0"></div>
                <div className="bg-[#1A1A1A] p-10 h-full border border-[#333] shadow-xl relative z-10 hover:bg-[#222] transition-colors">
                  <div className="mb-6 opacity-40 group-hover:opacity-100 transition-opacity">
                    <trophy.icon className="w-16 h-16 text-white" />
                  </div>
                  <span className="text-6xl font-black text-[#333] absolute top-4 right-4 z-0 group-hover:text-[#ECB7CB]/10 transition-colors">{trophy.year}</span>
                  <div className="relative z-10">
                    <h3 className="text-xl font-bold text-white uppercase mb-2">{trophy.title}</h3>
                    <div className="w-12 h-1 bg-[#ECB7CB] mb-4 group-hover:w-full transition-all duration-500 ease-out"></div>
                    <p className="text-gray-400 text-sm leading-relaxed">{trophy.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACTO SECTION */}
      <section id="contacto" className="py-24 bg-[#0E0E0E]">
        <div className="container mx-auto px-6">
          <SectionTitle icon={Mail}>Desafíanos</SectionTitle>
          
          <div className="grid md:grid-cols-2 gap-16">
            <div className="bg-[#1A1A1A] p-10 shadow-2xl border-t-8 border-[#ECB7CB]">
              <h3 className="text-2xl font-black mb-8 uppercase tracking-wide text-white">Agenda un Amistoso</h3>
              <form className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Equipo</label>
                    <input type="text" required className="w-full px-4 py-3 bg-[#262224] text-white border-b-2 border-[#333] focus:border-[#ECB7CB] outline-none transition-colors" placeholder="Nombre Rival" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Contacto</label>
                    <input type="text" required className="w-full px-4 py-3 bg-[#262224] text-white border-b-2 border-[#333] focus:border-[#ECB7CB] outline-none transition-colors" placeholder="Tu Nombre" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Mensaje</label>
                  <textarea rows="4" required className="w-full px-4 py-3 bg-[#262224] text-white border-b-2 border-[#333] focus:border-[#ECB7CB] outline-none transition-colors" placeholder="¿Cuándo y dónde jugamos?"></textarea>
                </div>
                <button type="submit" className={`w-full py-5 bg-[#ECB7CB] text-[#0E0E0E] font-bold uppercase tracking-widest hover:bg-white hover:text-[#0E0E0E] transition-all`}>
                  Enviar Reto
                </button>
              </form>
            </div>

            <div className="flex flex-col justify-center space-y-10">
              <div className="flex items-start gap-6 group cursor-pointer">
                <div className={`p-4 bg-[#1A1A1A] text-white group-hover:bg-[#ECB7CB] group-hover:text-[#0E0E0E] transition-colors`}>
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-xl uppercase mb-1 text-white">Cancha Local</h4>
                  <p className="text-gray-400">Complejo Deportivo "La Gambeta"</p>
                  <p className="text-[#8B727B] text-sm">Av. Siempre Viva 123, Ciudad</p>
                </div>
              </div>

              <div className="flex items-start gap-6 group cursor-pointer">
                <div className={`p-4 bg-[#1A1A1A] text-white group-hover:bg-[#ECB7CB] group-hover:text-[#0E0E0E] transition-colors`}>
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-xl uppercase mb-1 text-white">Contacto Directo</h4>
                  <p className="text-gray-400">contacto@flrfc.com</p>
                </div>
              </div>

              <div className="pt-8 border-t border-[#333]">
                <h4 className="font-bold text-lg mb-6 uppercase tracking-widest text-white">Síguenos</h4>
                <div className="flex gap-4">
                  <a href="#" className="w-12 h-12 flex items-center justify-center bg-[#1A1A1A] text-white hover:bg-[#ECB7CB] hover:text-black transition-all">
                    <Instagram size={20} />
                  </a>
                  <a href="#" className="w-12 h-12 flex items-center justify-center bg-[#1A1A1A] text-white hover:bg-[#ECB7CB] hover:text-black transition-all">
                    <Facebook size={20} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#0E0E0E] text-white py-12 border-t border-[#333]">
        <div className="container mx-auto px-6 flex flex-col items-center">
          <div className="mb-6 p-4 border border-[#333] rounded-full">
            <Shield size={40} className="text-[#ECB7CB]" />
          </div>
          <h2 className="text-2xl font-black uppercase tracking-tighter mb-2">FLR FC</h2>
          <p className="text-[#8B727B] text-sm mb-8">Más que un equipo.</p>
          <div className="text-gray-600 text-xs tracking-widest">
            &copy; {new Date().getFullYear()} FLR FC. TODOS LOS DERECHOS RESERVADOS.
          </div>
        </div>
      </footer>
    </div>
  );
}