import React from 'react';
import { Box, Container, Typography, IconButton, Stack, Divider } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{ width: "100%", borderTop: '1px solid', borderColor: 'divider', py: 4 }}
    >
      <Container maxWidth="lg">
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          alignItems="center"
          justifyContent="space-between"
          spacing={2}
        >
          <Typography variant="body2" color="text.secondary">
            © {year} Narayana. All rights reserved.
          </Typography>

          <Stack direction="row" spacing={1}>
            <IconButton
              component="a"
              href="https://github.com/"
              target="_blank"
              rel="noopener noreferrer"
              size="small"
              aria-label="GitHub"
              sx={{ color: 'text.secondary', '&:hover': { color: 'text.primary' } }}
            >
              <GitHubIcon fontSize="small" />
            </IconButton>

            <IconButton
              component="a"
              href="https://linkedin.com/in/"
              target="_blank"
              rel="noopener noreferrer"
              size="small"
              aria-label="LinkedIn"
              sx={{ color: 'text.secondary', '&:hover': { color: 'text.primary' } }}
            >
              <LinkedInIcon fontSize="small" />
            </IconButton>

            <IconButton
              component="a"
              href="mailto:you@email.com"
              size="small"
              aria-label="Email"
              sx={{ color: 'text.secondary', '&:hover': { color: 'text.primary' } }}
            >
              <EmailIcon fontSize="small" />
            </IconButton>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;