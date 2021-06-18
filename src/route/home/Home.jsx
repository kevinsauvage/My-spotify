import "./Home.scss";
import CardLoader from "../../components/cardLoader/CardLoader";
import { lazy, Suspense, useContext } from "react";
import { AppContext } from "../../context/AppContext";
import SectionTitle from "../../components/sectionTtitle/SectionTitle";

const CarouselComponent = lazy(() =>
  import("../../components/carousel/CarouselComponent")
); // Lazy-loaded

const Home = () => {
  const {
    topArtists,
    featuredPlaylists,
    followArtist,
    unfollowArtist,
    topTracks,
    saveTrack,
    unSaveTrack,
    newReleasesAlbums,
    saveAlbum,
    unSaveAlbum,
    recommendedAlbums,
    followedArtists,
    userPlaylists,
  } = useContext(AppContext);

  return (
    <div className="home">
      <Suspense fallback={<CardLoader />}>
        <SectionTitle title="Your Top Artists" padding="1rem 0" />
        <CarouselComponent
          data={topArtists}
          save={followArtist}
          unSave={unfollowArtist}
          link="Artists"
        />
      </Suspense>
      <Suspense fallback={<CardLoader />}>
        <SectionTitle title="Your Followed Artists" padding="1rem 0" />
        <CarouselComponent
          data={followedArtists}
          save={followArtist}
          unSave={unfollowArtist}
          link="Artists"
        />
      </Suspense>
      <Suspense fallback={<CardLoader />}>
        <SectionTitle title="Your Top Tracks" padding="1rem 0" />
        <CarouselComponent
          data={topTracks}
          save={saveTrack}
          unSave={unSaveTrack}
          link="Tracks"
        />
      </Suspense>
      <Suspense fallback={<CardLoader />}>
        <SectionTitle title="New Release Albums" padding="1rem 0" />
        <CarouselComponent
          data={newReleasesAlbums}
          save={saveAlbum}
          unSave={unSaveAlbum}
          link="Albums"
        />
      </Suspense>
      <Suspense fallback={<CardLoader />}>
        <SectionTitle title="Recommended Albums" padding="1rem 0" />
        <CarouselComponent
          data={recommendedAlbums}
          save={saveAlbum}
          unSave={unSaveAlbum}
          link="Albums"
        />
      </Suspense>
      <Suspense fallback={<CardLoader />}>
        <SectionTitle title="Featured Playlists" padding="1rem 0" />
        <CarouselComponent data={featuredPlaylists} link="Playlists" />
      </Suspense>
      <Suspense fallback={<CardLoader />}>
        <SectionTitle title="Your Playlists" padding="1rem 0" />
        <CarouselComponent data={userPlaylists} link="Playlists" />
      </Suspense>
    </div>
  );
};

export default Home;
