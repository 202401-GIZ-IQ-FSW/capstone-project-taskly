import ConditionalLayout from '@/components/Navigation/ConditionalLayout';
import { UserProvider } from '@/context/UserContext/UserProvider';
import './globals.css';

export const metadata = {
  title: 'Taskly',
  description: 'Your favorite ticket management app',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <UserProvider>
          <ConditionalLayout>{children}</ConditionalLayout>
        </UserProvider>
      </body>
    </html>
  );
}
