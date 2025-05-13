import React from 'react'
import Course from '../Course/Course'

export default function SeeToo() {

    return (
        <div className=" pb-10
        text-zinc-950 border-t -z-10 space-y-4 pt-8 px-4 lg:px-24">

            <div className="container space-y-4">
                <p className='px-2 uppercase font-medium flex items-center '>Cursos que pode gostar</p>

                <div className="flex justify-center">
                    <Course />
                </div>
            </div>
        </div>
    )
}
