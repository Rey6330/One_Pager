import React, { useState } from 'react';
import { ArrowLeft, Heart, Share2, Download, Clock, TrendingUp, TrendingDown, AlertTriangle, Target, DollarSign, Shield, Eye } from 'lucide-react';
import { Company, NewsItem, EarningsCall, FinancialMetrics, ChartData, CompetitorData } from '../types';
import StockChart from './StockChart';

interface OnePagerProps {
  company: Company;
  news: NewsItem[];
  earningsCall: EarningsCall;
  financialMetrics: FinancialMetrics;
  chartData: ChartData[];
  competitors: CompetitorData[];
  onBack: () => void;
  user: any;
  onLogin: () => void;
  onAddToFavorites: (symbol: string) => void;
  isFavorited: boolean;
}

const OnePager: React.FC<OnePagerProps> = ({
  company,
  news,
  earningsCall,
  financialMetrics,
  chartData,
  competitors,
  onBack,
  user,
  onLogin,
  onAddToFavorites,
  isFavorited
}) => {
  const [activeSection, setActiveSection] = useState(1);
  
  const sections = [
    { id: 1, title: 'Financial Overview', icon: DollarSign },
    { id: 2, title: 'News Analysis', icon: AlertTriangle },
    { id: 3, title: 'Real-Time News', icon: Clock },
    { id: 4, title: 'Earnings Call', icon: TrendingUp },
    { id: 5, title: 'Competitive Analysis', icon: Target },
    { id: 6, title: 'Revenue Analysis', icon: TrendingUp },
    { id: 7, title: 'Profitability', icon: DollarSign },
    { id: 8, title: 'Financial Health', icon: Shield },
    { id: 9, title: 'Risk Assessment', icon: AlertTriangle },
    { id: 10, title: 'Forward Outlook', icon: Eye }
  ];
  
  const positiveNews = news.filter(n => n.sentiment === 'positive');
  const negativeNews = news.filter(n => n.sentiment === 'negative');
  const neutralNews = news.filter(n => n.sentiment === 'neutral');
  
  const handleFavoriteClick = () => {
    if (!user) {
      onLogin();
      return;
    }
    onAddToFavorites(company.symbol);
  };
  
  const renderSection = () => {
    switch (activeSection) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-500">Market Cap</h4>
                <p className="text-xl font-bold text-gray-900">{company.marketCap}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-500">P/E Ratio</h4>
                <p className="text-xl font-bold text-gray-900">{company.peRatio}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-500">Revenue</h4>
                <p className="text-xl font-bold text-gray-900">{company.revenue}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-500">Profit Margin</h4>
                <p className="text-xl font-bold text-gray-900">{company.profitMargin}%</p>
              </div>
            </div>
            <StockChart
              data={chartData}
              currentPrice={company.price}
              change={company.change}
              changePercent={company.changePercent}
            />
          </div>
        );
      
      case 2:
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">News Analysis</h3>
              <div className="flex items-center text-sm text-gray-500">
                <Clock className="h-4 w-4 mr-1" />
                Last updated: {new Date().toLocaleString()}
              </div>
            </div>
            
            {negativeNews.length > 0 && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h4 className="text-lg font-semibold text-red-800 mb-3 flex items-center">
                  <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                  Negative News
                </h4>
                <div className="space-y-3">
                  {negativeNews.map((item) => (
                    <div key={item.id} className="border-b border-red-200 pb-3 last:border-b-0">
                      <h5 className="font-medium text-red-900">{item.title}</h5>
                      <p className="text-sm text-red-700 mt-1">{item.summary}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-red-600">{item.source}</span>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          item.impact === 'high' ? 'bg-red-200 text-red-800' :
                          item.impact === 'medium' ? 'bg-yellow-200 text-yellow-800' :
                          'bg-green-200 text-green-800'
                        }`}>
                          {item.impact} impact
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {positiveNews.length > 0 && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="text-lg font-semibold text-green-800 mb-3 flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                  Positive News
                </h4>
                <div className="space-y-3">
                  {positiveNews.map((item) => (
                    <div key={item.id} className="border-b border-green-200 pb-3 last:border-b-0">
                      <h5 className="font-medium text-green-900">{item.title}</h5>
                      <p className="text-sm text-green-700 mt-1">{item.summary}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-green-600">{item.source}</span>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          item.impact === 'high' ? 'bg-green-200 text-green-800' :
                          item.impact === 'medium' ? 'bg-yellow-200 text-yellow-800' :
                          'bg-gray-200 text-gray-800'
                        }`}>
                          {item.impact} impact
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {neutralNews.length > 0 && (
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                  <div className="w-3 h-3 bg-gray-500 rounded-full mr-2"></div>
                  Industry/Market News
                </h4>
                <div className="space-y-3">
                  {neutralNews.map((item) => (
                    <div key={item.id} className="border-b border-gray-200 pb-3 last:border-b-0">
                      <h5 className="font-medium text-gray-900">{item.title}</h5>
                      <p className="text-sm text-gray-700 mt-1">{item.summary}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-gray-600">{item.source}</span>
                        <span className="text-xs text-gray-500">{item.category}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      
      case 3:
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Real-Time News Feed</h3>
              <button className="bg-blue-600 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-700 transition-colors">
                Refresh
              </button>
            </div>
            <div className="space-y-4">
              {news.map((item) => (
                <div key={item.id} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{item.title}</h4>
                      <p className="text-sm text-gray-600 mt-1">{item.summary}</p>
                      <div className="flex items-center space-x-4 mt-2">
                        <span className="text-xs text-gray-500">{item.source}</span>
                        <span className="text-xs text-gray-500">
                          {new Date(item.publishedAt).toLocaleString()}
                        </span>
                      </div>
                    </div>
                    <div className={`w-3 h-3 rounded-full ml-4 ${
                      item.sentiment === 'positive' ? 'bg-green-500' :
                      item.sentiment === 'negative' ? 'bg-red-500' :
                      'bg-gray-500'
                    }`}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      
      case 4:
        return (
          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="text-lg font-semibold text-blue-800 mb-2">
                {earningsCall.quarter} {earningsCall.year} Earnings Call
              </h4>
              <p className="text-sm text-blue-600">
                Call Date: {new Date(earningsCall.date).toLocaleDateString()}
              </p>
              {earningsCall.nextCallDate && (
                <p className="text-sm text-blue-600">
                  Next Call: {new Date(earningsCall.nextCallDate).toLocaleDateString()}
                </p>
              )}
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-3">Key Management Quotes</h4>
              <div className="space-y-3">
                {earningsCall.keyQuotes.map((quote, index) => (
                  <blockquote key={index} className="border-l-4 border-blue-500 pl-4 italic text-gray-700">
                    "{quote}"
                  </blockquote>
                ))}
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-3">Analyst Q&A Highlights</h4>
              <ul className="space-y-2">
                {earningsCall.analystHighlights.map((highlight, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span className="text-gray-700">{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );
      
      case 5:
        return (
          <div className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-4">Market Position</h4>
              <div className="space-y-3">
                {competitors.map((competitor, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-gray-700">{competitor.name}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600">{competitor.marketShare}%</span>
                      <div className={`flex items-center ${
                        competitor.trend === 'up' ? 'text-green-600' :
                        competitor.trend === 'down' ? 'text-red-600' :
                        'text-gray-600'
                      }`}>
                        {competitor.trend === 'up' ? <TrendingUp className="h-4 w-4" /> :
                         competitor.trend === 'down' ? <TrendingDown className="h-4 w-4" /> :
                         <span className="h-4 w-4">→</span>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="font-semibold text-green-800 mb-2">Competitive Advantages</h4>
              <ul className="space-y-1 text-sm text-green-700">
                <li>• Strong brand recognition and customer loyalty</li>
                <li>• Integrated ecosystem of products and services</li>
                <li>• Significant R&D investment and innovation pipeline</li>
                <li>• Premium positioning with strong pricing power</li>
              </ul>
            </div>
          </div>
        );
      
      case 6:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-800 mb-2">Revenue Growth</h4>
                <p className="text-2xl font-bold text-blue-900">
                  {financialMetrics.revenue.growth > 0 ? '+' : ''}{financialMetrics.revenue.growth}%
                </p>
                <p className="text-sm text-blue-600">Year-over-year</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-2">Current Revenue</h4>
                <p className="text-2xl font-bold text-gray-900">${financialMetrics.revenue.current}B</p>
                <p className="text-sm text-gray-600">Annual</p>
              </div>
            </div>
            
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-4">Quarterly Performance</h4>
              <div className="space-y-3">
                {financialMetrics.revenue.quarters.map((quarter, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-gray-700">{quarter.quarter}</span>
                    <span className="font-medium text-gray-900">${quarter.revenue}B</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h4 className="font-semibold text-yellow-800 mb-2">Key Growth Drivers</h4>
              <ul className="space-y-1 text-sm text-yellow-700">
                <li>• AI and machine learning product integration</li>
                <li>• Expansion into emerging markets</li>
                <li>• Services revenue diversification</li>
                <li>• Enterprise and B2B solutions growth</li>
              </ul>
            </div>
          </div>
        );
      
      case 7:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="font-semibold text-green-800 mb-2">Gross Margin</h4>
                <p className="text-2xl font-bold text-green-900">{financialMetrics.profitability.grossMargin}%</p>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-800 mb-2">Operating Margin</h4>
                <p className="text-2xl font-bold text-blue-900">{financialMetrics.profitability.operatingMargin}%</p>
              </div>
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <h4 className="font-semibold text-purple-800 mb-2">Net Margin</h4>
                <p className="text-2xl font-bold text-purple-900">{financialMetrics.profitability.netMargin}%</p>
              </div>
            </div>
            
            <div className={`border rounded-lg p-4 ${
              financialMetrics.profitability.trend === 'improving' ? 'bg-green-50 border-green-200' :
              financialMetrics.profitability.trend === 'declining' ? 'bg-red-50 border-red-200' :
              'bg-gray-50 border-gray-200'
            }`}>
              <h4 className={`font-semibold mb-2 ${
                financialMetrics.profitability.trend === 'improving' ? 'text-green-800' :
                financialMetrics.profitability.trend === 'declining' ? 'text-red-800' :
                'text-gray-800'
              }`}>
                Profitability Trend: {financialMetrics.profitability.trend}
              </h4>
              <p className={`text-sm ${
                financialMetrics.profitability.trend === 'improving' ? 'text-green-700' :
                financialMetrics.profitability.trend === 'declining' ? 'text-red-700' :
                'text-gray-700'
              }`}>
                {financialMetrics.profitability.trend === 'improving' 
                  ? 'Margins are expanding due to operational efficiency and pricing power'
                  : financialMetrics.profitability.trend === 'declining'
                  ? 'Margins under pressure from increased competition and costs'
                  : 'Margins remain stable with consistent operational performance'}
              </p>
            </div>
          </div>
        );
      
      case 8:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-800 mb-2">Cash Flow</h4>
                <p className="text-2xl font-bold text-blue-900">${financialMetrics.financialHealth.cashFlow}B</p>
                <p className="text-sm text-blue-600">Operating Cash Flow</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-2">Current Ratio</h4>
                <p className="text-2xl font-bold text-gray-900">{financialMetrics.financialHealth.currentRatio}</p>
                <p className="text-sm text-gray-600">Liquidity measure</p>
              </div>
            </div>
            
            <div className={`border rounded-lg p-4 ${
              financialMetrics.financialHealth.rating === 'strong' ? 'bg-green-50 border-green-200' :
              financialMetrics.financialHealth.rating === 'moderate' ? 'bg-yellow-50 border-yellow-200' :
              'bg-red-50 border-red-200'
            }`}>
              <h4 className={`font-semibold mb-2 ${
                financialMetrics.financialHealth.rating === 'strong' ? 'text-green-800' :
                financialMetrics.financialHealth.rating === 'moderate' ? 'text-yellow-800' :
                'text-red-800'
              }`}>
                Financial Health Rating: {financialMetrics.financialHealth.rating}
              </h4>
              <div className="grid grid-cols-2 gap-4 mt-3">
                <div>
                  <span className="text-sm text-gray-600">Total Debt</span>
                  <p className="font-medium">${financialMetrics.financialHealth.debt}B</p>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Debt-to-Equity</span>
                  <p className="font-medium">{financialMetrics.financialHealth.debtToEquity}</p>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 9:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Risk Assessment</h3>
            <div className="space-y-4">
              {financialMetrics.risks.map((risk, index) => (
                <div key={index} className={`border rounded-lg p-4 ${
                  risk.severity === 'high' ? 'bg-red-50 border-red-200' :
                  risk.severity === 'medium' ? 'bg-yellow-50 border-yellow-200' :
                  'bg-green-50 border-green-200'
                }`}>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className={`font-semibold ${
                        risk.severity === 'high' ? 'text-red-800' :
                        risk.severity === 'medium' ? 'text-yellow-800' :
                        'text-green-800'
                      }`}>
                        {risk.category}
                      </h4>
                      <p className={`text-sm mt-1 ${
                        risk.severity === 'high' ? 'text-red-700' :
                        risk.severity === 'medium' ? 'text-yellow-700' :
                        'text-green-700'
                      }`}>
                        {risk.description}
                      </p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                      risk.severity === 'high' ? 'bg-red-200 text-red-800' :
                      risk.severity === 'medium' ? 'bg-yellow-200 text-yellow-800' :
                      'bg-green-200 text-green-800'
                    }`}>
                      {risk.severity}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      
      case 10:
        return (
          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-800 mb-2">Management Guidance</h4>
              <p className="text-sm text-blue-700">{financialMetrics.outlook.guidance}</p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-800 mb-2">Market Expectations</h4>
              <p className="text-sm text-gray-700">{financialMetrics.outlook.marketExpectations}</p>
            </div>
            
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="font-semibold text-green-800 mb-2">Key Growth Drivers</h4>
              <ul className="space-y-1 text-sm text-green-700">
                {financialMetrics.outlook.keyDrivers.map((driver, index) => (
                  <li key={index}>• {driver}</li>
                ))}
              </ul>
            </div>
          </div>
        );
      
      default:
        return <div>Section not found</div>;
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={onBack}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
                <span>Back</span>
              </button>
              <div className="border-l border-gray-300 h-6"></div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">{company.symbol}</h1>
                <p className="text-sm text-gray-600">{company.name}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={handleFavoriteClick}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-colors ${
                  isFavorited
                    ? 'bg-red-100 text-red-700 hover:bg-red-200'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Heart className={`h-5 w-5 ${isFavorited ? 'fill-current' : ''}`} />
                <span>{isFavorited ? 'Favorited' : 'Add to Favorites'}</span>
              </button>
              <button className="flex items-center space-x-2 px-3 py-2 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors">
                <Share2 className="h-5 w-5" />
                <span>Share</span>
              </button>
              <button className="flex items-center space-x-2 px-3 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors">
                <Download className="h-5 w-5" />
                <span>Export</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Section Navigation */}
          <div className="w-full lg:w-1/4">
            <div className="bg-white rounded-lg shadow-sm p-4 sticky top-24">
              <h2 className="font-semibold text-gray-900 mb-4">Analysis Sections</h2>
              <nav className="space-y-2">
                {sections.map((section) => {
                  const Icon = section.icon;
                  return (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        activeSection === section.id
                          ? 'bg-blue-100 text-blue-700'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{section.title}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {sections.find(s => s.id === activeSection)?.title}
                </h2>
                <div className="h-1 bg-gray-200 rounded-full">
                  <div 
                    className="h-1 bg-blue-600 rounded-full transition-all duration-300"
                    style={{ width: `${(activeSection / sections.length) * 100}%` }}
                  ></div>
                </div>
              </div>
              
              {renderSection()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnePager;