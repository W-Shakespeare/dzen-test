import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux';

export const useTypedDispatch = () => useDispatch<AppDispatch>();
