import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import './Row.css';
import axios from '../api/axios';
import { useEffect, useState } from 'react'
import MovieModal from './MovieModal';

export default function Row({ title, id, fetchUrl, isLargeRow = false }) {
    const [movies, setMovies] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [movieSelected, setMovieSelected] = useState({});

    useEffect(() => {
        const fetchMovieData = async () => {
            const request = await axios.get(fetchUrl);
            setMovies(request.data.results);
        }

        fetchMovieData();
    }, [fetchUrl]);

    const handleclick = (movie) => {
        setModalOpen(true);
        setMovieSelected(movie);
    };

    return (
        <section className='row'>
            <h1>{title}</h1>
            <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y]}
                spaceBetween={15}
                navigation
                pagination={{ clickable: true }}
                loop={true}
                breakpoints={{
                    1378: {
                        slidesPerView: 6,
                        slidesPerGroup: 6,
                    },
                    998: {
                        slidesPerView: 5,
                        slidesPerGroup: 5,
                    },
                    625: {
                        slidesPerView: 4,
                        slidesPerGroup: 4,
                    },
                    0: {
                        slidesPerView: 3,
                        slidesPerGroup: 3,
                    },
                }}
            >
                <div id={id} className='row__posters'>
                    {movies.map((movie) => (
                        <SwiperSlide>
                            <img
                                key={movie.id}
                                className={`row__poster ${isLargeRow && 'row__posterLarge'}`}
                                src={`https://image.tmdb.org/t/p/original/${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                                alt={movie.name}
                                onClick={() => handleclick(movie)}
                            />
                        </SwiperSlide>
                    ))}
                </div>
            </Swiper>

            {
                modalOpen && <MovieModal {...movieSelected} setModalOpen={setModalOpen} />
            }
        </section >
    )
}
