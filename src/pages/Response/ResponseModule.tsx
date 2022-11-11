import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import ResponseEditor from './ResponseEditor';
import { ProductIndexProvider } from '../../components/ProductIndexContext/ProductIndexContext';
import { ResponseProvider } from './ResponseContext';

export type MatchParams = { responseId: string };
type Props = RouteComponentProps<MatchParams>;

export default function ResponseModule({
  ...props
}: Props): React.ReactElement {
  return (
    <ResponseProvider {...props}>
      <ProductIndexProvider>
        <ResponseEditor {...props} />
      </ProductIndexProvider>
    </ResponseProvider>
  );
}
