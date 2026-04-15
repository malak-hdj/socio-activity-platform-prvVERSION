import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-[#F7F7F5]">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}