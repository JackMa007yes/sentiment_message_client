import { TextField, TextFieldProps } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledTextField = styled(TextField)<TextFieldProps>(({ theme }) => ({
  color: theme.palette.success.main,
  '& .MuiInputBase-root': {
    backgroundColor: '#16171b',
    borderRadius: '16px',
    '&:hover fieldset': {
      borderColor: '#9c27b0'
    },
    '&:focus': {
      borderColor: '#9c27b0'
    }
  },
  '& input': {
    color: 'white',
    backgroundColor: '#16171b',
    borderRadius: '16px',
    boxShadow: '0 0 0 10px #16171b inset !important'
  },
  '& fieldset': {
    borderRadius: '16px',
    borderColor: '#16171b'
  }
}));

export default function CustomTextField({ ...props }) {
  return <StyledTextField {...props} />;
}
