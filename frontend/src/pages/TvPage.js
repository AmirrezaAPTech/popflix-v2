import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { CircularProgressbar } from 'react-circular-progressbar';
import {
  AiFillFacebook,
  AiFillInstagram,
  AiFillTwitterSquare,
} from 'react-icons/ai';
import { FaImdb } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper';
import 'swiper/css';
import 'swiper/css/free-mode';

function TvPage() {
  let { id } = useParams();
  const [tvArr, setTvArr] = useState([]);
  const [genres, setGenres] = useState([]);
  const [media, setMedia] = useState([]);
  const [credits, setCredits] = useState([]);
  const [suggested, setSuggested] = useState([]);

  const BACKDROP_IMG = 'https://image.tmdb.org/t/p/original';
  const POSTER_IMG = 'https://image.tmdb.org/t/p/w200';

  // Fetch movies and store in moviesArr.
  useEffect(() => {
    const fetchTv = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/tv/${id}?api_key=${process.env.REACT_APP_TMDB_KEY}`
      );
      const data = await res.json();
      setTvArr(data);
      setGenres(data.genres);
    };
    fetchTv();
  }, [id]);

  useEffect(() => {
    const fetchMovies = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/tv/${id}/external_ids?api_key=${process.env.REACT_APP_TMDB_KEY}`
      );
      const data = await res.json();
      setMedia(data);
    };
    fetchMovies();
  }, [id]);

  useEffect(() => {
    const fetchMovies = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/tv/${id}/credits?api_key=${process.env.REACT_APP_TMDB_KEY}`
      );
      const data = await res.json();
      setCredits(data.cast);
    };
    fetchMovies();
  }, [id]);

  useEffect(() => {
    const fetchMovies = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/tv/${id}/recommendations?api_key=${process.env.REACT_APP_TMDB_KEY}`
      );
      const data = await res.json();
      setSuggested(data.results);
    };
    fetchMovies();
  }, [id]);

  return (
    <>
      <div className='container w-100 max-w-[900px] mx-auto py-20 px-2'>
        <div className='top-container mx-auto text-center font-thin flex flex-col md:flex-row md:justify-around'>
          <div className='media-image mx-auto md:w-full max-w-[300px]'>
            <img
              src={POSTER_IMG + tvArr.poster_path}
              className='w-full max-w-[250px]'
            />
          </div>
          <div className='media-description w-full'>
            <h1 className='title text-3xl font-bold  my-2'>
              {tvArr.name}
            </h1>
            <div className='release-runtime-review flex flex-row justify-between items-center my-2'>
              <p>
                <span className='font-bold'>Seasons: </span>
                {tvArr.number_of_seasons}
              </p>
              <p>
                <span className='font-bold'>Episodes: </span>
                {tvArr.number_of_episodes}
              </p>
              <CircularProgressbar
                className='w-[60px]'
                background={true}
                value={`${Math.ceil((tvArr.vote_average / 10) * 100)}`}
                text={`${Math.ceil((tvArr.vote_average / 10) * 100)}%`}
                styles={{
                  // Customize the root svg element
                  root: {
                    bottom: '0',
                    padding: '5px',
                  },
                  // Customize the path, i.e. the "completed progress"
                  path: {
                    // Path color
                    stroke:
                      Math.ceil((tvArr.vote_average / 10) * 100) < 55
                        ? `rgba(255, 0, 0, ${
                            Math.ceil((tvArr.vote_average / 10) * 100) / 100
                          }`
                        : Math.ceil((tvArr.vote_average / 10) * 100) < 75
                        ? `rgba(255, 165, 0, ${
                            Math.ceil((tvArr.vote_average / 10) * 100) / 100
                          }`
                        : `rgba(60, 179, 113, ${
                            Math.ceil((tvArr.vote_average / 10) * 100) / 100
                          }`,
                    // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                    strokeLinecap: 'butt',
                    // Customize transition animation
                    transition: 'stroke-dashoffset 0.5s ease 0s',
                    // Rotate the path
                    transform: 'rotate(0.25turn)',
                    transformOrigin: 'center center',
                  },
                  // Customize the circle behind the path, i.e. the "total progress"
                  trail: {
                    // Trail color
                    stroke: '#d6d6d6',
                    // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                    strokeLinecap: 'butt',
                    // Rotate the trail
                    transform: 'rotate(0.25turn)',
                    transformOrigin: 'center center',
                  },
                  // Customize the text
                  text: {
                    // Text color
                    fill: 'white',

                    // Text size
                    fontSize: '24px',
                    transform: 'translate(-23px, 8px)',
                  },
                  // Customize background - only used when the `background` prop is true
                  background: {
                    fill: '#000000',
                  },
                }}
              />
            </div>
            <div className='overview'>
              <span className='font-bold  my-2'>Overview: </span>
              {tvArr.overview}
            </div>
            <button className='bg-red-700 p-2 font-normal my-4'>
              Add to watchlist
            </button>
            <div className='media-socials flex justify-center p-1'>
              <i>
                <Link
                  to={`https://www.facebook.com/${media.facebook_id}`}
                  target='_blank'
                >
                  <AiFillFacebook
                    size='40px'
                    className='m-1 text-gray-300 hover:text-white'
                  />
                </Link>
              </i>
              <i>
                <Link
                  to={`https://www.instagram.com/${media.instagram_id}`}
                  target='_blank'
                >
                  <AiFillInstagram
                    size='40px'
                    className='m-1  text-gray-300 hover:text-white'
                  />
                </Link>
              </i>
              <i>
                <Link
                  to={`https://www.twitter.com/${media.twitter_id}`}
                  target='_blank'
                >
                  <AiFillTwitterSquare
                    size='40px'
                    className='m-1  text-gray-300 hover:text-white'
                  />
                </Link>
              </i>
              <i>
                <Link
                  to={`https://www.imdb.com/${media.imdb_id}`}
                  target='_blank'
                >
                  <FaImdb
                    size='40px'
                    className='m-1  text-gray-300 hover:text-white'
                  />
                </Link>
              </i>
            </div>
          </div>
        </div>
        <div className='mid-container md:flex my-8'>
          <div className='credits-container md:max-w-[70%] text-center'>
            <h2 className='text-start font-bold mb-2'>Cast</h2>
            <Swiper
              slidesPerView={2}
              spaceBetween={10}
              freeMode={true}
              modules={[FreeMode]}
              breakpoints={{
              450: {
                  slidesPerView: 3,
                  spaceBetween: 10,
                },
                640: {
                  slidesPerView: 4,
                  spaceBetween: 10,
                },
              }}
              className='mySwiper'
            >
              {credits.map((credit, index) => (
                <SwiperSlide key={index}>
                  <img
                    className='object-cover h-full'
                    src={POSTER_IMG + credit.profile_path}
                    alt={`${
                      credit.title === undefined
                        ? 'No title image'
                        : `${credit.title} image`
                    }`}
                  />
                  <h3>{credit.character}</h3>
                  <h3><span className='font-thin'>{credit.original_name}</span></h3>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <div className='side-info-container font-thin w-full md:pl-4 py-4 md:py-0'>
            <div className="genre flex justify-between items-center md:flex-col md:items-end"> <h2 className='text-start font-bold mb-2'>Genres:</h2> {genres.map(genre => (
              <p className='p-1.5 md:my-1 bg-red-700' key={genre.name}>{genre.name}</p>
            ))}</div>
            <div className='status-budget-revenue flex text-center justify-between md:flex-col md:items-end py-4 md:py-0'>
              <p className='md:my-1'> <span className='font-bold'>Status: </span> {tvArr.status}</p>
              <p  className='md:my-1'> <span className='font-bold'>First Air Date: </span> {tvArr.first_air_date}</p>
              <p  className='md:my-1'> <span className='font-bold'>Last Air Date: </span> {tvArr.last_air_date}</p>
            </div>
          </div>
        </div>

        <div className='bottom-container md:flex my-8 border-t-[.001px] py-8 border-gray-100'>
          <div className='suggestion-container text-center max-w-full'>
            <h2 className='text-start font-bold mb-2'>Suggestions</h2>
            <Swiper
              slidesPerView={2}
              spaceBetween={10}
              freeMode={true}
              modules={[FreeMode]}
              breakpoints={{
                450: {
                  slidesPerView: 2,
                  spaceBetween: 10,
                },
                640: {
                  slidesPerView: 3,
                  spaceBetween: 10,
                },
              }}
              className='mySwiper'
            >
              {suggested.map((show, index) => (
                <SwiperSlide key={index}>
                 <Link to={`/tv/${show.id}`}>
                  <img
                    className='object-cover h-full'
                    src={show.backdrop_path && BACKDROP_IMG + show.backdrop_path }
                    alt={`${
                      show.name === undefined
                        ? 'No title image'
                        : `${show.name} image`
                    }`}
                  />
                  <h3>{show.name}</h3>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </>
  );
}

export default TvPage;