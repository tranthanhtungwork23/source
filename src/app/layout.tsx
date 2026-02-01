import type { Metadata } from 'next';
import './globals.css';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

export const metadata: Metadata = {
  title: 'TechnoVerse | Future Tech News',
  description: 'Your portal to the future of technology.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="background-effects">
          {/* Data stream or grid overlay */}
          <div className="grid-overlay"></div>
          <div className="glow-orb orb-1"></div>
          <div className="glow-orb orb-2"></div>
        </div>

        <Header />

        <main className="main-content">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}
