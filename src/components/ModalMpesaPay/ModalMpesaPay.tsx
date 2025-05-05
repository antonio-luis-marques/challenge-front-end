import { Box, Button, Modal, Typography, TextField, Stack } from '@mui/material';
import { useState } from 'react';

interface ModalPagamentoMpesaProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (phoneNumber: string) => void;
  courseName: string; // ✅ Novo prop
}

const ModalPagamentoMpesa = ({ open, onClose, onConfirm, courseName }: ModalPagamentoMpesaProps) => {
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleConfirm = () => {
    const isValid = /^8[2-7]\d{7}$/.test(phoneNumber); // Validação simples para Moçambique
    if (isValid) {
      onConfirm(phoneNumber);
    } else {
      alert('Por favor, insira um número válido (começando com 82 a 87 e com 9 dígitos).');
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
        <Typography variant="h6" mb={1} fontWeight={600}>
          Pagar curso de {courseName} via M-Pesa
        </Typography>

        <Typography variant="body2" color="text.secondary" mb={3}>
          Para continuar, insira seu número de telefone M-Pesa para processar o pagamento.
        </Typography>

        <Stack spacing={2}>
          <TextField
            label="Número M-Pesa"
            variant="outlined"
            placeholder="Ex: 84XXXXXXX"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            fullWidth
            inputProps={{ maxLength: 9 }}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#228B22',
                },
                '&:hover fieldset': {
                  borderColor: '#228B22',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#228B22',
                },
              },
              '& .MuiInputLabel-root': {
                color: 'grey',
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: '#228B22',
              },
            }}
          />

          <Box display="flex" justifyContent="space-between">
            <Button
              variant="outlined"
              onClick={onClose}
              sx={{
                color: '#228B22',
                borderColor: '#228B22',
                width: '48%',
                '&:hover': {
                  backgroundColor: '#228B22',
                  color: 'white',
                },
              }}
            >
              Cancelar
            </Button>

            <Button
              variant="contained"
              sx={{
                width: '48%',
                backgroundColor: '#228B22',
                '&:hover': {
                  backgroundColor: '#1e7a1e',
                },
              }}
              onClick={handleConfirm}
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