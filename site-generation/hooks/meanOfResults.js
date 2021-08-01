import { mean } from 'd3-array';
import { format } from 'd3-format';
import useStatHook from './statHook';

const formatter = format('0.4r');
const useMeanOfResults = () => useStatHook(mean, formatter);
export default useMeanOfResults;
