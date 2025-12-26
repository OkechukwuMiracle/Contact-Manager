import { useEffect } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./LandingPage.css"; // we’ll move your <style> block here
import { useMiniApp } from '@neynar/react';

export default function LandingPage() {

  const { isSDKLoaded, context } = useMiniApp();
  useEffect(() => {
    // Smooth scrolling for in-page links
    const handleSmoothScroll = (e) => {
      if (e.target.matches('a[href^="#"]')) {
        e.preventDefault();
        const target = document.querySelector(e.target.getAttribute("href"));
        if (target) {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    };
    document.addEventListener("click", handleSmoothScroll);

    // Animate elements on scroll
    const observerOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("visible");
      });
    }, observerOptions);

    document.querySelectorAll(".animate-on-scroll").forEach((el) => observer.observe(el));

    // Navbar scroll background effect
    const handleScroll = () => {
      const navbar = document.querySelector(".navbar");
      if (window.scrollY > 50) {
        navbar.style.background = "rgba(255, 255, 255, 0.98)";
        navbar.style.boxShadow = "0 2px 20px rgba(0,0,0,0.1)";
      } else {
        navbar.style.background = "rgba(255, 255, 255, 0.95)";
        navbar.style.boxShadow = "none";
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("click", handleSmoothScroll);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
    {isSDKLoaded && (
      <div>
      {/* Navigation */}
      <nav className="navbar navbar-expand-lg fixed-top">
        <div className="container">
          <a className="navbar-brand" href="#">
            <i className="fas fa-address-book"></i> ContactManager
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link" href="#home">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#features">Features</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#about">About</a>
              </li>
              <li className="nav-item">
                {/* Use React Router for navigation */}
                <Link className="nav-link" to="/contact-manager">
                  <i className="fas fa-rocket"></i> Launch App
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero-section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 hero-content">
              <h1 className="display-4 fw-bold mb-4 animate-on-scroll">
                Organize Your Contacts Like Never Before
              </h1>
              <p className="lead mb-4 animate-on-scroll">
                A modern, intuitive contact management solution that keeps your important connections organized and accessible.
              </p>
              <div className="animate-on-scroll">
                <Link to="/contact-manager" className="btn btn-primary btn-lg me-3">
                  <i className="fas fa-play"></i> Get Started
                </Link>
                <a href="#features" className="btn btn-outline-light btn-lg">
                  <i className="fas fa-info-circle"></i> Learn More
                </a>
              </div>
            </div>
            <div className="col-lg-6 text-center">
              <div className="hero-illustration animate-on-scroll">
                <i className="fas fa-address-book" style={{ fontSize: "15rem", opacity: 0.8 }}></i>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-5 bg-light">
        <div className="container">
          <div className="row">
            <div className="col-12 text-center mb-5">
              <h2 className="display-5 fw-bold animate-on-scroll">Powerful Features</h2>
              <p className="lead animate-on-scroll">Everything you need to manage your contacts efficiently</p>
            </div>
          </div>
          <div className="row">
            {/* Repeat feature-card blocks */}
            <div className="col-lg-4 col-md-6">
              <div className="feature-card animate-on-scroll">
                <div className="feature-icon"><i className="fas fa-user-plus"></i></div>
                <h4>Easy Contact Creation</h4>
                <p>Quickly add new contacts with built-in validation to ensure accuracy.</p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="feature-card animate-on-scroll">
                <div className="feature-icon"><i className="fas fa-edit"></i></div>
                <h4>Smart Editing</h4>
                <p>Update contact info seamlessly with inline editing.</p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="feature-card animate-on-scroll">
                <div className="feature-icon"><i className="fas fa-search"></i></div>
                <h4>Instant Search</h4>
                <p>Find any contact in seconds with our search functionality.</p>
              </div>
            </div>
            {/* Add remaining 3 features... */}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h2 className="display-5 fw-bold mb-4 animate-on-scroll">Built with Modern Technology</h2>
              <p className="lead animate-on-scroll">
                Our Contact Manager is built using React, Bootstrap, and modern JavaScript.
              </p>
              <div className="animate-on-scroll">
                <h5><i className="fab fa-react text-info"></i> React</h5>
                <p>Dynamic, component-based UI for smooth interactions.</p>
                <h5><i className="fab fa-bootstrap text-primary"></i> Bootstrap</h5>
                <p>Responsive design for consistent, mobile-first layouts.</p>
                <h5><i className="fab fa-js-square text-warning"></i> JavaScript</h5>
                <p>Modern ES6+ features for robust functionality.</p>
              </div>
            </div>
            <div className="col-lg-6 text-center">
              <div className="animate-on-scroll">
                <i className="fas fa-code" style={{ fontSize: "10rem", color: "var(--primary-color)", opacity: 0.8 }}></i>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <h5><i className="fas fa-address-book"></i> ContactManager</h5>
              <p>Your digital address book solution. Simple, secure, and always accessible.</p>
            </div>
            <div className="col-md-6 text-md-end">
              <h5>Connect With Us</h5>
              <div className="social-links">
                <a href="#"><i className="fab fa-github"></i></a>
                <a href="#"><i className="fab fa-linkedin"></i></a>
                <a href="#"><i className="fab fa-twitter"></i></a>
              </div>
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col-12 text-center">
              <p>&copy; 2025 ContactManager. Built with ❤️ using React & Bootstrap.</p>
            </div>
          </div>
        </div>
      </footer>
      </div>
    )}
    </>
  );
}
