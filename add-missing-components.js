// add-missing-components.js
const fs = require('fs');
const path = require('path');

console.log('🚀 Adding missing components to First Securities Trading App...\n');

const components = {
  'src/components/Onboarding.tsx': `import React from 'react';
import { useNavigate } from 'react-router-dom';

const Onboarding: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen p-6 bg-white">
      <header className="text-center mb-8">
        <img 
          src="https://first-securities.com/wp-content/uploads/2025/02/cropped-favicon-192x192.png" 
          alt="First Securities Logo" 
          className="mx-auto mb-4 w-16 h-16"
        />
        <h1 className="text-2xl font-bold text-primary-blue">Get Started</h1>
        <p className="text-gray-500">Complete these steps to start trading</p>
      </header>

      <div className="space-y-6">
        <div className="flex items-center space-x-4 p-4 border border-gray-200 rounded-xl">
          <div className="w-10 h-10 rounded-full bg-primary-blue text-white flex items-center justify-center font-bold">1</div>
          <div className="flex-1">
            <h3 className="font-bold text-gray-800">Create Account</h3>
            <p className="text-sm text-gray-500">Sign up with your details</p>
          </div>
          <button 
            onClick={() => navigate('/')}
            className="text-primary-blue font-semibold"
          >
            Start
          </button>
        </div>

        <div className="flex items-center space-x-4 p-4 border border-gray-200 rounded-xl">
          <div className="w-10 h-10 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center font-bold">2</div>
          <div className="flex-1">
            <h3 className="font-bold text-gray-800">Complete KYC</h3>
            <p className="text-sm text-gray-500">Verify your identity</p>
          </div>
          <button 
            onClick={() => alert('KYC feature coming soon')}
            className="text-gray-400 font-semibold"
          >
            Pending
          </button>
        </div>

        <div className="flex items-center space-x-4 p-4 border border-gray-200 rounded-xl">
          <div className="w-10 h-10 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center font-bold">3</div>
          <div className="flex-1">
            <h3 className="font-bold text-gray-800">Fund Account</h3>
            <p className="text-sm text-gray-500">Add money to start trading</p>
          </div>
          <span className="text-gray-400 font-semibold">Locked</span>
        </div>

        <div className="flex items-center space-x-4 p-4 border border-gray-200 rounded-xl">
          <div className="w-10 h-10 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center font-bold">4</div>
          <div className="flex-1">
            <h3 className="font-bold text-gray-800">Start Trading</h3>
            <p className="text-sm text-gray-500">Buy and sell securities</p>
          </div>
          <span className="text-gray-400 font-semibold">Locked</span>
        </div>
      </div>

      <div className="mt-12">
        <button
          onClick={() => navigate('/')}
          className="btn-secondary w-full"
        >
          Back to Login
        </button>
      </div>
    </div>
  );
};

export default Onboarding;`,

  'src/components/MarketScreen.tsx': `import React, { useState } from 'react';

interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
}

const MarketScreen: React.FC = () => {
  const [stocks] = useState<Stock[]>([
    { symbol: 'MTNN', name: 'MTN Nigeria', price: 250.50, change: 5.25, changePercent: 2.14, volume: 4500000 },
    { symbol: 'ZENITHBANK', name: 'Zenith Bank', price: 35.75, change: -0.25, changePercent: -0.69, volume: 12000000 },
    { symbol: 'AIRLIQUID', name: 'Air Liquide', price: 18.20, change: 0.45, changePercent: 2.54, volume: 3500000 },
    { symbol: 'GUARANTY', name: 'GTBank', price: 28.90, change: 0.30, changePercent: 1.05, volume: 8500000 },
  ]);
  const [filter, setFilter] = useState<'all' | 'gainers' | 'losers'>('all');

  const filteredStocks = stocks.filter(stock => {
    if (filter === 'gainers') return stock.change > 0;
    if (filter === 'losers') return stock.change < 0;
    return true;
  });

  return (
    <div className="min-h-screen pb-20 bg-gray-50">
      <header className="p-6 pb-4 bg-white border-b border-gray-100">
        <h1 className="text-2xl font-bold text-primary-blue">Market Watch</h1>
        <p className="text-sm text-gray-500">Real-time stock prices</p>
      </header>

      <div className="p-4 bg-white">
        <div className="flex space-x-2 mb-4">
          <button
            onClick={() => setFilter('all')}
            className={\`px-4 py-2 rounded-lg font-medium \${filter === 'all' ? 'bg-primary-blue text-white' : 'bg-gray-100 text-gray-700'}\`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('gainers')}
            className={\`px-4 py-2 rounded-lg font-medium \${filter === 'gainers' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}\`}
          >
            Gainers
          </button>
          <button
            onClick={() => setFilter('losers')}
            className={\`px-4 py-2 rounded-lg font-medium \${filter === 'losers' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'}\`}
          >
            Losers
          </button>
        </div>

        <div className="space-y-3">
          {filteredStocks.map((stock) => (
            <div key={stock.symbol} className="p-4 bg-white rounded-xl card-shadow">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-gray-800">{stock.symbol}</h3>
                  <p className="text-sm text-gray-500">{stock.name}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-lg">₦{stock.price.toFixed(2)}</p>
                  <p className={\`text-sm font-medium \${stock.change >= 0 ? 'text-green-600' : 'text-red-600'}\`}>
                    {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)} ({stock.changePercent.toFixed(2)}%)
                  </p>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-gray-100">
                <p className="text-sm text-gray-500">Volume: {stock.volume.toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-6 bg-white mt-4">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Market Summary</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-green-50 rounded-xl">
            <p className="text-sm text-green-700">NGX All-Share Index</p>
            <p className="text-2xl font-bold text-green-800">52,456.78</p>
            <p className="text-sm text-green-700">+1.45%</p>
          </div>
          <div className="p-4 bg-blue-50 rounded-xl">
            <p className="text-sm text-blue-700">Market Cap (₦)</p>
            <p className="text-2xl font-bold text-blue-800">28.7T</p>
            <p className="text-sm text-blue-700">+₦420B</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketScreen;`,

  'src/components/PortfolioScreen.tsx': `import React, { useState } from 'react';

interface Holding {
  symbol: string;
  name: string;
  quantity: number;
  avgPrice: number;
  currentPrice: number;
  marketValue: number;
  gainLoss: number;
  gainLossPercent: number;
}

const PortfolioScreen: React.FC = () => {
  const [holdings] = useState<Holding[]>([
    { symbol: 'MTNN', name: 'MTN Nigeria', quantity: 5000, avgPrice: 230.25, currentPrice: 250.50, marketValue: 1252500, gainLoss: 101250, gainLossPercent: 8.80 },
    { symbol: 'ZENITHBANK', name: 'Zenith Bank', quantity: 10000, avgPrice: 34.50, currentPrice: 35.75, marketValue: 357500, gainLoss: 12500, gainLossPercent: 3.62 },
    { symbol: 'AIRLIQUID', name: 'Air Liquide', quantity: 8000, avgPrice: 17.80, currentPrice: 18.20, marketValue: 145600, gainLoss: 3200, gainLossPercent: 2.25 },
  ]);

  const totalMarketValue = holdings.reduce((sum, h) => sum + h.marketValue, 0);
  const totalGainLoss = holdings.reduce((sum, h) => sum + h.gainLoss, 0);
  const totalGainLossPercent = (totalGainLoss / (totalMarketValue - totalGainLoss)) * 100;

  return (
    <div className="min-h-screen pb-20 bg-gray-50">
      <header className="p-6 pb-4 bg-white border-b border-gray-100">
        <h1 className="text-2xl font-bold text-primary-blue">Portfolio</h1>
        <p className="text-sm text-gray-500">Your investment holdings</p>
      </header>

      <div className="p-6">
        <div className="p-6 rounded-xl card-shadow bg-primary-blue text-white">
          <p className="text-sm opacity-80">Total Portfolio Value</p>
          <h2 className="text-4xl font-bold mt-1">
            ₦{totalMarketValue.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </h2>
          <div className="flex items-center mt-2">
            <p className={\`text-lg font-bold \${totalGainLoss >= 0 ? 'text-green-300' : 'text-red-300'}\`}>
              {totalGainLoss >= 0 ? '+' : ''}₦{Math.abs(totalGainLoss).toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </p>
            <p className={\`ml-3 text-sm opacity-80 \${totalGainLoss >= 0 ? 'text-green-300' : 'text-red-300'}\`}>
              ({totalGainLoss >= 0 ? '+' : ''}{totalGainLossPercent.toFixed(2)}%)
            </p>
          </div>
        </div>

        <div className="mt-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Holdings</h2>
          <div className="space-y-4">
            {holdings.map((holding) => (
              <div key={holding.symbol} className="p-4 bg-white rounded-xl card-shadow">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-gray-800">{holding.symbol}</h3>
                    <p className="text-sm text-gray-500">{holding.name}</p>
                    <p className="text-sm text-gray-500 mt-1">{holding.quantity.toLocaleString()} shares</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg">₦{holding.marketValue.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
                    <p className={\`text-sm font-medium \${holding.gainLoss >= 0 ? 'text-green-600' : 'text-red-600'}\`}>
                      {holding.gainLoss >= 0 ? '+' : ''}₦{Math.abs(holding.gainLoss).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </p>
                    <p className={\`text-sm \${holding.gainLoss >= 0 ? 'text-green-600' : 'text-red-600'}\`}>
                      ({holding.gainLoss >= 0 ? '+' : ''}{holding.gainLossPercent.toFixed(2)}%)
                    </p>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-gray-100 grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Avg Price</p>
                    <p className="font-medium">₦{holding.avgPrice.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Current Price</p>
                    <p className="font-medium">₦{holding.currentPrice.toFixed(2)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioScreen;`,

  'src/components/TradeExecutionScreen.tsx': `import React, { useState } from 'react';

const TradeExecutionScreen: React.FC = () => {
  const [tradeType, setTradeType] = useState<'buy' | 'sell'>('buy');
  const [symbol, setSymbol] = useState('MTNN');
  const [quantity, setQuantity] = useState('');
  const [orderType, setOrderType] = useState<'market' | 'limit'>('market');
  const [limitPrice, setLimitPrice] = useState('');

  const stocks = [
    { symbol: 'MTNN', name: 'MTN Nigeria', price: 250.50 },
    { symbol: 'ZENITHBANK', name: 'Zenith Bank', price: 35.75 },
    { symbol: 'AIRLIQUID', name: 'Air Liquide', price: 18.20 },
    { symbol: 'GUARANTY', name: 'GTBank', price: 28.90 },
  ];

  const selectedStock = stocks.find(s => s.symbol === symbol);

  const handlePlaceOrder = () => {
    alert(\`\${tradeType === 'buy' ? 'Buy' : 'Sell'} order placed for \${quantity} shares of \${symbol}\`);
  };

  return (
    <div className="min-h-screen pb-20 bg-gray-50">
      <header className="p-6 pb-4 bg-white border-b border-gray-100">
        <h1 className="text-2xl font-bold text-primary-blue">Trade</h1>
        <p className="text-sm text-gray-500">Execute buy/sell orders</p>
      </header>

      <div className="p-6 space-y-6">
        <div className="flex bg-gray-100 p-1 rounded-xl">
          <button
            onClick={() => setTradeType('buy')}
            className={\`flex-1 py-3 rounded-lg font-bold transition-all \${tradeType === 'buy' ? 'bg-green-500 text-white' : 'text-gray-600'}\`}
          >
            BUY
          </button>
          <button
            onClick={() => setTradeType('sell')}
            className={\`flex-1 py-3 rounded-lg font-bold transition-all \${tradeType === 'sell' ? 'bg-red-500 text-white' : 'text-gray-600'}\`}
          >
            SELL
          </button>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Stock
          </label>
          <select
            value={symbol}
            onChange={(e) => setSymbol(e.target.value)}
            className="input-field"
          >
            {stocks.map((stock) => (
              <option key={stock.symbol} value={stock.symbol}>
                {stock.symbol} - {stock.name} (₦{stock.price.toFixed(2)})
              </option>
            ))}
          </select>
        </div>

        {selectedStock && (
          <div className="p-4 bg-blue-50 rounded-xl">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-bold text-gray-800">{selectedStock.symbol}</h3>
                <p className="text-sm text-gray-600">{selectedStock.name}</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-primary-blue">
                  ₦{selectedStock.price.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Order Type
          </label>
          <div className="flex space-x-2">
            <button
              onClick={() => setOrderType('market')}
              className={\`flex-1 py-3 rounded-lg font-medium border-2 \${orderType === 'market' ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-200 text-gray-600'}\`}
            >
              Market Order
            </button>
            <button
              onClick={() => setOrderType('limit')}
              className={\`flex-1 py-3 rounded-lg font-medium border-2 \${orderType === 'limit' ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-200 text-gray-600'}\`}
            >
              Limit Order
            </button>
          </div>
        </div>

        {orderType === 'limit' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Limit Price (₦)
            </label>
            <input
              type="number"
              value={limitPrice}
              onChange={(e) => setLimitPrice(e.target.value)}
              placeholder="Enter limit price"
              className="input-field"
            />
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Quantity
          </label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="Enter number of shares"
            className="input-field"
          />
        </div>

        <button
          onClick={handlePlaceOrder}
          disabled={!quantity || parseFloat(quantity) <= 0}
          className={\`w-full py-4 rounded-xl font-bold text-white transition-all \${tradeType === 'buy' ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'} disabled:opacity-50 disabled:cursor-not-allowed\`}
        >
          {tradeType === 'buy' ? 'PLACE BUY ORDER' : 'PLACE SELL ORDER'}
        </button>
      </div>
    </div>
  );
};

export default TradeExecutionScreen;`,

  'src/components/OrderBookScreen.tsx': `import React, { useState } from 'react';

interface Order {
  id: string;
  symbol: string;
  type: 'buy' | 'sell';
  quantity: number;
  price: number;
  status: 'pending' | 'executed' | 'cancelled';
  date: string;
}

const OrderBookScreen: React.FC = () => {
  const [orders] = useState<Order[]>([
    { id: '1', symbol: 'MTNN', type: 'buy', quantity: 500, price: 250.50, status: 'executed', date: '2024-01-15 10:30:15' },
    { id: '2', symbol: 'ZENITHBANK', type: 'sell', quantity: 1000, price: 35.75, status: 'pending', date: '2024-01-15 09:45:22' },
    { id: '3', symbol: 'AIRLIQUID', type: 'buy', quantity: 2000, price: 18.20, status: 'executed', date: '2024-01-14 14:20:10' },
  ]);
  const [filter, setFilter] = useState<'all' | 'pending' | 'executed' | 'cancelled'>('all');

  const filteredOrders = orders.filter(order => {
    if (filter === 'all') return true;
    return order.status === filter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'executed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen pb-20 bg-gray-50">
      <header className="p-6 pb-4 bg-white border-b border-gray-100">
        <h1 className="text-2xl font-bold text-primary-blue">Order Book</h1>
        <p className="text-sm text-gray-500">Manage your orders</p>
      </header>

      <div className="p-4">
        <div className="flex space-x-2 mb-6">
          {['all', 'pending', 'executed'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status as any)}
              className={\`px-4 py-2 rounded-lg font-medium capitalize \${filter === status ? 'bg-primary-blue text-white' : 'bg-gray-100 text-gray-700'}\`}
            >
              {status}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <div key={order.id} className="p-4 bg-white rounded-xl card-shadow">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="font-bold text-gray-800">{order.symbol}</h3>
                    <span className={\`px-2 py-1 rounded-full text-xs font-bold \${order.type === 'buy' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}\`}>
                      {order.type.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">{order.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-lg">₦{order.price.toFixed(2)}</p>
                  <p className="text-sm text-gray-500">{order.quantity.toLocaleString()} shares</p>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
                <span className={\`px-3 py-1 rounded-full text-xs font-medium \${getStatusColor(order.status)}\`}>
                  {order.status.toUpperCase()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderBookScreen;`,

  'src/components/FundingScreen.tsx': `import React, { useState } from 'react';

const FundingScreen: React.FC = () => {
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);

  const quickAmounts = [10000, 50000, 100000, 500000];

  const handleFundAccount = () => {
    if (!amount || parseFloat(amount) <= 0) {
      alert('Please enter a valid amount');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      alert(\`Funding request of ₦\${parseFloat(amount).toLocaleString()} submitted successfully!\`);
      setLoading(false);
      setAmount('');
    }, 1500);
  };

  return (
    <div className="min-h-screen pb-20 bg-gray-50">
      <header className="p-6 pb-4 bg-white border-b border-gray-100">
        <h1 className="text-2xl font-bold text-primary-blue">Fund Account</h1>
        <p className="text-sm text-gray-500">Add money to your trading account</p>
      </header>

      <div className="p-6 space-y-6">
        <div className="p-6 rounded-xl card-shadow bg-gradient-to-r from-primary-blue to-blue-700 text-white">
          <p className="text-sm opacity-90">Available Balance</p>
          <h2 className="text-4xl font-bold mt-1">₦85,000.00</h2>
          <p className="text-sm opacity-80 mt-2">Last funding: ₦50,000 on Jan 10, 2024</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Amount to Fund (₦)
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-bold">₦</span>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              className="input-field pl-12"
            />
          </div>
          
          <div className="flex space-x-2 mt-3">
            {quickAmounts.map((quickAmount) => (
              <button
                key={quickAmount}
                onClick={() => setAmount(quickAmount.toString())}
                className="flex-1 py-2 text-sm bg-gray-100 rounded-lg hover:bg-gray-200 font-medium"
              >
                ₦{quickAmount.toLocaleString()}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleFundAccount}
          disabled={!amount || parseFloat(amount) <= 0 || loading}
          className="btn-primary w-full"
        >
          {loading ? 'Processing...' : 'Fund Account'}
        </button>

        <div className="mt-8">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Recent Transactions</h3>
          <div className="space-y-3">
            {[
              { id: 1, amount: 50000, method: 'Bank Transfer', status: 'Completed', date: 'Jan 10, 2024' },
              { id: 2, amount: 25000, method: 'Card', status: 'Completed', date: 'Jan 5, 2024' },
            ].map((transaction) => (
              <div key={transaction.id} className="p-4 bg-white rounded-xl card-shadow">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-bold text-gray-800">₦{transaction.amount.toLocaleString()}</p>
                    <p className="text-sm text-gray-500">{transaction.method}</p>
                  </div>
                  <div className="text-right">
                    <span className={\`px-3 py-1 rounded-full text-xs font-medium \${transaction.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}\`}>
                      {transaction.status}
                    </span>
                    <p className="text-sm text-gray-500 mt-1">{transaction.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FundingScreen;`,

  'src/components/BottomNavigation.tsx': `import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const BottomNavigation: React.FC = () => {
  const location = useLocation();
  
  const navItems = [
    { path: '/dashboard', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6', label: 'Home' },
    { path: '/market', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z', label: 'Market' },
    { path: '/trade', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z', label: 'Trade' },
    { path: '/portfolio', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2', label: 'Portfolio' },
    { path: '/funding', icon: 'M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z', label: 'Funding' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-2 z-50">
      <div className="flex justify-around items-center">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className="flex flex-col items-center px-2 py-1"
            >
              <div className={\`p-2 rounded-lg transition-colors \${isActive ? 'bg-blue-50 text-primary-blue' : 'text-gray-500 hover:text-primary-blue'}\`}>
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={isActive ? 2 : 1.5}
                    d={item.icon}
                  />
                </svg>
              </div>
              <span className={\`text-xs mt-1 font-medium \${isActive ? 'text-primary-blue' : 'text-gray-500'}\`}>
                {item.label}
              </span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNavigation;`
};

