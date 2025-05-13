import React from 'react'
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';


export default function Footer() {
  return (
    <footer className="bg-[#014421] text-slate-50 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          {/* Contato */}
          <div className="w-full md:w-1/3 p-4">
            <h2 className="text-lg font-semibold mb-4">Contacto</h2>
            <ul>
              <li className="flex items-center mb-2">
                <Mail className="mr-2" />
                <a href="mailto:contacto@gjungle.com">contacto@gjungle.com</a>
              </li>
              <li className="flex items-center mb-2">
                <Phone className="mr-2" />
                <a href="tel:+258820630317">820630317</a>
              </li>
              <li className="flex items-center mb-2">
                <MapPin className="mr-2" />
                <p>Endereco</p>
              </li>
            </ul>
          </div>

          {/* Redes Sociais */}
          <div className="w-full md:w-1/3 p-4">
            <h2 className="text-lg font-semibold mb-4">Redes Sociais</h2>
            <ul className="flex">
              <li className="mr-4">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                  <Facebook className="text-2xl" />
                </a>
              </li>
              <li className="mr-4">
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                  <Twitter className="text-2xl" />
                </a>
              </li>
              <li className="mr-4">
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                  <Instagram className="text-2xl" />
                </a>
              </li>
              <li>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="text-2xl" />
                </a>
              </li>
            </ul>
          </div>

          {/* Outras Informações */}
          <div className="w-full md:w-1/3 p-4">
            <h2 className="text-lg font-semibold mb-4">Outras Informações</h2>
            <ul>
              <li className="mb-2">
                <a href="#" className="hover:underline">Sobre Nós</a>
              </li>
              <li className="mb-2">
                <a href="#" className="hover:underline">Perguntas Frequentes</a>
              </li>
              <li className="mb-2">
                <a href="#" className="hover:underline">Termos de Serviço</a>
              </li>
              <li>
                <a href="#" className="hover:underline">Política de Privacidade</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-700 mt-8 pt-4 text-center">
          <p>&copy; 2025 GJungle. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
