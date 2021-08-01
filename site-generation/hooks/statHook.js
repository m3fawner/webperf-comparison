import {
  useContext, useState, useMemo, useEffect,
} from 'react';
import { ResultsContext } from './results';
import produceStatMapForResults from './produceStatMapForResults';

const useStatHook = (statFunction, formatter) => {
  const {
    data, loaded, failed,
  } = useContext(ResultsContext) ?? {};
  const [stats, setStats] = useState({});
  useEffect(() => {
    if (loaded && !failed) {
      setStats(produceStatMapForResults(statFunction, formatter, data));
    }
  }, [formatter, statFunction, loaded, failed, data]);
  return useMemo(() => ({
    loaded,
    failed,
    stats,
  }), [loaded, failed, stats]);
};
export default useStatHook;
