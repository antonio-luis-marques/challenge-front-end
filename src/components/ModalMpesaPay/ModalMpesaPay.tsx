import { Box, Button, Modal, Typography, TextField, Stack } from '@mui/material';
import { useState } from 'react';

interface ModalPagamentoMpesaProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (phoneNumber: string) => void;
}

const ModalPagamentoMpesa = ({ open, onClose, onConfirm }: ModalPagamentoMpesaProps) => {
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleConfirm = () => {
    if (phoneNumber) {
      onConfirm(phoneNumber);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" mb={2}>
          Pagamento via M-Pesa
        </Typography>

        <Typography variant="body2" color="text.secondary" mb={3}>
          Insira seu número M-Pesa para realizar o pagamento.
        </Typography>

        <Stack spacing={2}>
          {/* Agora também muda o label */}
          <TextField
            label="Número de Telefone"
            variant="outlined"
            placeholder="Ex: 84XXXXXXX"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            fullWidth
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#228B22',  // Cor da borda normal
                  borderWidth: 1,          // Espessura da borda
                },
                '&:hover fieldset': {
                  borderColor: '#228B22',  // Cor da borda no hover
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#228B22',  // Cor da borda no foco
                  borderWidth: 1,          // Mantém a mesma espessura no foco
                },
                '& input': {
                  padding: '8px 12px',  // Ajuste para reduzir a altura do input
                },
              },
              '& label': {
                color: 'grey',  // Cor do label normal
                lineHeight: 1,  // Controla a altura da linha para centralizar o label
              },
              '& label.Mui-focused': {
                color: '#228B22',  // Cor do label no foco
              },
              '& input::placeholder': {
                color: 'grey',  // Cor do placeholder normal
                opacity: 1,
              },
              // Ajuste adicional para garantir que o label esteja centrado
              '& .MuiInputLabel-root': {
                transform: 'translate(14px, 10px) scale(1)',  // Ajuste da posição vertical
              },
              '& .MuiInputLabel-root.Mui-focused': {
                transform: 'translate(14px, -8px) scale(0.75)',  // Foco no label
              },
            }}
          />

          <Box display="flex" justifyContent="space-between" mt={2}>
            <Button
              variant="outlined"
              onClick={onClose}
              sx={{
                color: 'green',
                borderColor: 'green',
                backgroundColor: 'white',
                width: '48%',
                '&:hover': {
                  backgroundColor: 'green',
                  color: 'white',
                  borderColor: 'green',
                },
              }}
            >
              Cancelar
            </Button>

            <Button
              variant="contained"
              color="success"
              onClick={handleConfirm}
              sx={{ width: '48%' }}
            >
              Confirmar
            </Button>
          </Box>
        </Stack>
      </Box>
    </Modal>
  );
};

export default ModalPagamentoMpesa;
