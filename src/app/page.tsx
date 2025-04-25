'use client'



import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import SessionCourse from "@/components/ListCourses/ListCourses";
import { useState } from "react";
import JoinWhatsapp from "@/components/JoinWhatsapp/JoinWhatsapp";
import PopUpCourse from "@/components/Modal/Course";
import Course from "@/components/Course/Course";
import { useModalContext } from '@/components/Provider/ModalProvider/ModalProvider';
import IntroCard from '@/components/Introduction/IntroCard';



export default function Home() {
  const { openModalCourse, setOpenModalCourse } = useModalContext()


  return (

    <body className={`  w-full ` + ((openModalCourse) && ` overflow-hidden`)}>
      {openModalCourse && <PopUpCourse />}
          <Header />
          <IntroCard />
          <div className="pb-10" id="vamosla">
            <div className=" space-y-4 pt-8 px-4 lg:px-24">
              <p className=' uppercase font-medium px-2'>Cursos em destaque</p>
              <div className="flex justify-center ">
                <Course />
              </div>
            </div>
          </div>
          <JoinWhatsapp />
          <SessionCourse />
          <Footer />
    </body >

  );
}
