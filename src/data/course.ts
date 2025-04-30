import { Course } from "@/models/course";

export const courses: Course[] = [
  {
    id: 'course001',
    title: 'Fundamentos do React',
    description: 'Aprenda os conceitos básicos do React, incluindo componentes, estados e props.',
    category: 'Frontend',
    isFree: false,
    price: 199.90,
    instructor: 'João Silva',
    introVideo: {
      id: 'intro001',
      title: 'Introdução ao Curso de React',
      videoUrl: 'https://res.cloudinary.com/dt0vpc25d/video/upload/v1745549197/mentorconnect/graphql/n5tumhpxudy5hsks8rtn.mp4',
      description: 'Conheça o conteúdo que será abordado neste curso de React.',
      durationInSeconds: 300,
      isFree: true,
    },
    modules: [
      {
        id: 'mod001',
        title: 'Introdução ao React',
        order: 1,
        videos: [
          {
            id: 'vid001',
            title: 'O que é React?',
            videoUrl: 'https://res.cloudinary.com/dt0vpc25d/video/upload/v1745523368/mentorconnect/array%20methods%20js/gs0lfrj3rad7ud7ezwh9.mp4',
            description: 'Apresentação geral do React e suas vantagens.',
            durationInSeconds: 600,
            order: 1,
            isFree: false,
          },
          {
            id: 'vid002',
            title: 'Instalando o ambiente',
            videoUrl: 'https://res.cloudinary.com/dt0vpc25d/video/upload/v1745549197/mentorconnect/graphql/n5tumhpxudy5hsks8rtn.mp4',
            durationInSeconds: 480,
            order: 2,
            isFree: false,
          },
        ],
      },
      {
        id: 'mod002',
        title: 'Componentes e Props',
        order: 2,
        videos: [
          {
            id: 'vid003',
            title: 'Criando componentes',
            videoUrl: 'https://res.cloudinary.com/dt0vpc25d/video/upload/v1745549197/mentorconnect/graphql/n5tumhpxudy5hsks8rtn.mp4',
            durationInSeconds: 720,
            order: 1,
            isFree: false,
          },
        ],
      },
    ],
  },
  {
    id: 'course002',
    title: 'Marketing Digital Essencial',
    description: 'Aprenda as principais estratégias de marketing digital para alavancar negócios online.',
    category: 'Backend',
    isFree: false,
    price: 199.90,
    instructor: 'Maria Oliveira',
    introVideo: {
      id: 'intro002',
      title: 'Apresentação do Curso de Marketing Digital',
      videoUrl: 'https://res.cloudinary.com/dt0vpc25d/video/upload/v1745549197/mentorconnect/graphql/n5tumhpxudy5hsks8rtn.mp4',
      description: 'Uma visão geral sobre os tópicos de marketing digital que serão estudados.',
      durationInSeconds: 280,
      isFree: true,
    },
    modules: [
      {
        id: 'mod101',
        title: 'Fundamentos do Marketing Digital',
        order: 1,
        videos: [
          {
            id: 'vid101',
            title: 'O que é Marketing Digital?',
            videoUrl: 'https://res.cloudinary.com/dt0vpc25d/video/upload/v1745549197/mentorconnect/graphql/n5tumhpxudy5hsks8rtn.mp4',
            durationInSeconds: 550,
            order: 1,
            isFree: false,
          },
          {
            id: 'vid102',
            title: 'Canais de marketing',
            videoUrl: 'https://res.cloudinary.com/dt0vpc25d/video/upload/v1745549197/mentorconnect/graphql/n5tumhpxudy5hsks8rtn.mp4',
            durationInSeconds: 630,
            order: 2,
            isFree: false,
          },
        ],
      },
      {
        id: 'mod102',
        title: 'Redes Sociais',
        order: 2,
        videos: [
          {
            id: 'vid103',
            title: 'Facebook e Instagram Ads',
            videoUrl: 'https://res.cloudinary.com/dt0vpc25d/video/upload/v1745549197/mentorconnect/graphql/n5tumhpxudy5hsks8rtn.mp4',
            durationInSeconds: 700,
            order: 1,
            isFree: false,
          },
        ],
      },
    ],
  },
];
