import Footer from '@/components/Navigation/Footer/Footer';
import Navbar from '@/components/Navigation/Navbar/Navbar';
import './globals.css';

export const metadata = {
  title: 'Taskly',
  description: 'Your favorite ticket management app',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
