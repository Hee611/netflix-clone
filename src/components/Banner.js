import requests from '../api/requests';
import axios from '../api/axios';
import './Banner.css';
import React, { useEffect, useState } from 'react'

export default function Banner() {
    const [movie, setMovie] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        // 현재 상영중인 영화 정보를 가져오기(여러 영화)
        const request = await axios.get(requests.fetchNowPlaying);

        // 여러 영화 중 하나의 영화 ID를 가져오기
        const movieId = request.data.results[
            Math.floor(Math.random() * request.data.results.length)
        ].id;

        // 특정 영화의 더 상세한 정보를 가져오기(비디오 정보 포함)
        const { data: movieDetail } = await axios.get(`movie/${movieId}`, {
            params: { append_to_response: 'videos' },
        });
        setMovie(movieDetail);
    };

    const truncate = (str, n) => {
        return str?.length > n ? str.substr(0, n - 1) + '...' : str;
    }

    return (
        <header
            className='banner'
            style={{
                backgroundImage: `url('https://image.tmdb.org/t/p/original/${movie.backdrop_path})`,
                backgroundPosition: 'top center',
                backgroundSize: 'cover'
            }}>
            <div className='banner__contents'>
                <h1 className='banner__title'>{movie.title || movie.name || movie.original_name}</h1>
                <div className='banner__buttons'>
                    <button className='banner__button play'>
                        <svg width="24px" height="24px" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4.79062 2.09314C4.63821 1.98427 4.43774 1.96972 4.27121 2.05542C4.10467 2.14112 4 2.31271 4 2.5V12.5C4 12.6873 4.10467 12.8589 4.27121 12.9446C4.43774 13.0303 4.63821 13.0157 4.79062 12.9069L11.7906 7.90687C11.922 7.81301 12 7.66148 12 7.5C12 7.33853 11.922 7.18699 11.7906 7.09314L4.79062 2.09314Z" fill="#000000" />
                        </svg>
                        <div className='space'></div>
                        Play
                    </button>
                    <button className='banner__button info'>
                        <svg fill="#fff" width="24px" height="24px" viewBox="-2 -2 24 24" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin" class="jam jam-info">
                            <path d='M10 20C4.477 20 0 15.523 0 10S4.477 0 10 0s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm0-10a1 1 0 0 1 1 1v5a1 1 0 0 1-2 0V9a1 1 0 0 1 1-1zm0-1a1 1 0 1 1 0-2 1 1 0 0 1 0 2z' />
                        </svg>
                        <div className='space'></div>
                        More Information
                    </button>
                </div>

                <h1 className='banner__description'>{truncate(movie.overview, 100)}</h1>
            </div>
            <div className='banner--fadeBottom'></div>

        </header>
    )
}
