import styled from '@emotion/styled';

export const Spinner: React.FC = () => (
  <SipnnerWrapper>
    <Sipnner />
  </SipnnerWrapper>
);

const SipnnerWrapper = styled.div`
  width: 100%;
  overflow: hidden;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Sipnner = styled.div`
  width: 48px;
  height: 48px;
  border: 5px solid #f0eefd;
  border-top: 5px solid #6558ef;
  border-radius: 50%;
  animation: spin 1s linear infinite;
`;
