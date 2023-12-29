import { LabelFilter } from './Filter.styled';
import { useDispatch, useSelector } from 'react-redux';
import { setContactFilter } from '../../redux/filterSlice';

const Filter = () => {
  const dispatch = useDispatch();
  const filter = useSelector(state => state.filter);

  return (
    <LabelFilter>
      Find contacts by name
      <input
        type="text"
        name="filter"
        value={filter}
        onChange={e => dispatch(setContactFilter(e.currentTarget.value))}
      />
    </LabelFilter>
  );
};
export default Filter;
