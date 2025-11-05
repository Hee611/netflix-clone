import { useNavigate } from 'react-router-dom';
import './Nav.css';
import React, { useEffect, useState } from 'react';

export default function Nav() {
    const [show, setShow] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        window.addEventListener('scroll', () => {

            if (window.scrollY > 50) {
                setShow(true);
            } else {
                setShow(false);
            }
        });

        return () => {
            window.removeEventListener('scroll', () => {

            });
        }
    }, [])

    const handleChange = (e) => {
        setSearchValue(e.target.value);
        navigate(`/search?q=${e.target.value}`);
    };

    return (
        <nav className={`nav ${show && 'nav__black'}`}>
            <img
                alt='Netflix logo'
                src='https://i.namu.wiki/i/doTLsLoWjWoJbRzUZ8hWdeOXkIp2TfAXK2oJm3XEtu4FLbxICQJ-VTypQ-3scU5Owlp7vhTH0P4sA28m4RvSQQ.svg'
                className='nav__logo'
                onClick={() => window.location.reload()}
            />

            <input
                value={searchValue}
                onChange={handleChange}
                className='nav__input'
                type='text'
                placeholder='영화를 검색해 주세요.'
            />

            <img
                alt='User logged'
                src='https://occ-0-4960-993.1.nflxso.net/dnm/api/v6/vN7bi_My87NPKvsBoib006Llxzg/AAAABfjwXqIYd3kCEU6KWsiHSHvkft8VhZg0yyD50a_pHXku4dz9VgxWwfA2ontwogStpj1NE9NJMt7sCpSKFEY2zmgqqQfcw1FMWwB9.png'
                className='nav__avatar'
            />
        </nav>
    )
}
