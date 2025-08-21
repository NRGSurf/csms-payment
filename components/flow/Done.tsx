import { Box, Typography } from "@mui/material";

export default function Done() {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Success
      </Typography>
      <Typography variant="body1" className="mb-2">
        Payment successful. Charging will start shortly. You’ll receive your
        invoice via email.
      </Typography>
      <Typography variant="body2" className="opacity-80">
        If you encounter any issues at the charger, please contact support.
      </Typography>
    </Box>
  );
}
