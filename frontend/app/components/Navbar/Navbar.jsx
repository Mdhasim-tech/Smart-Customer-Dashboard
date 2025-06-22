"use client";
import Link from "next/link";
import { useState } from "react";
import "./Navbar.css";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="navbar">
      <Link href="/" className="logo">🛍️ SmartRetail</Link>

      <div className={`nav-links ${open ? "open" : ""}`}>
        <Link href="/">Home</Link>
        <Link href="/customer-dashboard">Dashboard</Link>
      </div>

      <div className="hamburger" onClick={() => setOpen(!open)}>
        <div className="bar" />
        <div className="bar" />
        <div className="bar" />
      </div>
    </nav>
  );
}

