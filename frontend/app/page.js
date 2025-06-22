"use client"
import Link from 'next/link';
import './Home.css';

export default function Home() {
  return (
    <div className="home-container">
      <h1>📈 Smart Retail Intelligence</h1>
      <p>Your all-in-one platform for customer segmentation & insights.</p>

      <Link href="/customer-dashboard">
        <button className="cta-button">Launch Dashboard 🚀</button>
      </Link>
    </div>
  );
}
