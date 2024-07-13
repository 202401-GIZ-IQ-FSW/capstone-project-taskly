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
      const response = await fetcher(
        `/v1/projects/${selectedProject._id}/tickets/search?q=${value}`
      );
      console.log('results ', response);
      if (response.status === 200) {
        const data = await response.json();
        setTickets(data);
      }
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
        <div className="bg-blue-200 absolute top-44 w-full max-h-32 overflow-y-auto rounded-md shadow-lg !z-50">
          results here
          {tickets.map((ticket) => (
            <SearchCard key={ticket._id} ticket={ticket} />
          ))}
        </div>
      )}
    </>
  );
};

export default SearchBar;
