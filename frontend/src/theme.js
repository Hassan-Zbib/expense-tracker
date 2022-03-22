import { createTheme } from "@mui/material/styles"
import { deepPurple, amber } from "@mui/material/colors"

const theme = createTheme({
  palette: {
    primary: {
      main: deepPurple[500],
    },
    secondary: {
      main: amber[500],
      contrastText: deepPurple[900],
    },
    background: {
      main: "#23242A",
      contrastText: "white",
    },
  },
})

theme.components = {
  MuiButton: {
    styleOverrides: {
      root: {
        borderRadius: "15px",
        textTransform: "none",
      },
      // containedPrimary: {
      //   "&:hover": {
      //     backgroundColor: theme.palette.secondary.main,
      //     color: theme.palette.primary.dark,
      //   },
      // },
      // containedSecondary: {
      //     fontWeight: 700,
      // },
    },
    defaultProps: {
      disableFocusRipple: false,
      fullWidth: true,
      size: "large",
    },
  },
  MuiTooltip: {
    styleOverrides: {
      tooltip: {
        backgroundColor: "#fff",
        border: `2px solid ${theme.palette.primary.main}`,
        color: theme.palette.primary.main,
      },
      arrow: {
        color: theme.palette.primary.main,
      },
    },
    defaultProps: {
      arrow: true,
    },
  },
  MuiInputLabel: {
    styleOverrides: {
      root: {
        textTransform: "none",
        fontSize: "1.1rem",
      },
    },
    defaultProps: {
      shrink: true,
    },
  },
  MuiOutlinedInput: {
    styleOverrides: {
      root: {
        borderRadius: '15px'
      }
    },
    defaultProps: {
      notched: true
    }
  },
  MuiInput: {
    styleOverrides: {
      root: {
        top: theme.spacing(2),
        border: `1px solid ${theme.palette.background.main[900]}`,
        outline: `1px solid transparent`,
        padding: theme.spacing(1),
        "&$focused": {
          border: `1px solid ${theme.palette.primary.main}`,
          outline: `1px solid ${theme.palette.primary.main}`,
        },
      },
    },
    defaultProps: {},
  },
  MuiDivider: {
    styleOverrides: {
      root: {
        margin: '20px 0',
      }
    },
    defaultProps: {
      variant: 'middle'
    },
  },
  MuiTextField: {
    styleOverrides: {},
    defaultProps: {
      size: 'medium',
      multiline: true,
      maxRows: '2',
    }
  }
}

export default theme
