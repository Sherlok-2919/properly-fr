'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { TransactionsTable } from "./tables";
import { TopComponents } from "./topcomponents";

const Transactions = () => {
  const router = useRouter();
  const [filters, setFilters] = useState<{
    fromDate: string;
    toDate: string;
    property: string[];
    transactionSource: string[];
    category: string[];
  }>({
    fromDate: "",
    toDate: "",
    property: [],
    transactionSource: [],
    category: [],
  });

  const handleAddIncomeExpenseClick = () => {
    router.push('/dashboard/ocr');
  };

  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
  };

  return (
    <div className="w-full px-6 py-2">
      <TopComponents onAddIncomeExpenseClick={handleAddIncomeExpenseClick} onFilterChange={handleFilterChange} />
      <TransactionsTable filters={filters} />
    </div>
  );
};

export default Transactions;