import '@/styles/globals.scss';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Providers from '@/components/Providers';
import Header from '@/components/ui/Header';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: `Лучшие Фильмы смотреть онлайн бесплатно в хорошем качестве HD 720 1080 на ${process.env.NEXT_PUBLIC_SITENAME}`,
  description: `Смотрите любимые фильмы, сериалы, мультфильмы и аниме онлайн бесплатно в хорошем качестве HD 720 1080 на ${process.env.NEXT_PUBLIC_SITENAME}.`,
};

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body className={inter.className}>
        <Providers>
          <div className="container">
            <Header />
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}

export default RootLayout;
