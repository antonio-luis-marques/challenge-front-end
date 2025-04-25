'use client'

import { AuthProvider } from "../AuthProvider/AuthProvider";
import IdCourseProvider from "../IdCourseProvider/IdCourseProvider";
import ModalProvider from "../ModalProvider/ModalProvider";


export const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
    

    return (
        <AuthProvider>
            <ModalProvider >
                <IdCourseProvider>
                    {children}
                </IdCourseProvider>
            </ModalProvider>
        </AuthProvider>
    );
};

