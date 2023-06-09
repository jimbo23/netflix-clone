import { Billboard } from '@components/Billboard';
import { InfoModal } from '@components/InfoModal';
import { MovieList } from '@components/MovieList';
import { Navbar } from '@components/Navbar';
import { useFavourites } from '@hooks/useFavourites';
import { useInfoModal } from '@hooks/useInfoModal';
import { useMovieList } from '@hooks/useMovieList';
import { NextPageContext } from 'next';
import { getSession } from 'next-auth/react';

export async function getServerSideProps(context: NextPageContext) {
  /**
   * NextAuth.js provides a getSession() helper which should be called client side only to return the current active session.
   * This helper is helpful in case you want to read the session outside of the context of React.
   * When called, getSession() will send a request to /api/auth/session and returns a promise with a session object, or null if no session exists.
   * Client Side!
   */
  const session = await getSession(context);

  if (!session)
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      },
    };

  return {
    props: {},
  };
}

export default function Home() {
  const { data: movies = [] } = useMovieList();
  const { data: favourites = [] } = useFavourites();
  const { isOpen, closeModal } = useInfoModal();

  return (
    <>
      <InfoModal visible={isOpen} onClose={closeModal} />
      <Navbar />
      <Billboard />
      <div className="pb-40">
        <MovieList data={movies} title="Trending Now" />
        <MovieList data={favourites} title="My List" />
      </div>
    </>
  );
}
