'use client';

import { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  Button,
  Avatar,
  Stack,
  Divider,
} from '@mui/material';
import { useRouter } from 'next/navigation';

type Question = {
  question: string;
  options: string[];
  answer: string;
};

const questions: Question[] = [
  {
    question: 'O que é um loop em programação?',
    options: [
      'Uma estrutura que repete instruções',
      'Um erro de sintaxe',
      'Uma função anônima',
      'Um tipo de dado',
    ],
    answer: 'Uma estrutura que repete instruções',
  },
  {
    question: 'Qual operador representa "diferente de" em JavaScript?',
    options: ['==', '!=', '=', '==='],
    answer: '!=',
  },
  {
    question: 'O que é um array?',
    options: [
      'Uma estrutura condicional',
      'Uma variável que armazena múltiplos valores',
      'Uma função',
      'Um tipo de loop',
    ],
    answer: 'Uma variável que armazena múltiplos valores',
  },
];

export default function EvaluationPage() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const router = useRouter();

  const handleNext = () => {
    if (selected === questions[current].answer) {
      setScore((prev) => prev + 1);
    }

    if (current + 1 < questions.length) {
      setCurrent((prev) => prev + 1);
      setSelected(null);
    } else {
      setFinished(true);
    }
  };

  const handleHome = () => {
    router.push('/');
  };

  const isApproved = (score / questions.length) >= 0.8;

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="#0A1E14"
      flexDirection="column"
      px={2}
    >
      {/* Cabeçalho */}
      <Stack direction="row" spacing={2} alignItems="center" mb={4}>
        <Avatar
          alt="Logo Jungle Mídia"
          src="logo.png"
          sx={{ width: 56, height: 56 }}
        />
        <Box>
          <Typography variant="h5" fontWeight="bold" color="white">
            Jungle Mídia
          </Typography>
          <Typography variant="subtitle2" color="#90A99F">
            Avaliação de Lógica de Programação
          </Typography>
        </Box>
      </Stack>

      {/* Card de pergunta ou resultado */}
      {!finished ? (
        <Card
          sx={{
            width: '100%',
            maxWidth: 600,
            p: 3,
            boxShadow: 4,
            bgcolor: '#122C22',
            color: 'white',
          }}
        >
          <CardContent>
            <Typography variant="subtitle1" color="#90A99F" mb={1}>
              Questão {current + 1} de {questions.length}
            </Typography>
            <Divider sx={{ mb: 2, bgcolor: '#1D3B30' }} />
            <Typography variant="h6" mb={3}>
              {questions[current].question}
            </Typography>
            <RadioGroup
              value={selected}
              onChange={(e) => setSelected(e.target.value)}
            >
              {questions[current].options.map((option, idx) => (
                <FormControlLabel
                  key={idx}
                  value={option}
                  control={<Radio sx={{ color: '#90A99F' }} />}
                  label={option}
                  sx={{ color: 'white' }}
                />
              ))}
            </RadioGroup>
            <Button
              variant="contained"
              fullWidth
              onClick={handleNext}
              sx={{
                mt: 3,
                bgcolor: '#00B67A',
                ':hover': { bgcolor: '#009F6A' },
              }}
              disabled={!selected}
            >
              Próximo
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card
          sx={{
            width: 400,
            p: 3,
            textAlign: 'center',
            boxShadow: 4,
            bgcolor: '#122C22',
            color: 'white',
          }}
        >
          <CardContent>
            <Typography variant="h5" fontWeight="bold" mb={2}>
              Avaliação Concluída!
            </Typography>
            <Typography variant="body1" mb={2}>
              Você acertou <strong>{score}</strong> de{' '}
              <strong>{questions.length}</strong> questões.
            </Typography>

            {isApproved ? (
              <Typography color="#00FF9C" fontWeight="bold" mb={2}>
                ✅ Parabéns! Você está aprovado para participar dos cursos da Jungle Mídia!
              </Typography>
            ) : (
              <Typography color="#FF7A7A" fontWeight="bold" mb={2}>
                ❌ Você não atingiu a pontuação mínima. Volte a tentar!
              </Typography>
            )}

            <Button
              variant="outlined"
              onClick={handleHome}
              sx={{
                color: '#00B67A',
                borderColor: '#00B67A',
                ':hover': {
                  borderColor: '#009F6A',
                  backgroundColor: 'rgba(0, 182, 122, 0.1)',
                },
              }}
            >
              Página Inicial
            </Button>
          </CardContent>
        </Card>
      )}
    </Box>
  );
}
