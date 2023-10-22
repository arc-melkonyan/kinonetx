import Film from '@/components/screens/film';
import { FilmService } from '@/services/film.service';
import { Metadata, ResolvingMetadata } from 'next';
import { cookies } from 'next/headers';

export const revalidate = 4600;

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const { data } = await FilmService.getBySlug(params.slug, undefined);

  return {
    title: `${data.title} (${data.year}) смотреть онлайн бесплатно в хорошем качестве HD 720 1080 на сайте ${process.env.NEXT_PUBLIC_SITENAME}`,
    description: `На сайте ${process.env.NEXT_PUBLIC_SITENAME} вы можете смотреть ${
      data.title + ' ' + data.year
    } онлайн в хорошем качестве HD 720 1080. Бесплатно и без регистрации.`,
  };
}

const FilmPage = async ({ params }: { params: { slug: string } }) => {
  const refreshToken = cookies().get('refreshToken')?.value;
  const { data } = await FilmService.getBySlug(params.slug, refreshToken);

  return <Film {...data} />;
};

export default FilmPage;
