'use client'

import React, { useEffect } from 'react'
import Footer from '@/components/Footer/Footer'
import Header from '@/components/Header/Header'
import DetailCourse from '@/components/DetailCourse/DetailCourse'
import SeeToo from '@/components/SeeToo/SeeToo'
import PopUpCourse from '@/components/Modal/Course'
import { useSearchParams } from 'next/navigation'
import { useModalContext } from '@/components/Provider/ModalProvider/ModalProvider'

export default function CourseDescription() {
  const searchParams = useSearchParams()
  const id = searchParams.get("id")

  const { openModalCourse, openModalEditProfile, setOpenModalCourse } = useModalContext()

  useEffect(() => {
    setOpenModalCourse(false)
  }, [])

  if (!id) {
    return (
      <div className="text-center p-20 text-xl font-semibold">
        Nenhum curso foi selecionado.
      </div>
    )
  }

  return (
    <div className={openModalCourse || openModalEditProfile ? 'overflow-hidden' : ''}>
      {openModalCourse && <PopUpCourse />}
      <div>
        <Header />
        <DetailCourse id={id} />
        <SeeToo />
        <Footer />
      </div>
    </div>
  )
}