// Function to create files
function createFiles(basePath, files) {
  for (const [filePath, content] of Object.entries(files)) {
    const fullPath = path.join(basePath, filePath);
    const dir = path.dirname(fullPath);
    
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    fs.writeFileSync(fullPath, content);
    console.log(`✅ Created: ${filePath}`);
  }
}

// Create the components
createFiles('.', components);

console.log('\n✅ All missing components have been added!');
console.log('\n📋 Next, update App.tsx to include these components:');

console.log(`
Update your src/App.tsx to include these new routes:

1. Add these imports at the top:
   import Onboarding from './components/Onboarding';
   import MarketScreen from './components/MarketScreen';
   import PortfolioScreen from './components/PortfolioScreen';
   import TradeExecutionScreen from './components/TradeExecutionScreen';
   import OrderBookScreen from './components/OrderBookScreen';
   import FundingScreen from './components/FundingScreen';
   import BottomNavigation from './components/BottomNavigation';

2. Update AppRoutes function to include these routes:
   <Route path="/onboarding" element={<Onboarding />} />
   <Route path="/market" element={<MarketScreen />} />
   <Route path="/portfolio" element={<PortfolioScreen />} />
   <Route path="/trade" element={<TradeExecutionScreen />} />
   <Route path="/order-book" element={<OrderBookScreen />} />
   <Route path="/funding" element={<FundingScreen />} />

3. Add BottomNavigation inside AppRoutes after </Routes>:
   {user && <BottomNavigation />}
`);

console.log('\n🚀 Restart your development server after updating App.tsx:');
console.log('npm start');