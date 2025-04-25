import React, { Dispatch, SetStateAction, createContext, useContext, useState } from 'react'

interface TypeIdCourse {
    setIdCourse: Dispatch<SetStateAction<string>>,
    idCourse: string,
}
const IdCourseContext = createContext<TypeIdCourse>({
    idCourse: '',
    setIdCourse: () => '',
});


export default function IdCourseProvider({ children }: { children: React.ReactNode }) {
    const [idCourse, setIdCourse] = useState('')
    return (
        <IdCourseContext.Provider value={{idCourse, setIdCourse}}>
            {children}
        </IdCourseContext.Provider>
    )
}

export const useContextIdCourse = () => useContext(IdCourseContext)