import React from 'react';
import { TrendingUp, TrendingDown, Star, ArrowRight } from 'lucide-react';
import { Company } from '../types';

interface HomepageProps {
  trendingStocks: Company[];
  onCompanySelect: (company: Company) => void;
}

const Homepage: React.FC<HomepageProps> = ({ trendingStocks, onCompanySelect }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Stock Analysis
            <span className="text-blue-600"> Simplified</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Get comprehensive company analysis reports with real-time data, news sentiment, 
            and financial insights all in one beautifully designed one-pager.
          </p>
        </div>
      </div>

      {/* Trending Stocks Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Trending Stocks</h2>
            <div className="flex items-center text-sm text-gray-500">
              <Star className="h-4 w-4 mr-1" />
              Most viewed today
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trendingStocks.map((stock) => (
              <div
                key={stock.symbol}
                className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer border hover:border-blue-200"
                onClick={() => onCompanySelect(stock)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{stock.symbol}</h3>
                    <p className="text-sm text-gray-600 truncate">{stock.name}</p>
                  </div>
                  <div className="flex items-center">
                    {stock.change >= 0 ? (
                      <TrendingUp className="h-5 w-5 text-green-500" />
                    ) : (
                      <TrendingDown className="h-5 w-5 text-red-500" />
                    )}
                  </div>
                </div>
                
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl font-bold text-gray-900">
                    ${stock.price.toFixed(2)}
                  </span>
                  <div className={`flex items-center text-sm font-medium ${
                    stock.change >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)}
                    <span className="ml-1">
                      ({stock.change >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%)
                    </span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Market Cap</span>
                    <div className="font-medium text-gray-900">{stock.marketCap}</div>
                  </div>
                  <div>
                    <span className="text-gray-500">P/E Ratio</span>
                    <div className="font-medium text-gray-900">{stock.peRatio}</div>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{stock.sector}</span>
                    <ArrowRight className="h-4 w-4 text-gray-400" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Everything You Need for Stock Analysis
          </h2>
          <p className="text-lg text-gray-600">
            Comprehensive insights delivered in a clean, professional format
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg p-6 shadow-md">
            <div className="bg-blue-100 rounded-full p-3 w-12 h-12 flex items-center justify-center mb-4">
              <TrendingUp className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Real-Time Data</h3>
            <p className="text-gray-600">
              Live stock prices, financial metrics, and market data updated in real-time
            </p>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-md">
            <div className="bg-green-100 rounded-full p-3 w-12 h-12 flex items-center justify-center mb-4">
              <Star className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">News Analysis</h3>
            <p className="text-gray-600">
              AI-powered sentiment analysis of news and earnings calls for better insights
            </p>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-md">
            <div className="bg-purple-100 rounded-full p-3 w-12 h-12 flex items-center justify-center mb-4">
              <ArrowRight className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">10-Section Reports</h3>
            <p className="text-gray-600">
              Comprehensive analysis covering financials, risks, outlook, and more
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;