import { Box, Button, Modal, Typography, RadioGroup, FormControlLabel, Radio, Stack } from '@mui/material';
import { useState } from 'react';

interface ModalQuizProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const questions = [
  {
    question: 'Qual palavra-chave é usada para criar uma nova classe em Java?',
    options: ['function', 'define', 'class', 'new'],
    correctAnswer: 'class',
  },
  {
    question: 'Qual é o tipo de dado usado para números inteiros em Java?',
    options: ['float', 'String', 'boolean', 'int'],
    correctAnswer: 'int',
  },
  {
    question: 'Como chamamos o processo de criar uma nova instância de um objeto?',
    options: ['Instalar', 'Instanciar', 'Implementar', 'Inicializar'],
    correctAnswer: 'Instanciar',
  },
  {
    question: 'Qual é o método principal de execução em um programa Java?',
    options: ['start()', 'execute()', 'main()', 'run()'],
    correctAnswer: 'main()',
  },
  {
    question: 'Qual operador é usado para comparar dois valores em Java?',
    options: ['=', '==', '!=', '==='],
    correctAnswer: '==',
  },
];

const ModalQuiz = ({ open, onClose, onSuccess }: ModalQuizProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = () => {
    const currentQuestion = questions[currentQuestionIndex];

    if (selectedOption === currentQuestion.correctAnswer) {
      setError(null);
      if (currentQuestionIndex === questions.length - 1) {
        onSuccess();
      } else {
        setCurrentQuestionIndex((prev) => prev + 1);
        setSelectedOption('');
      }
    } else {
      setError('Resposta incorreta. Tente novamente.');
    }
  };

  const currentQuestion = questions[currentQuestionIndex];

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
        <Typography variant="h6" component="h2" gutterBottom>
          Quiz - Conhecimentos básicos de Java
        </Typography>

        {/* Número da questão */}
        <Typography variant="body2" color="text.secondary" mb={1}>
          {currentQuestionIndex + 1}/{questions.length}
        </Typography>

        <Typography variant="body1" mb={2}>
          {questions[currentQuestionIndex].question}
        </Typography>

        <RadioGroup
          value={selectedOption}
          onChange={(e) => setSelectedOption(e.target.value)}
        >
          {questions[currentQuestionIndex].options.map((option, idx) => (
            <FormControlLabel
              key={idx}
              value={option}
              control={<Radio 
                sx={{
                  '&.Mui-checked': {
                    color: '#228B22', // Cor verde quando selecionado
                  }
                }}
              />}
              label={option}
            />
          ))}
        </RadioGroup>

        {error && (
          <Typography variant="body2" color="error" mt={2}>
            {error}
          </Typography>
        )}

        <Stack  display="flex" direction="row" justifyContent="space-between" spacing={2} mt={3}>
          <Button
            variant="outlined"
            style={{ borderColor: '#228B22', color: '#228B22' }} // Borda e texto #1e293b para o botão "Cancelar"
            onClick={onClose}
          >
            Cancelar
          </Button>
          <Button
            variant="contained"
            style={{ backgroundColor: '#228B22', color: 'white' }} // Cor de fundo #1e293b para o botão "Responder"
            onClick={handleSubmit}
          >
            Responder
          </Button>
        </Stack>

      </Box>
    </Modal>
  );
};

export default ModalQuiz;