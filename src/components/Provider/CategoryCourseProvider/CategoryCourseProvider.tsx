import React, { Dispatch, SetStateAction, createContext, useContext, useState } from 'react'

interface TypeIdCourse {
  setCategoryCourse: Dispatch<SetStateAction<string | null>>
  categoryCourse: string | null
}

const CategoryCourseContext = createContext<TypeIdCourse>({
  categoryCourse: null,
  setCategoryCourse: () => {},
})

export default function CategoryCourseProvider({ children }: { children: React.ReactNode }) {
  const [categoryCourse, setCategoryCourse] = useState<string | null>(null)

  return (
    <CategoryCourseContext.Provider value={{ categoryCourse, setCategoryCourse }}>
      {children}
    </CategoryCourseContext.Provider>
  )
}

export const useContextCategoryCourse = () => useContext(CategoryCourseContext)