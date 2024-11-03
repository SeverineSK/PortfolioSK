import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Linkedin, Github, Mail, Phone, MapPin, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import cvFile from './assets/CVSéverineKOMBO.pdf';
import aboutMeImage from './assets/aboutme.png';
import severine from './assets/severine.png'
import Puissance4 from './assets/puissance4.png';
import MyCinema from './assets/mycinema.png';
import Pushswap from './assets/pushswap.png';
import Ecommerce from './assets/ecommerce.png';
import MyFriendsFit from './assets/myfriendsfit.png';
import Maquette from './assets/maquette1.png';
import API_BASE_URL from './api'; 

const projects = [
    { name: 'Puissance 4', imgSrc: Puissance4, link: 'https://severinesk.github.io/Puissance4/' },
    { name: 'My Cinema', imgSrc: MyCinema, link: 'https://github.com/SeverineSK/MyCinema' },
    { name: 'Pushswap', imgSrc: Pushswap, link: 'https://github.com/SeverineSK/Pushswap' },
    { name: 'E-Commerce', imgSrc: Ecommerce, link: 'https://github.com/SeverineSK/Ecommerce' },
    { name: 'My Friend Fit', imgSrc: MyFriendsFit, link: 'https://github.com/SeverineSK/My-friend-fit' },
    { name: 'Design', imgSrc: Maquette, link: 'https://github.com/SeverineSK/Maquette' },
];


const techLogos = [
    { name: 'PHP', src: require('./assets/PHP.png') },
    { name: 'Node.js', src: require('./assets/node.png') },
    { name: 'React', src: require('./assets/react.png') },
    { name: 'MongoDB', src: require('./assets/mongoDB.png') },
    { name: 'Express', src: require('./assets/expressjs.png') },
    { name: 'JavaScript', src: require('./assets/js.png') },
    { name: 'MySQL', src: require('./assets/mySQL.png') },
    { name: 'HTML', src: require('./assets/html.png') },
    { name: 'CSS', src: require('./assets/css.png') },
    { name: 'Tailwind', src: require('./assets/tailwind.png') },
    { name: 'Git', src: require('./assets/git.png') },
];


function useIntersectionObserver(ref, options) {
    const [isIntersecting, setIsIntersecting] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            setIsIntersecting(entry.isIntersecting);
        }, options);

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, [ref, options]);

    return isIntersecting;
}

