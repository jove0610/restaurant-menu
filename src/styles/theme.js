import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: ['Poppins', 'arial', 'sans-serif'].join(','),
    body3: {
      fontWeight: 400,
      fontSize: '0.75rem',
      lineHeight: 1.35,
      letterSpacing: '0.01204em',
    },
  },
  components: {
    MuiFormLabel: {
      styleOverrides: {
        asterisk: {
          color: '#db3131',
        },
      },
    },
  },
});

export default theme;
