export default function SearchBar({ search, setSearch }) {
  return (
    <div className="w-full mb-6">
      <input
        type="text"
        placeholder="Search cyber incidents..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-3 border rounded-lg shadow-sm"
      />
    </div>
  );
}
