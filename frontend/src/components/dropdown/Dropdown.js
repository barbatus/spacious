import styled from 'styled-components/macro';
import Select from 'react-select';

export const Dropdown = styled(Select)`
  width: 125px;
  height: 40px;
  border: 0;
  border-radius: 8px;
  font-weight: 600;
  appearance: none;

  background-color: #EAEAEB;

  .react-select__control {
    border: 0;
    background-color: transparent;
    box-shadow: none;
  }

  .react-select__indicator-separator {
    display: none;
  }

  .react-select__indicator {
    padding-left: 0;
  }
`;
