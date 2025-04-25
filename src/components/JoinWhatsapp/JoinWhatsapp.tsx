import { Box, Typography, Button } from '@mui/material';
import { Cormorant_Garamond } from "next/font/google";

const cormorant_caramond = Cormorant_Garamond({ subsets: ["latin"], weight: ['400', '500', '600', '700'] });

export default function JoinWhatsapp() {

  return (
    <Box
      sx={{
        padding: 4,
        display: 'flex',
        justifyContent: 'center',
        flexDirection: { xs: 'column', lg: 'row' },
        alignItems: 'center',
        borderTop: '1px solid #e2e8f0',
        backgroundColor: '#014421',
        color: '#fff',
        zIndex: 10,
      }}
    >
      <Box
        sx={{
          position: 'relative',
          zIndex: 20,
          maxWidth: '11rem',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <img src="/wa.png" alt="Whatsapp Logo" style={{ maxHeight: '100%', maxWidth: '100%', width: 'auto' }} />
      </Box>

      <Box
        sx={{
          zIndex: 20,
          textAlign: 'center',
          width: { lg: '50%', xs: '100%' },
          paddingTop: 2,
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: '500' }}>Estamos no Whatsapp</Typography>

        <Box sx={{ marginTop: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
          <Typography className={cormorant_caramond.className} variant="body1" sx={{ maxWidth: '35rem' }}>
            Não perca a chance de ser um dos primeiros a explorar tudo o que a Waza tem a oferecer! E você pode ser o primeiro a saber sobre as novidades, promoções e muito mais.
          </Typography>
          <Typography className={cormorant_caramond.className} variant="body1" sx={{ maxWidth: '35rem' }}>
            Entre em nosso grupo exclusivo no WhatsApp para ficar por dentro de todas as novidades. É simples e rápido!
          </Typography>
          
          <Button
            variant="contained"
            sx={{
              marginTop: 2,
              backgroundColor: '#228B22',
              color: 'white',
              paddingX: 4,
              paddingY: 2,
              borderRadius: 9999,
              fontWeight: 600,
              '&:hover': {
                backgroundColor: '#014421',
                transition: 'background-color 0.3s ease',
              }
            }}
          >
            Junte-se à conversa
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
