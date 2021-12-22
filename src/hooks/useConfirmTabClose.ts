import { useEffect } from 'react';

export default function useConfirmTabClose(): void {
  const confirmationMessage = 'You have unsaved changes. Continue?';

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      // eslint-disable-next-line no-param-reassign
      event.returnValue = confirmationMessage;
      return confirmationMessage;
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, []);
}
