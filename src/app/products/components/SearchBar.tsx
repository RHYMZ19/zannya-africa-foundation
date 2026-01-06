interface Props {
  setSearch: (value: string) => void;
}

const SearchBar: React.FC<Props> = ({ setSearch }) => {
  return (
    <input
      type="text"
      placeholder="Search products..."
      onChange={(e) => setSearch(e.target.value)}
      style={{ padding: 10, width: "100%", marginBottom: 20 }}
    />
  );
};

export default SearchBar;
