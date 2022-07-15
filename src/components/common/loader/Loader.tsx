import { TailSpin } from 'react-loader-spinner';
import { StyledFallBackContainer } from './Loader.styled';

export const Loader = () => {
  return (
    <StyledFallBackContainer>
      <TailSpin ariaLabel="loading-indicator" color="grey" />
    </StyledFallBackContainer>
  );
};
