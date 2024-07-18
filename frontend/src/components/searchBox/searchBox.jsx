import React, { useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSearchText, setDebouncedTerm } from "../../store/searchSlice";

function SearchBox() {
  const inputRef = useRef(null);

  const dispatch = useDispatch();
  const debouncedTerm = useSelector((state) => state.search.debouncedTerm);

  const navigate = useNavigate();
  const location = useLocation();

  const navigateToSearchPage = () => {
    if (location.pathname !== "/search") {
      navigate("/search");
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => dispatch(setSearchText(debouncedTerm)), 1000);
    return () => clearTimeout(timer);
  }, [debouncedTerm]);

  // Focus input when on the search page and search was triggered
  useEffect(() => {
    if (location.pathname === "/search") {
      inputRef.current.focus();
    }
  }, [location.pathname]);

  return (
    <div className='w-full'>
      <p className='pl-3 items-center flex absolute inset-y-0 left-0 pointer-events-none'>
        <span className='flex justify-center items-center'>
          <svg className='w-5 h-5 text-gray-400' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth='2'>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M21 21l-6-6m2-5a7 7 0
                      11-14 0 7 7 0 0114 0z'
            />
          </svg>
        </span>
      </p>
      <input
        placeholder='Type to search'
        type='search'
        className='border border-gray-300 focus:ring-indigo-600
              focus:border-indigo-600 sm:text-sm w-full rounded-lg pt-2 pb-2 pl-10 px-3 py-2'
        onChange={(e) => {
          dispatch(setDebouncedTerm(e.target.value));
          navigateToSearchPage();
        }}
        value={debouncedTerm}
        ref={inputRef}
      />
    </div>
  );
}

export default SearchBox;
