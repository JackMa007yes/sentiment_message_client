import { useAuth } from '@/hooks/useAuth';
import { Box, Fade, Modal, Typography, Button } from '@mui/material';

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 320,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  color: 'white'
};

type Props = {
  open: boolean;
  onClose: () => void;
};
export default function LogoutModal({ open, onClose }: Props) {
  const { logout } = useAuth();

  return (
    <Modal
      aria-labelledby='transition-modal-title'
      aria-describedby='transition-modal-description'
      open={open}
      onClose={onClose}
      closeAfterTransition
      slotProps={{
        backdrop: {
          timeout: 500
        }
      }}
    >
      <Fade in={open}>
        <Box sx={style}>
          <Typography variant='h6' component='h4'>
            Are you sure you want to log out?
          </Typography>
          <section className='flex justify-between mt-4 px-6'>
            <Button
              size='large'
              variant='outlined'
              onClick={() => {
                logout();
                onClose();
              }}
            >
              YES
            </Button>
            <Button size='large' variant='contained' onClick={onClose}>
              NO
            </Button>
          </section>
        </Box>
      </Fade>
    </Modal>
  );
}
