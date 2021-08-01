import { format } from 'd3-format';
import { deviation } from 'd3-array';
import useStatHook from './statHook';

const formatter = format('0.4r');
const useStandardDeviationOfResults = () => useStatHook(deviation, formatter);
export default useStandardDeviationOfResults;
