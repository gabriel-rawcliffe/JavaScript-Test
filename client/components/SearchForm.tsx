
export default function SearchForm({ searchTerm, setSearchTerm }) {
    return (
      <input
        type="text"
        placeholder="Search by artist, title, or year..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    );
  }
  