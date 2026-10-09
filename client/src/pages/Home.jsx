import { ArrowRight, Sparkles, Star, Truck, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import products from "../data/products";
import ProductCard from "../components/ProductCard";
const categories = [
  { name: "Living Room", image: products[0].image },
  { name: "Bedroom", image: products[5].image },
  { name: "Lighting & Candles", image: products[9].image },
  { name: "Plants & Planters", image: products[13].image },
  { name: "Wall Décor", image: products[17].image },
  { name: "Dining & Kitchen", image: products[21].image },
];
function Home() {
  const featuredProducts = products.slice(0, 4);
  const newArrivals = products.slice(4, 8);
  const bestSellers = products.slice(8, 12);
  return (
    <main className="page home-page">
      <section className="hero-section">
        <div className="hero-copy">
          <p className="eyebrow">WELCOME TO CASANEST</p>
          <h1>Make Your Space Feel Like Home</h1>
          <p className="hero-text">
            Discover thoughtfully selected home décor pieces that bring warmth, comfort, and character to every corner.
          </p>
          <div className="hero-actions">
            <Link to="/shop" className="primary-button">Shop Now</Link>
            <Link to="/shop" className="secondary-button">Explore Collection</Link>
          </div>
        </div>
        <div className="hero-featured">
          <div className="feature-card large-card">
            <img src={products[0].image} alt={products[0].name} />
            <div className="feature-card-copy">
              <span>Curated Essentials</span>
              <strong>Warm minimal living</strong>
            </div>
          </div>
          <div className="feature-card small-card">
            <img src={products[9].image} alt={products[9].name} />
          </div>
        </div>
      </section>
      <section className="category-section section-shell">
        <div className="section-heading">
          <p className="eyebrow">FEATURED CATEGORIES</p>
          <h2>Thoughtful décor for every room</h2>
        </div>
        <div className="category-grid">
          {categories.map((category) => (
            <Link key={category.name} to="/shop" className="category-card">
              <img src={category.image} alt={category.name} />
              <span>{category.name}</span>
            </Link>
          ))}
        </div>
      </section>
      <section className="product-section section-shell">
        <div className="section-heading-row">
          <div>
            <p className="eyebrow">TOP PICKS</p>
            <h2>Featured Products</h2>
          </div>
          <Link to="/shop" className="inline-link">View all <ArrowRight size={16} /></Link>
        </div>
        <div className="product-grid home-grid">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
      <section className="product-section section-shell alt-shell">
        <div className="section-heading-row">
          <div>
            <p className="eyebrow">NEW IN</p>
            <h2>New Arrivals</h2>
          </div>
          <Link to="/shop" className="inline-link">See more <ArrowRight size={16} /></Link>
        </div>
        <div className="product-grid home-grid">
          {newArrivals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
      <section className="product-section section-shell">
        <div className="section-heading-row">
          <div>
            <p className="eyebrow">BEST SELLERS</p>
            <h2>Most loved by CasaNest shoppers</h2>
          </div>
        </div>
        <div className="product-grid home-grid">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
      <section className="why-us section-shell">
        <div className="section-heading">
          <p className="eyebrow">WHY CHOOSE CASANEST</p>
          <h2>Designed to make your home feel complete</h2>
        </div>
        <div className="benefits-grid">
          <div className="benefit-card">
            <Sparkles size={24} />
            <h3>Curated styles</h3>
            <p>Thoughtful selections across modern, minimal, vintage, and cozy looks.</p>
          </div>
          <div className="benefit-card">
            <ShieldCheck size={24} />
            <h3>Quality assured</h3>
            <p>Carefully chosen décor essentials with lasting beauty and comfort.</p>
          </div>
          <div className="benefit-card">
            <Truck size={24} />
            <h3>Fast delivery</h3>
            <p>Quick and reliable delivery for every order made with CasaNest.</p>
          </div>
          <div className="benefit-card">
            <Star size={24} />
            <h3>Top-rated service</h3>
            <p>Customer-loved finds and seamless shopping from start to finish.</p>
          </div>
        </div>
      </section>
      <section className="cta-section">
        <div>
          <p className="eyebrow">FIND YOUR STYLE</p>
          <h2>Give your home the warmth it deserves.</h2>
        </div>
        <Link to="/shop" className="primary-button">Shop the Collection</Link>
      </section>
    </main>
  );
}
export default Home;