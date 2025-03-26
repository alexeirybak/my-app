import { useState, useTransition } from 'react';

const data = Array.from({ length: 10000 }, (_, i) => `Элемент ${i + 1}`);

export function FilterExample() {
  const [query, setQuery] = useState('');
  const [filteredData, setFilteredData] = useState(data);
  const [isPending, startTransition] = useTransition();
  
  function handleSearch(e) {
    const value = e.target.value;
    setQuery(value);
    
    startTransition(() => {
      setFilteredData(
        data.filter(item => 
          item.toLowerCase().includes(value.toLowerCase())
        )
      );
    });
  }
  
  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="Поиск..."
      />
      {isPending ? (
        <div>Поиск...</div>
      ) : (
        <ul>
          {filteredData.slice(0, 20).map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
