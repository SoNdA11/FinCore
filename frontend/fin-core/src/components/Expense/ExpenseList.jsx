// Este componente React exibe uma lista detalhada de todas as despesas registradas pelo usuário.
// Ele também permite a exclusão e o download dos dados em formato Excel.

import React from 'react'
import { LuDownload } from 'react-icons/lu';
import TransactionInfoCard from '../Cards/TransactionInfoCard';
import moment from 'moment';

const ExpenseList = ({transactions, onDelete, onDownload}) => {
  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Todas as Despesas</h5>

        <button className="card-btn" onClick={onDownload}>
          <LuDownload className="text-base" /> Download
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2">
        {transactions?.map((expense) => (
          <TransactionInfoCard
            key={expense._id}
            title={expense.description} 
            categoryOrSource={expense.category} 
            icon={expense.icon}
            date={expense.date} 
            amount={expense.amount}
            type="expense"
            onDelete={() => onDelete(expense._id)}
          />
        ))}
      </div>
    </div>
  );
};

export default ExpenseList;