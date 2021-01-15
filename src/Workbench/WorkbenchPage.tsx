import { ReactElement } from 'react';
import { Link } from 'react-router-dom';

export default function WorkbenchPage(): ReactElement {
  return (
    <>
      <p>WorkbenchPage</p>
      <Link to={'/'}>Root / (dev)</Link>
    </>
  );
}
