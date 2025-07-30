import React, { useState } from 'react';
import { Search, User, Heart, Menu, X } from 'lucide-react';
import { Company } from '../types';

interface HeaderProps {
  onSearch: (query: string) => void;
  onCompanySelect: (company: Company) => void;
  searchResults: Company[];
  isSearching: boolean;
  user: any;
  onLogin: () => void;
  onLogout: () => void;
  onShowFavorites: () => void;
  favoritesCount: number;
}

const Header: React.FC<HeaderProps> = ({
  onSearch,
  onCompanySelect,
  searchResults,
  isSearching,
  user,
  onLogin,
  onLogout,
  onShowFavorites,
  favoritesCount
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
    setShowResults(true);
  };

  const handleCompanyClick = (company: Company) => {
    onCompanySelect(company);
    setSearchQuery('');
    setShowResults(false);
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-xl font-bold text-gray-900">Stock One-pager</h1>
            </div>
          </div>

          {/* Desktop Search */}
          <div className="hidden md:block flex-1 max-w-2xl mx-8">
            <div className="relative">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search stocks by symbol or company name..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onFocus={() => setShowResults(true)}
                />
              </div>
              
              {/* Search Results */}
              {showResults && searchQuery && (
                <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg mt-1 shadow-lg max-h-64 overflow-y-auto z-50">
                  {isSearching ? (
                    <div className="p-4 text-center text-gray-500">Searching...</div>
                  ) : searchResults.length > 0 ? (
                    searchResults.map((company) => (
                      <div
                        key={company.symbol}
                        className="p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                        onClick={() => handleCompanyClick(company)}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium text-gray-900">{company.symbol}</div>
                            <div className="text-sm text-gray-500">{company.name}</div>
                          </div>
                          <div className="text-right">
                            <div className="font-medium text-gray-900">${company.price.toFixed(2)}</div>
                            <div className={`text-sm ${company.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                              {company.change >= 0 ? '+' : ''}{company.changePercent.toFixed(2)}%
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-center text-gray-500">No results found</div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <button 
                  onClick={onShowFavorites}
                  className="flex items-center space-x-2 px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 transition-colors relative"
                >
                  <Heart className="h-5 w-5" />
                  <span>Favorites</span>
                  {favoritesCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {favoritesCount}
                    </span>
                  )}
                </button>
                <div className="flex items-center space-x-2">
                  <User className="h-5 w-5 text-gray-700" />
                  <span className="text-sm text-gray-700">{user.name}</span>
                  <button
                    onClick={onLogout}
                    className="ml-2 px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <button
                onClick={onLogin}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Login
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="p-2 rounded-md text-gray-700 hover:bg-gray-100"
            >
              {showMobileMenu ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden pb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search stocks..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              value={searchQuery}
              onChange={handleSearchChange}
              onFocus={() => setShowResults(true)}
            />
          </div>
          
          {/* Mobile Search Results */}
          {showResults && searchQuery && (
            <div className="absolute left-4 right-4 bg-white border border-gray-200 rounded-lg mt-1 shadow-lg max-h-64 overflow-y-auto z-50">
              {isSearching ? (
                <div className="p-4 text-center text-gray-500">Searching...</div>
              ) : searchResults.length > 0 ? (
                searchResults.map((company) => (
                  <div
                    key={company.symbol}
                    className="p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                    onClick={() => handleCompanyClick(company)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-gray-900">{company.symbol}</div>
                        <div className="text-sm text-gray-500">{company.name}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-gray-900">${company.price.toFixed(2)}</div>
                        <div className={`text-sm ${company.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {company.change >= 0 ? '+' : ''}{company.changePercent.toFixed(2)}%
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-4 text-center text-gray-500">No results found</div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Menu */}
        {showMobileMenu && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="space-y-2">
              {user ? (
                <>
                  <button 
                    onClick={onShowFavorites}
                    className="flex items-center space-x-2 w-full px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 transition-colors relative"
                  >
                    <Heart className="h-5 w-5" />
                    <span>Favorites</span>
                    {favoritesCount > 0 && (
                      <span className="ml-auto bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {favoritesCount}
                      </span>
                    )}
                  </button>
                  <div className="flex items-center space-x-2 px-3 py-2">
                    <User className="h-5 w-5 text-gray-700" />
                    <span className="text-sm text-gray-700">{user.name}</span>
                  </div>
                  <button
                    onClick={onLogout}
                    className="w-full text-left px-3 py-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <button
                  onClick={onLogin}
                  className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Login
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;