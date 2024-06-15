import Footer from '@/components/Navigation/Footer/Footer';
import Navbar from '@/components/Navigation/Navbar/Navbar';
import './globals.css';
import { UserProvider } from '@/context/UserContext/UserProvider';

export const metadata = {
  title: 'Taskly',
  description: 'Your favorite ticket management app',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <UserProvider>
          <Navbar />
          {children}
          <Footer />
        </UserProvider>
      </body>
    </html>
  );
}
