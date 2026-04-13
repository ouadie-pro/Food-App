import Navbar from "@/components/Navbar";
import "./globals.css";

export const metadata = {
  title: "World Recipes",
  description: "Share your passion for cooking - World Recipes App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}