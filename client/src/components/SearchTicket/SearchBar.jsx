import fetcher from '@/_utils/fetcher';
import { useProjects } from '@/context/ProjectsContext/ProjectsContext';
import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import SearchCard from './SearchCard';

const SearchBar = () => {
  const [tickets, setTickets] = useState([]);

  const [input, setInput] = useState('');
  const { selectedProject } = useProjects();

  const fetchData = async (value) => {
    try {
      const data = await fetcher(
        `/v1/projects/${selectedProject._id}/tickets/search?q=${value}`
      );
      console.log('results ', data);
      setTickets(data);
      console.log('tickets ', tickets);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleChange = (value) => {
    setInput(value);
    if (value.length >= 1) {
      fetchData(value);
    } else {
      setTickets([]);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      fetchData(input);
    }
  };
  const clearSearch = () => {
    setInput('');
    setTickets([]);
  };
  return (
    <>
      <form className="relative flex flex-1" action="#" method="GET">
        <label htmlFor="search-field" className="sr-only">
          Search
        </label>
        <FaSearch
          className="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-gray-400"
          aria-hidden="true"
        />
        <input
          id="search-field"
          className="block h-full w-full border-0 py-0 pl-8 pr-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
          placeholder="Search..."
          type="search"
          name="search"
          value={input}
          onChange={(e) => handleChange(e.target.value)}
          onKeyDown={handleKeyPress}
        />
      </form>
      {tickets.length > 0 && (
        <div className="bg-gray-100 absolute top-24 w-full max-h-96 space-y-6 overflow-y-auto rounded-md shadow-lg py-10 px-5">
          {tickets.map((ticket) => (
            <SearchCard
              key={ticket._id}
              ticket={ticket}
              clearSearch={clearSearch}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default SearchBar;
