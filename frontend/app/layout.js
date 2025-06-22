import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import './globals.css'

export const metadata = {
  title: "SmartRetail",
  description: "Customer segmentation dashboard for marketing",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
  <body>
    <Navbar />
    <main className="main">{children}</main>
    <Footer />
  </body>
</html>
  );
}
