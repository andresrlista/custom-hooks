import React, { useEffect, useState } from 'react';

export const useFetch = (url) => {
  const [state, setState] = useState({
    data: [],
    isLoading: true,
    hasError: null,
  });

  const getQuotes = async (url) => {
    try {
      setState({ ...state, isLoading: true });
      const response = await fetch(url);
      const data = await response.json();

      setState({
        data,
        isLoading: false,
        hasError: null,
      });
    } catch (error) {
      setState({
        data: [],
        isLoading: false,
        hasError: error,
      });
    }
  };

  useEffect(() => {
    getQuotes(url);
  }, [url]);

  return {
    data: state.data,
    isLoading: state.isLoading,
    hasError: state.hasError,
  };
};
