import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import ResponseEditor from './ResponseEditor';
import { ResponseProvider } from './ResponseContext';

export type MatchParams = { responseId: string };
type Props = RouteComponentProps<MatchParams>;

export default function ResponseModule({
  ...props
}: Props): React.ReactElement {
  return (
    <ResponseProvider {...props}>
      <ResponseEditor {...props} />
    </ResponseProvider>
  );
}
