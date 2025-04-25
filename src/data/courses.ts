// /data/courses.ts
export type Lesson = {
    id: string;
    title: string;
    url: string;
    cover: string
  };
  
  export type Course = {
    id: string;
    title: string;
    author: string;
    description: string;
    playlist: Lesson[];
  };
  
  export const courses: Course[] = [
    {
      id: 'course-graphql',
      title: 'Curso de GraphQL',
      author: 'Pedro Tech',
      description: 'Entenda como usar GraphQL para buscar e manipular dados com eficiência.',
      playlist: [
        {
          id: 'graphql-1',
          title: 'What Is GraphQL?',
          url: 'https://res.cloudinary.com/dt0vpc25d/video/upload/v1745549197/mentorconnect/graphql/n5tumhpxudy5hsks8rtn.mp4',
          cover: 'https://res.cloudinary.com/dt0vpc25d/image/upload/v1745554439/mentorconnect/graphql/crnmbvast9wtvl9qx59u.png'
        },
        {
          id: 'graphql-2',
          title: 'Basic Types and Queries',
          url: 'https://res.cloudinary.com/dt0vpc25d/video/upload/v1745549296/mentorconnect/graphql/s1fbvnltv2n7bmrocahl.mp4',
          cover: 'https://res.cloudinary.com/dt0vpc25d/image/upload/v1745554439/mentorconnect/graphql/crnmbvast9wtvl9qx59u.png'
        },
        {
          id: 'graphql-3',
          title: 'GraphQL API With NodeJS and Apollo Server',
          url: 'https://res.cloudinary.com/dt0vpc25d/video/upload/v1745549302/mentorconnect/graphql/qp4wn5veykg1reac2jzw.mp4',
          cover: 'https://res.cloudinary.com/dt0vpc25d/image/upload/v1745554439/mentorconnect/graphql/crnmbvast9wtvl9qx59u.png'

        },
      ],
    },
    {
      id: 'course-array-methods',
      title: 'Array Methods em JavaScript',
      author: 'Florin Pop',
      description: 'Explore os métodos mais úteis dos arrays e como aplicá-los no dia a dia.',
      playlist: [
        {
          id: 'array-1',
          title: 'forEach',
          url: 'https://res.cloudinary.com/dt0vpc25d/video/upload/v1745523368/mentorconnect/array%20methods%20js/gs0lfrj3rad7ud7ezwh9.mp4',
          cover: 'https://res.cloudinary.com/dt0vpc25d/image/upload/v1745555556/mentorconnect/array%20methods%20js/ur0uqlivsiaobd9j4y6c.jpg'

        },
        {
          id: 'array-2',
          title: 'map',
          url: 'https://res.cloudinary.com/dt0vpc25d/video/upload/v1745523327/mentorconnect/array%20methods%20js/fyoeutxou00e9ihhqbnj.mp4',
          cover: 'https://res.cloudinary.com/dt0vpc25d/image/upload/v1745555556/mentorconnect/array%20methods%20js/ur0uqlivsiaobd9j4y6c.jpg'

        },
        {
          id: 'array-3',
          title: 'filter',
          url: 'https://res.cloudinary.com/dt0vpc25d/video/upload/v1745523428/mentorconnect/array%20methods%20js/rvvtf9vr6swx0hagsckh.mp4',
          cover: 'https://res.cloudinary.com/dt0vpc25d/image/upload/v1745555556/mentorconnect/array%20methods%20js/ur0uqlivsiaobd9j4y6c.jpg'

        },
      ],
    },
  ];
  