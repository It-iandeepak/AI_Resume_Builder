import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Brands from '../components/Brands';
import Features from '../components/Features';
import Testimonials from '../components/Testimonials';
import CTA from '../components/CTA';
import Footer from '../components/Footer';

const Home = () => {
    return (
        <>
            <Header />
            <main>
                <Hero />
                <Brands />
                <Features />
                <Testimonials />
                <CTA />
            </main>
            <Footer />
        </>
    );
};

export default Home;
