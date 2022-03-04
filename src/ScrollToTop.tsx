import { useEffect } from 'react';
import { useLocation } from 'react-router';

interface IProps {
  children: React.ReactNode;
}

const ScrollToTop = ({ children }: IProps) => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return <>{children}</>;
};

export default ScrollToTop;
