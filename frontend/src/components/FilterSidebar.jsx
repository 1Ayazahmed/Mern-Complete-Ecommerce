import React from "react";

const FilterSidebar = ({
  allProducts,
  priceRange,
  setPriceRange,
  setBrand,
  brand,
  setCategory,
  category,
  setSearch,
  search,
}) => {
  const categories = [
    ...new Set(allProducts.map((product) => product.category)), //Unique Categories: Same Category Will be Counted Single Category
  ];
  const brands = [...new Set(allProducts.map((product) => product.brand))]; //Unique Brand: Same Brand Will be Counted Single Brand

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleBrandChange = (e) => {
    setBrand(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };
  const handleMinChange = (e) => {
    const min = Number(e.target.value);
    // setPriceRange([min, priceRange[1]]);
    if (min <= priceRange[1]) {
      setPriceRange([min, priceRange[1]]);
    }
  };
  const handleMaxChange = (e) => {
    const max = Number(e.target.value);
    // setPriceRange([min, priceRange[1]]);
    if (max >= priceRange[0]) {
      setPriceRange([priceRange[0], max]);
    }
  };

  const resetFilters = () => {
    setCategory("All");
    setBrand("All");
    setPriceRange([0, 5000]);
    setSearch("");
  };

  return (
    <aside className="bg-[#1f1f1f] text-white p-6 rounded-xl shadow-lg w-full max-w-xs self-start sticky top-6 mt-15">
      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={handleSearchChange}
            className="w-full bg-[#2a2a2a] border border-gray-600 text-white px-4 py-2 rounded-md pr-10 placeholder-gray-400"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
            {/* search icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="7" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </span>
        </div>
      </div>

      <h2 className="text-lg font-semibold mb-6 border-b border-gray-700 pb-2">
        Filter Products
      </h2>

      {/* Category */}
      <div className="mb-6">
        <label className="block text-sm text-gray-400 mb-2">Category</label>
        <div className="space-y-3">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              value="All"
              name="category"
              className="accent-green-500"
              checked={category === "All"}
              onChange={handleCategoryChange}
            />
            <span className="text-gray-300 text-sm">All</span>
          </label>

          {categories.map((cat, index) => (
            <label key={index} className="flex items-center gap-2">
              <input
                type="radio"
                value={cat}
                name="category"
                className="accent-green-500"
                checked={category === cat}
                onChange={handleCategoryChange}
              />
              <span className="text-gray-300 text-sm">{cat}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Brand */}
      <div className="mb-6">
        <label className="block text-sm text-gray-400 mb-2">Brand</label>
        <select
          value={brand}
          onChange={handleBrandChange}
          className="w-full bg-[#2a2a2a] border border-gray-600 text-white px-4 py-2 rounded-md text-sm"
        >
          <option>ALL</option>
          {brands.map((brand, index) => (
            <option key={index} value={brand}>
              {brand.toUpperCase()}
            </option>
          ))}
        </select>
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <label className="block text-sm text-gray-400 mb-2">Price Range</label>
        {/* <p className="text-sm text-gray-300 mb-3">RS: 0 - RS 10000</p> */}
        <p className="text-sm text-gray-300 mb-3">
          RS: {priceRange[0]} - RS: {priceRange[1]}
        </p>

        <div className="flex gap-4 mb-4">
          <input
            type="number"
            value={priceRange[0]}
            onChange={handleMinChange}
            placeholder="Min"
            className="bg-[#2a2a2a] border border-gray-600 text-white px-3 py-2 rounded-md w-1/2 text-sm"
          />
          <span>-</span>
          <input
            type="number"
            value={priceRange[1]}
            onChange={handleMaxChange}
            placeholder="Max"
            className="bg-[#2a2a2a] border border-gray-600 text-white px-3 py-2 rounded-md w-1/2 text-sm"
          />
        </div>
        <div className="flex gap-2">
          <input
            type="range"
            min="0"
            max="5000"
            step="100"
            className="w-full accent-green-500"
            value={priceRange[0]}
            onChange={handleMinChange}
          />
          <input
            type="range"
            min="0"
            max="5000"
            step="100"
            className="w-full accent-green-500"
            value={priceRange[1]}
            onChange={handleMaxChange}
          />
        </div>
      </div>

      {/* Reset Button */}
      <button onClick={resetFilters} className="w-full bg-green-600 hover:bg-green-500 text-white py-2 rounded-lg text-sm mt-4">
        Reset Filters
      </button>
    </aside>
  );
};

export default FilterSidebar;
