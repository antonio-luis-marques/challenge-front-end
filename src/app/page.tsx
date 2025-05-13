'use client'



import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import Course from "@/components/Course/Course";
import IntroCard from '@/components/Introduction/IntroCard';
import CourseCategories from "@/components/Category/CourseCategories";
import Benefits from "@/components/Benefits/Benefits";
import GraduatesSlider from "@/components/Graduate/Graduates";



export default function Home() {

  return (

    <div className="w-full">
      <Header />
      <IntroCard />
      <div className="pb-10 space-y-8" id="vamosla">
        <div className=" space-y-8 pt-8 px-4 lg:px-24">
          <CourseCategories />
          <div className="flex justify-center ">
            <Course />
          </div>
        </div>
        <Benefits />
        <GraduatesSlider/>
      </div>
      <Footer />
    </div >

  );
}
