import React, { useState } from 'react';
import {
  Box,
  Grid,
  TextField,
  Button,
  Typography,
  Paper,
  Container,
  Alert,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import Footer from '../Footer';
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
const ContactForm = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const validate = () => {
    const newErrors = {};

    if (!form.name.trim()) newErrors.name = 'Name is required';

    if (!form.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!form.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (form.message.length < 10) {
      newErrors.message = 'Minimum 10 characters required';
    }

    return newErrors;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    // Clear field error on change
    if (errors[e.target.name]) {
      setErrors((prev) => ({ ...prev, [e.target.name]: undefined }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    try {
      setLoading(true);
      setSuccess(false);
      await new Promise((res) => setTimeout(res, 1000));
      setForm({ name: '', email: '', message: '' });
      setSuccess(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      component="section"
      id="contact"
      sx={{
        maxHeight: '100vh',
        height: "calc(100vh - 120px)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",  // ← was "center"
        alignItems: "center"
      }}
    >
      <Container maxWidth="lg" sx={{ flex: 1, display: "flex", alignItems: "center" }}>
        <Grid container spacing={4} alignItems="stretch">  {/* ← removed my: "auto" */}

          {/* LEFT — Lottie placeholder */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Box
              sx={{
                height: '100%',
                minHeight: { xs: 250, md: 400 },
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 2,
              }}
            >
              <DotLottieReact
                src="src/assets/Contact_Green.json"   // or "/assets/Developer_Yoga.lottie"
                loop
                autoplay
                style={{ width: '100%', height: '100%', maxWidth: '420px' }}
              />
            </Box>
          </Grid>

          {/* RIGHT — Form */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Paper
              elevation={0}
              sx={{
                height: '100%',
                p: { xs: 3, md: 5 },
                borderRadius: 2,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                border: '1px solid',
                borderColor: 'divider',
              }}
            >
              <Typography variant="h4" sx={{ fontWeight: 600, mb: 3 }}>
                Get in Touch
              </Typography>

              {success && (
                <Alert severity="success" sx={{ mb: 3 }}>
                  Message sent! I'll get back to you soon.
                </Alert>
              )}

              <Box component="form" onSubmit={handleSubmit} noValidate>
                <TextField
                  fullWidth
                  label="Full Name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  error={!!errors.name}
                  helperText={errors.name}
                  sx={{ mb: 3 }}
                />

                <TextField
                  fullWidth
                  label="Email Address"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  error={!!errors.email}
                  helperText={errors.email}
                  sx={{ mb: 3 }}
                />

                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label="Message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  error={!!errors.message}
                  helperText={errors.message}
                  sx={{ mb: 4 }}
                />

                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  endIcon={<SendIcon />}
                  disabled={loading}
                  fullWidth
                  sx={{
                    py: 1.5,
                    fontWeight: 600,
                    textTransform: 'none',
                  }}
                >
                  {loading ? 'Sending...' : 'Send Message'}
                </Button>
              </Box>
            </Paper>
          </Grid>

        </Grid>
      </Container>
      <Footer />
    </Box>
  );
};

export default ContactForm;