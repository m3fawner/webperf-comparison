import {
  useEffect, useState, createContext, useMemo,
} from 'react';

export const ResultsContext = createContext();
const useResults = () => {
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [currentResults, setCurrentResults] = useState();
  useEffect(() => {
    const loadResults = async () => {
      try {
        setCurrentResults(await import('../../results.json'));
      } catch {
        setFailed(true);
      }
      setLoaded(true);
    };
    loadResults();
  }, []);
  return useMemo(() => ({
    ...currentResults,
    failed,
    loaded,
  }), [currentResults, failed, loaded]);
};
export default useResults;
