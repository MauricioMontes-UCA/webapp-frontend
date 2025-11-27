import React from "react";

const SearchForm = ({ query, onChange, onSubmit, loading }) => {
  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        name="title"
        placeholder="Título"
        value={query.title}
        onChange={onChange}
      />
      <input
        type="text"
        name="author"
        placeholder="Autor"
        value={query.author}
        onChange={onChange}
      />
      <input
        type="text"
        name="subject"
        placeholder="Género"
        value={query.subject}
        onChange={onChange}
      />
      <button type="submit" disabled={loading}>
        Buscar
      </button>
    </form>
  );
};

export default SearchForm;
