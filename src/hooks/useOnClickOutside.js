import { useEffect } from 'react'

const useOnClickOutside = (ref, handler) => {
    useEffect(() => {
        const listner = (event) => {
            console.log('ref', ref.current);
            if(!ref.current || ref.current.contains(event.target)) {
                return;
            } else {
                handler();
            }
        };
        
        document.addEventListener('mousedown', listner);    // pc
        document.addEventListener('touchstart', listner);   // phone
        return () => {
            document.removeEventListener('mousedown', listner);
        }
    }, [ref, handler]);
}

export default useOnClickOutside;