function AnimatedSection({ children, className = '', delay = 0 }) {
    const ref = useRef(null);
    const isVisible = useIntersectionObserver(ref, { threshold: 0.1 });

    return (
        <div
            ref={ref}
            className={`transition-all duration-1000 ${isVisible
                ? 'opacity-100 translate-y-0 filter blur-0'
                : 'opacity-0 translate-y-10 filter blur-sm'
                } ${className}`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {children}
        </div>
    );
}

export default function Component() {
    const [currentProject, setCurrentProject] = useState(0);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const sectionRefs = {
        home: useRef(null),
        about: useRef(null),
        projects: useRef(null),
        contact: useRef(null),
    };

    useEffect(() => {
        const handleScroll = (event) => {
            const targetId = event.target.getAttribute('href').slice(1);
            if (sectionRefs[targetId]) {
                event.preventDefault();
                sectionRefs[targetId].current.scrollIntoView({ behavior: 'smooth' });
            }
        };

        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', handleScroll);
        });

        return () => {
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.removeEventListener('click', handleScroll);
            });
        };
    }, []);

    const handleProjectChange = (direction) => {
        setCurrentProject((prev) => {
            if (direction === 'prev') {
                return prev === 0 ? projects.length - 1 : prev - 1;
            } else {
                return prev === projects.length - 1 ? 0 : prev + 1;
            }
        });
    };

    const ProjectCard = ({ project, isActive = false }) => (
        <div className={`bg-white rounded-3xl shadow-lg overflow-hidden transition-all duration-300 ${isActive ? 'w-80 h-96' : 'w-64 h-80 opacity-50'}`}>
            <div className="relative h-3/4">
                <img
                    src={project.imgSrc}
                    alt={project.name}
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="p-4 text-center">
                <h3 className="text-xl font-semibold text-[#593B21] mb-2">{project.name}</h3>
                <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-[#593B21] text-white font-semibold py-2 px-6 rounded-full hover:bg-[#4a2b14] transition-colors"
                >
                    Lien
                </a>
            </div>
        </div>
    );

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        try {
            // const response = await fetch('http://localhost:5000/api/contact', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify(data),
            // });
            const response = await fetch(`${API_BASE_URL}/api/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });


            if (response.ok) {
                alert('Message sent successfully!');
                form.reset();
            } else {
                alert('Error sending message. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error sending message. Please try again.');
        }
    };

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            }
        ]
    };

    return (
        <div className="font-montserrat bg-gradient-to-b from-white via-[#E9D8C9] to-[#B39B84] min-h-screen">
            <header className="bg-white bg-opacity-90 shadow-md fixed top-0 left-0 w-full py-4 px-8 z-50">
                <nav className="flex items-center justify-between max-w-6xl mx-auto">
                    <div className="text-2xl font-semibold text-[#593B21]">
                        PORTFOLIO
                    </div>
                    <ul className="hidden md:flex space-x-6 text-lg md:text-base lg:text-lg">
                        <li><a href="#home" className="hover:text-[#593B21] transition-colors">Accueil</a></li>
                        <li><a href="#about" className="hover:text-[#593B21] transition-colors">A propos</a></li>
                        <li><a href="#experiences" className="hover:text-[#593B21] transition-colors">Experiences</a></li>
                        <li><a href="#projects" className="hover:text-[#593B21] transition-colors">Projets</a></li>
                        <li><a href="#contact" className="hover:text-[#593B21] transition-colors">Contact</a></li>
                    </ul>

                    <div className="flex items-center space-x-4">
                        <a href="mailto:severine_k91@icloud.com">
                            <Mail size={24} className="text-[#593B21]" />
                        </a>
                        <a
                            href="https://www.linkedin.com/in/s%C3%A9verine-kombo-680a1a157/?locale=en_US&trk=people-guest_people_search-card"
                            target="_blank"
                            rel="noopener noreferrer"
                        ><Linkedin size={24} className="text-[#593B21]" />
                        </a>
                        <a
                            href="https://github.com/SeverineSK"
                            target="_blank"
                            rel="noopener noreferrer"
                        ><Github size={24} className="text-[#593B21]" />
                        </a>
                    </div>
                    <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        {isMenuOpen ? <X size={24} className="text-[#593B21]" /> : <Menu size={24} className="text-[#593B21]" />}
                    </button>
                </nav>
            </header>

            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed inset-0 bg-white z-40 md:hidden"
                    >
                        <div className="flex flex-col items-center justify-center h-full">
                            <ul className="text-2xl space-y-8">
                                <li><a href="#home" onClick={() => setIsMenuOpen(false)}>Accueil</a></li>
                                <li><a href="#about" onClick={() => setIsMenuOpen(false)}>A propos</a></li>
                                <li><a href="#projects" onClick={() => setIsMenuOpen(false)}>Projets</a></li>
                                <li><a href="#experiences" onClick={() => setIsMenuOpen(false)}>Experiences</a></li>
                                <li><a href="#contact" onClick={() => setIsMenuOpen(false)}>Contact</a></li>
                            </ul>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <main className="pt-16">
                <section id="home" ref={sectionRefs.home} className="min-h-screen flex flex-col md:flex-row items-center justify-between px-8 py-16">
                    <AnimatedSection className="max-w-2xl text-center md:text-left z-10 mb-12 md:mb-0">
                        <h1 className="text-[#593B21] text-6xl md:text-7xl lg:text-8xl font-bold mb-4">
                            <span className="block leading-tight">Séverine</span>
                            <span className="block leading-tight">KOMBO</span>
                        </h1>
                        <p className="text-[#593B21] text-xl md:text-2xl lg:text-3xl font-bold mb-6">
                            DÉVELOPPEUSE WEB FULL STACK ET WEB MOBILE
                        </p>
                        <a
                            href={cvFile}
                            className="inline-block px-6 py-3 bg-[#9A8675] text-white font-semibold rounded-lg shadow-lg transition-transform transform hover:scale-105"
                            target="_blank"
                            rel="noopener noreferrer">
                            Mon CV
                        </a>
                    </AnimatedSection>
                    <AnimatedSection className="relative flex-shrink-0 md:ml-8" delay={300}>
                        <div className="relative w-80 h-80 md:w-[24rem] md:h-[24rem] lg:w-[28rem] lg:h-[28rem] ml-auto">
                            <motion.div
                                className="absolute inset-0 bg-[#593B21] rounded-full"
                                animate={{
                                    scale: [1, 1.05, 1],
                                }}
                                transition={{
                                    duration: 4,
                                    ease: "easeInOut",
                                    repeat: Infinity,
                                }}
                            />
                            <img
                                className="absolute inset-0 w-full h-full object-cover object-top rounded-br-[100px]"
                                src={severine}
                                alt="Severine Kombo"
                            />
                        </div>
                    </AnimatedSection>
                </section>

                <section
                    id="about"
                    ref={sectionRefs.about}
                    className="min-h-screen py-16 px-8 flex flex-col justify-center items-center"
                >
                    <h2 className="text-4xl font-bold text-center text-[#593B21] mb-12">
                        À propos de moi
                    </h2>
                    <div className="container mx-auto flex flex-col lg:flex-row items-center justify-center gap-12">
                        <AnimatedSection className="max-w-lg text-[#593B21]" delay={300}>
                            <div className="grid grid-cols-1 gap-4">
                                <div className="bg-white  shadow-md rounded p-6">
                                    <h3 className="text-2xl font-semibold">BAC PRO ASSP | Sanitaire et Social </h3>
                                    <p className="text-gray-600">LYCEE CHARLES BAUDELAIRE</p>
                                    <p className="text-gray-600">Ergonomie</p>
                                    <p className="text-gray-600">Santé</p>
                                    <p className="text-gray-600">Social</p>
                                    <span className="text-gray-400">Septembre 2013 - Juin 2016</span>
                                </div>

                                <div className="bg-white shadow-md rounded p-6">
                                    <h3 className="text-2xl font-semibold">BAC +2 | Développeur WEB</h3>
                                    <p className="text-gray-600">WEB @CADEMIE</p>
                                    <p className="text-gray-600">Formation web Full Stack</p>
                                    <p className="text-gray-600">Pédagogie par projets</p>
                                    <p className="text-gray-600">Réalisation de projets de groupe et individuel</p>
                                    <p className="text-gray-600">Gestion de base de données</p>
                                    <span className="text-gray-400">Novembre 2022 - Novembre 2024</span>
                                </div>
                            </div>
                        </AnimatedSection>

                        <AnimatedSection className="relative max-w-sm">
                            <img
                                src={aboutMeImage}
                                alt="À propos de moi"
                                className="rounded-[180px] object-cover w-full h-auto"
                            />
                        </AnimatedSection>
                        <AnimatedSection className="max-w-lg text-[#593B21]" delay={300}>
                            <h3 className="text-2xl font-bold mb-4">
                                Mon parcours
                            </h3>
                            <p className="text-sm mb-6">
                                Actuellement en fin de cursus pour l'obtention de mon diplôme de <b>Développeuse Full Stack</b>, je suis à la recherche d'un CDI à partir du 25 novembre 2024. Après une réorientation professionnelle marquée par une expérience de 7 ans dans différents secteurs, j'ai acquis une polyvalence qui me permet d'aborder le développement avec une vision unique. Ayant débuté dans l'informatique depuis 2 ans, ma passion pour ce domaine me pousse à apprendre continuellement et à rester en phase avec les évolutions technologiques. Fascinée par la technologie, les voyages, et l'immobilier, je m'efforce d'apporter un regard nouveau et dynamique dans chacun de mes projets.
                            </p>

                            <div className="flex items-center space-x-12 mb-6">
                                <div className="flex items-center">
                                    <p className="text-4xl font-bold mr-3">2</p>
                                    <div>
                                        <p className="text-sm">Ans</p>
                                        <p className="text-sm">d'expérience</p>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <p className="text-4xl font-bold mr-3">50</p>
                                    <div>
                                        <p className="text-sm">Projets</p>
                                        <p className="text-sm">réalisés</p>
                                    </div>
                                </div>
                            </div>
                        </AnimatedSection>
                    </div>

                    <AnimatedSection className="w-full mt-12" delay={600}>
                        <h3 className="text-2xl font-bold mb-6 text-center text-[#593B21]">Mes compétences</h3>
                        <Slider {...sliderSettings} className="tech-logo-slider ">
                            {techLogos.map((logo, index) => (
                                <div key={index} className="px-2">
                                    <img src={logo.src} alt={logo.name} className="h-16 mx-auto" />
                                    <p className="text-center mt-2 text-sm text-[#593B21]">{logo.name}</p>
                                </div>
                            ))}
                        </Slider>
                    </AnimatedSection>
                </section>

                <section id="experiences" className="min-h-screen py-16 px-8 flex flex-col justify-center items-center">
                    <div className="container mx-auto">
                        <AnimatedSection>
                            <h2 className="text-4xl font-bold text-center text-[#593B21] mb-12">Mes Expériences professionnelles</h2>
                        </AnimatedSection>
                        <AnimatedSection className="relative max-w-6xl mx-auto" delay={300}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="bg-white shadow-md rounded p-6">
                                    <h3 className="text-2xl font-semibold">DEVELOPPEUSE FULL STACK JS - EMERIA</h3>
                                    <p className="text-gray-600">Alternance</p>
                                    <p className="text-gray-600">Le support au déploiement
                                        <p>
                                            Veiller au respect des meilleures pratiques d'expérience utilisateur
                                        </p>
                                        Conception et développement
                                        d'API.</p>
                                    <span className="text-gray-400">Novembre 2023 - Novembre 2024</span>
                                </div>
                                <div className="bg-white shadow-md rounded p-6">
                                    <h3 className="text-2xl font-semibold">DEVELOPPEUSE FULL STACK - TREASURE</h3>
                                    <p className="text-gray-600">Stage</p>
                                    <p className="text-gray-600">Création du site internet
                                        <p>Bases de données clients</p>
                                        Connexion/Inscription</p>
                                    <span className="text-gray-400">Septembre 2022 - Octobre 2022</span>
                                </div>
                                <div className="bg-white shadow-md rounded p-6">
                                    <h3 className="text-2xl font-semibold">SHOPIFY</h3>
                                    <p className="text-gray-600">Freelance</p>
                                    <p className="text-gray-600">Creation de site internet
                                        <p>Installation d'application upsell</p>
                                        Gestion du SAV.</p>
                                    <span className="text-gray-400">Décembre 2020 - Actuellement</span>
                                </div>
                                <div className="bg-white shadow-md rounded p-6">
                                    <h3 className="text-2xl font-semibold">CHEFFE D'EQUIPE LIVRAISON</h3>
                                    <p className="text-gray-600">CDI</p>
                                    <p className="text-gray-600">Tri des colis
                                        <p>Organisation des livraisons</p>
                                        <p>Gestion des chauffeurs</p>
                                        Gestion des retours colis</p>
                                    <span className="text-gray-400">Septembre 2020 - Juillet 2021</span>
                                </div>
                            </div>
                        </AnimatedSection>
                    </div>
                </section>

                <section id="projects" ref={sectionRefs.projects} className="min-h-screen py-16 px-8 flex flex-col justify-center">
                    <div className="container mx-auto">
                        <AnimatedSection>
                            <h2 className="text-4xl font-bold text-center text-[#593B21] mb-12">Mes Projets</h2>
                        </AnimatedSection>
                      
                        <AnimatedSection className="relative max-w-6xl mx-auto" delay={300}>
                            <div className="flex justify-center items-center">
                                <div className="hidden lg:flex justify-center items-center gap-8">
                                    {[-1, 0, 1].map((offset) => {
                                        const index = (currentProject + offset + projects.length) % projects.length;
                                        return (
                                            <div key={index} className="flex justify-center items-center w-full max-w-[80%]">
                                                <ProjectCard project={projects[index]} isActive={offset === 0} />
                                            </div>
                                        );
                                    })}
                                </div>
                                <div className="lg:hidden flex flex-col items-center">
                                    <div className="w-full max-w-[90%]">
                                        <ProjectCard project={projects[currentProject]} isActive={true} />
                                    </div>
                                    <div className="flex justify-center mt-4 space-x-4">
                                        <button
                                            onClick={() => handleProjectChange('prev')}
                                            className="bg-white text-[#593B21] w-10 h-10 rounded-full flex items-center justify-center shadow-md hover:bg-[#E9D8C9] transition-colors"
                                            aria-label="Previous Project"
                                        >
                                            <ChevronLeft size={24} />
                                        </button>
                                        <button
                                            onClick={() => handleProjectChange('next')}
                                            className="bg-white text-[#593B21] w-10 h-10 rounded-full flex items-center justify-center shadow-md hover:bg-[#E9D8C9] transition-colors"
                                            aria-label="Next Project"
                                        >
                                            <ChevronRight size={24} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={() => handleProjectChange('prev')}
                                className="absolute top-1/2 -left-12 transform -translate-y-1/2 bg-white text-[#593B21] w-10 h-10 rounded-full hidden lg:flex items-center justify-center shadow-md hover:bg-[#E9D8C9] transition-colors"
                                aria-label="Previous Project"
                            >
                                <ChevronLeft size={24} />
                            </button>
                            <button
                                onClick={() => handleProjectChange('next')}
                                className="absolute top-1/2 -right-12 transform -translate-y-1/2 bg-white text-[#593B21] w-10 h-10 rounded-full hidden lg:flex items-center justify-center shadow-md hover:bg-[#E9D8C9] transition-colors"
                                aria-label="Next Project"
                            >
                                <ChevronRight size={24} />
                            </button>
                        </AnimatedSection>



                    </div>
                </section>
                <section
                    id="contact"
                    ref={sectionRefs.contact}
                    className="min-h-screen py-16 px-8 flex flex-col justify-center items-center"
                >
                    <div className="container mx-auto">
                        <AnimatedSection>
                            <h2 className="text-3xl font-bold text-center text-[#593B21] mb-12">Contact</h2>
                        </AnimatedSection>
                        <AnimatedSection className="max-w-2xl mx-auto" delay={300}>
                            <form onSubmit={handleSubmit} className="bg-[#593B21] bg-opacity-20 p-8 rounded-3xl shadow-lg">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Votre Nom et Prénom"
                                        required
                                        className="w-full p-3 bg-[#593B21] bg-opacity-70 text-white placeholder-white placeholder-opacity-70 border border-[#E9D8C9] rounded-md focus:outline-none focus:ring-2 focus:ring-[#E9D8C9]"
                                    />
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Votre Email"
                                        required
                                        className="w-full p-3 bg-[#593B21] bg-opacity-70 text-white placeholder-white placeholder-opacity-70 border border-[#E9D8C9] rounded-md focus:outline-none focus:ring-2 focus:ring-[#E9D8C9]"
                                    />
                                </div>
                                <input
                                    type="text"
                                    name="subject"
                                    placeholder="Objet"
                                    className="w-full p-3 mb-6 bg-[#593B21] bg-opacity-70 text-white placeholder-white placeholder-opacity-70 border border-[#E9D8C9] rounded-md focus:outline-none focus:ring-2 focus:ring-[#E9D8C9]"
                                />
                                <textarea
                                    name="message"
                                    placeholder="Message"
                                    required
                                    rows={6}
                                    className="w-full p-3 mb-6 bg-[#593B21] bg-opacity-70 text-white placeholder-white placeholder-opacity-70 border border-[#E9D8C9] rounded-md focus:outline-none focus:ring-2 focus:ring-[#E9D8C9]"
                                ></textarea>
                                <div className="flex justify-center">
                                    <button
                                        type="submit"
                                        className="py-3 px-8 bg-[#E9D8C9] bg-opacity-50 text-[#593B21] font-semibold rounded-md shadow-md hover:bg-opacity-70 transition-colors"
                                    >
                                        Envoyer
                                    </button>
                                </div>
                            </form>
                        </AnimatedSection>
                    </div>
                </section>
            </main>

            <footer className="bg-[#B39B84] bg-opacity-50 py-4 px-8">
                <div className="flex items-center justify-between max-w-6xl mx-auto">
                    <div className="text-2xl font-semibold text-[#593B21]">
                        PORTFOLIO
                    </div>
                    <div className="flex items-center space-x-4">
                        <a href="mailto:severine_k91@icloud.com">
                            <Mail size={24} className="text-[#593B21]" />
                        </a>
                        <a
                            href="https://www.linkedin.com/in/s%C3%A9verine-kombo-680a1a157/?locale=en_US&trk=people-guest_people_search-card"
                            target="_blank"
                            rel="noopener noreferrer"
                        ><Linkedin size={24} className="text-[#593B21]" />
                        </a>
                        <a
                            href="https://github.com/SeverineSK"
                            target="_blank"
                            rel="noopener noreferrer"
                        ><Github size={24} className="text-[#593B21]" />
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    );
}
