import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  up: boolean;
  isFavorite: boolean;
}

interface MarketContextType {
  stocks: Stock[];
  watchlist: Stock[];
  toggleFavorite: (symbol: string) => void;
}

const MarketContext = createContext<MarketContextType | undefined>(undefined);

export const useMarket = () => {
  const context = useContext(MarketContext);
  if (!context) {
    throw new Error('useMarket must be used within a MarketProvider');
  }
  return context;
};

const INITIAL_STOCKS: Stock[] = [
  { symbol: 'MTNN', name: 'MTN Nigeria', price: 245.50, change: -0.85, up: false, isFavorite: true },
  { symbol: 'ZENITHBANK', name: 'Zenith Bank Plc', price: 35.20, change: 4.46, up: true, isFavorite: true },
  { symbol: 'GUARANTY', name: 'GT Bank', price: 32.50, change: 3.25, up: true, isFavorite: false },
  { symbol: 'ACCESS', name: 'Access Bank', price: 18.75, change: 2.85, up: true, isFavorite: false },
  { symbol: 'DANGCEM', name: 'Dangote Cement', price: 450.00, change: -1.10, up: false, isFavorite: true },
  { symbol: 'UBA', name: 'United Bank for Africa', price: 15.40, change: 1.50, up: true, isFavorite: false },
  { symbol: 'SEPLAT', name: 'Seplat Energy', price: 1200.00, change: 5.00, up: true, isFavorite: false },
  { symbol: 'FBNH', name: 'First Bank Holdings', price: 22.15, change: -1.20, up: false, isFavorite: false },
];

export const MarketProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [stocks, setStocks] = useState<Stock[]>(INITIAL_STOCKS);

  useEffect(() => {
    loadWatchlist();
  }, []);

  const loadWatchlist = async () => {
    try {
      const stored = await AsyncStorage.getItem('watchlist');
      if (stored) {
        const favoriteSymbols = JSON.parse(stored);
        setStocks(prev => prev.map(s => ({
          ...s,
          isFavorite: favoriteSymbols.includes(s.symbol)
        })));
      }
    } catch (e) {
      console.error('Failed to load watchlist', e);
    }
  };

  const toggleFavorite = async (symbol: string) => {
    setStocks(prev => {
      const updated = prev.map(s => s.symbol === symbol ? { ...s, isFavorite: !s.isFavorite } : s);
      const favoriteSymbols = updated.filter(s => s.isFavorite).map(s => s.symbol);
      AsyncStorage.setItem('watchlist', JSON.stringify(favoriteSymbols));
      return updated;
    });
  };

  const watchlist = stocks.filter(s => s.isFavorite);

  return (
    <MarketContext.Provider value={{ stocks, watchlist, toggleFavorite }}>
      {children}
    </MarketContext.Provider>
  );
};
