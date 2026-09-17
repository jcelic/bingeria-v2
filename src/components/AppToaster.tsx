'use client';

import { useTheme } from '@/store/useTheme';
import { Toaster } from 'sonner';

const AppToaster = () => {
  const theme = useTheme((s) => s.theme);

  return (
    <Toaster
      theme={theme}
      position="top-center"
      toastOptions={{
        style: {
          width: 'max-content',
          maxWidth: 'calc(100vw - 32px)',
          left: '50%',
          right: 'auto',
          translate: '-50% 0',
          padding: '12px 16px',
          fontSize: '15px',
        },
      }}
    />
  );
};

export default AppToaster;
