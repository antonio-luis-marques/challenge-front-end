import React, { Dispatch, SetStateAction, createContext, useContext, useState } from 'react'

interface ModalType{
    setOpenModalCourse: Dispatch<SetStateAction<boolean>>
    setOpenModalEditProfile: Dispatch<SetStateAction<boolean>>
    openModalCourse: boolean,
    openModalEditProfile: boolean,
}

const ModalContext = createContext<ModalType>({
    openModalCourse: false,
    openModalEditProfile: false,
    setOpenModalCourse: () => true,
    setOpenModalEditProfile: () => true
})

export default function ModalProvider({children}:{children : React.ReactNode}) {
    const [openModalCourse, setOpenModalCourse] = useState(false)
    const [openModalEditProfile, setOpenModalEditProfile] = useState(false)

  return (
    <ModalContext.Provider value={{openModalCourse, openModalEditProfile, setOpenModalCourse, setOpenModalEditProfile}}>
      {children}
    </ModalContext.Provider>
  )
}

export const useModalContext = () => useContext(ModalContext);