import { Alert, AlertTitle, Stack } from '@mui/material';
import type { FC, ReactNode } from 'react';

type OverlayAlertProps = {
  enabled: boolean;
  severity: 'error' | 'warning' | 'info' | 'success';
  text: string | ReactNode;
  offset?: [number, number, number, number]; // [left, top, right, bottom]
};

export const OverlayAlert: FC<OverlayAlertProps> = ({
  enabled,
  severity,
  text,
  offset,
}) => {
  if (!enabled) return null;

  const [left, top, right, bottom] = offset ?? [0, 0, 0, 0];

  return (
    <Stack
      position="absolute"
      sx={{ inset: 0 }}
      justifyContent="center"
      alignItems="center"
    >
      <Alert
        severity={severity}
        sx={{
          border: (t) => `1px solid ${t.palette[severity].main}`,
          position: 'relative',
          left,
          top,
          right,
          bottom,
        }}
      >
        <AlertTitle>{text}</AlertTitle>
      </Alert>
    </Stack>
  );
};
