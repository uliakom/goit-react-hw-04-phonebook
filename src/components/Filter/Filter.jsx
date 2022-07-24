import PropTypes from 'prop-types';
import { Container } from './Filter.styled';

const Filter = ({ value, onChange }) => {
  return (
    <Container>
      <label>
        Find contacts by name
        <input type="text" name="filter" value={value} onChange={onChange} />
      </label>
    </Container>
  );
};

export default Filter;

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
