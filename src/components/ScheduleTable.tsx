import React, { useState } from 'react';

const DADOS_FICTICIOS = [
  { id: 1, data: '04-04-2024', motorista: 'João', cliente: 'Maria' },
  { id: 2, data: '04-04-2024', motorista: 'Pedro', cliente: 'José' },
  { id: 3, data: '04-04-2024', motorista: 'Ana', cliente: 'Carlos' },
];

const Tabela = () => {
  const [registros, setRegistros] = useState(DADOS_FICTICIOS);

  const removerRegistro = (id) => {
    setRegistros(registros.filter(registro => registro.id !== id));
  };

  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data</th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Motorista</th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cliente</th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {registros.map(registro => (
          <tr key={registro.id}>
            <td className="px-6 py-4 whitespace-nowrap">{registro.id}</td>
            <td className="px-6 py-4 whitespace-nowrap">{registro.data}</td>
            <td className="px-6 py-4 whitespace-nowrap">{registro.motorista}</td>
            <td className="px-6 py-4 whitespace-nowrap">{registro.cliente}</td>
            <td className="px-6 py-4 whitespace-nowrap">
              <button onClick={() => removerRegistro(registro.id)} className="text-red-600 hover:text-red-900">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Tabela;
