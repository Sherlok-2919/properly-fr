import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Pencil } from "lucide-react";

// Helper function to parse dates and return UTC Date objects at midnight
const parseDate = (dateString: string): Date | null => {
  if (!dateString) return null;

  let formattedDateString = dateString;

  // Check for DD-MM-YYYY format and reformat to YYYY-MM-DD
  const dd_mm_yyyy_match = dateString.match(/^(\d{1,2})-(\d{1,2})-(\d{4})$/);
  if (dd_mm_yyyy_match) {
    const day = dd_mm_yyyy_match[1];
    const month = dd_mm_yyyy_match[2];
    const year = dd_mm_yyyy_match[3];
    formattedDateString = `${year}-${month}-${day}`;
  } else {
    // If not DD-MM-YYYY, assume it's already YYYY-MM-DD or attempt a direct parse
    // This handles input type="date" values (YYYY-MM-DD) directly.
    const yyyy_mm_dd_match = dateString.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
    if (!yyyy_mm_dd_match) {
      // Fallback for other formats - try to parse and then convert to UTC start of day
      try {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return null;
        return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
      } catch (e) {
        return null;
      }
    }
  }

  // Now, parse the consistent YYYY-MM-DD formatted string, explicitly forcing UTC
  try {
    const date = new Date(formattedDateString + 'T00:00:00Z'); // Append 'T00:00:00Z' to force UTC interpretation
    return isNaN(date.getTime()) ? null : date;
  } catch (e) {
    return null;
  }
};

export const TransactionsTable = ({ filters }: { filters: { fromDate: string; toDate: string; property: string[]; transactionSource: string[]; category: string[] } }) => {
  const transactions = [
    {
      propertyName: "53 (LOT 307) Salvatore",
      category: "Interest on Loan",
      transactionSource: "Bank Feed",
      propertyType: "Residential",
      date: "09-11-2025", // DD-MM-YYYY
      price: "$0.01",
    },
    {
      propertyName: "9 Sicilian Avenue",
      category: "Property Management Fees",
      transactionSource: "Rental Summary",
      propertyType: "Residential",
      date: "28-10-2025", // DD-MM-YYYY
      price: "$72.80",
    },
    {
      propertyName: "39 Sicilian Avenue",
      category: "Council rates",
      transactionSource: "Manual Entry",
      propertyType: "Residential",
      date: "12-07-2025", // DD-MM-YYYY
      price: "$504.97",
    },
    {
      propertyName: "78 Kapinka Parade",
      category: "Repairs & Maintenance",
      transactionSource: "Rental Summary",
      propertyType: "Residential",
      date: "07-01-2025", // DD-MM-YYYY
      price: "$98.00",
    },
    {
      propertyName: "2/33 Amy Street",
      category: "Rental Income",
      transactionSource: "Bank Feed",
      propertyType: "Residential",
      date: "26-05-2025", // DD-MM-YYYY
      price: "$1040.00",
    },
    {
      propertyName: "53 (LOT 307) Salvatore",
      category: "Property Management Fees",
      transactionSource: "Rental Summary",
      propertyType: "Residential",
      date: "17-11-2025", // DD-MM-YYYY
      price: "$72.80",
    },
  ];

  const filteredTransactions = transactions.filter((transaction) => {
    // Use the parseDate helper for all dates, ensuring UTC midnight
    const transactionDate = parseDate(transaction.date);
    const filterFromDate = parseDate(filters.fromDate);
    let filterToDate = parseDate(filters.toDate);

    if (!transactionDate) return false; // Skip if transaction date is invalid

    let fromDateMatch = true;
    if (filterFromDate) {
      fromDateMatch = transactionDate.getTime() >= filterFromDate.getTime();
    }

    let toDateMatch = true;
    if (filterToDate) {
      // To include the entire 'to date', we check against midnight of the next day (UTC)
      const filterToDatePlusOneDay = new Date(Date.UTC(
        filterToDate.getFullYear(),
        filterToDate.getMonth(),
        filterToDate.getDate() + 1
      ));
      toDateMatch = transactionDate.getTime() < filterToDatePlusOneDay.getTime();
    }

    // Normalize text fields for case-insensitive and space-trimmed comparison
    const transactionPropertyName = transaction.propertyName.toLowerCase().trim();
    const transactionSourceLower = transaction.transactionSource.toLowerCase().trim();
    const transactionCategoryLower = transaction.category.toLowerCase().trim();

    const filterPropertyLower = filters.property.map(p => p.toLowerCase().trim());
    const filterSourceLower = filters.transactionSource.map(s => s.toLowerCase().trim());
    const filterCategoryLower = filters.category.map(c => c.toLowerCase().trim());

    const propertyMatch = filterPropertyLower.length > 0
      ? filterPropertyLower.includes(transactionPropertyName)
      : true;
    const transactionSourceMatch = filterSourceLower.length > 0
      ? filterSourceLower.includes(transactionSourceLower)
      : true;
    const categoryMatch = filterCategoryLower.length > 0
      ? filterCategoryLower.includes(transactionCategoryLower)
      : true;

    return fromDateMatch && toDateMatch && propertyMatch && transactionSourceMatch && categoryMatch;
  });

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <Table>
        <TableHeader className="bg-gray-50">
          <TableRow>
            <TableHead className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Property Name</TableHead>
            <TableHead className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</TableHead>
            <TableHead className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transaction Source</TableHead>
            <TableHead className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Property Type</TableHead>
            <TableHead className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</TableHead>
            <TableHead className="py-3 px-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Price</TableHead>
            <TableHead className="py-3 px-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Edit/View</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="divide-y divide-gray-200">
          {filteredTransactions.map((transaction, index) => (
            <TableRow key={index} className="hover:bg-gray-50">
              <TableCell className="py-4 px-4 whitespace-nowrap text-sm font-medium text-gray-900">{transaction.propertyName}</TableCell>
              <TableCell className="py-4 px-4 whitespace-nowrap text-sm text-gray-500">{transaction.category}</TableCell>
              <TableCell className="py-4 px-4 whitespace-nowrap text-sm text-gray-500">{transaction.transactionSource}</TableCell>
              <TableCell className="py-4 px-4 whitespace-nowrap text-sm text-gray-500">{transaction.propertyType}</TableCell>
              <TableCell className="py-4 px-4 whitespace-nowrap text-sm text-gray-500">{transaction.date}</TableCell>
              <TableCell className="py-4 px-4 whitespace-nowrap text-sm text-gray-900 text-right">{transaction.price}</TableCell>
              <TableCell className="py-4 px-4 whitespace-nowrap text-right text-sm font-medium">
                <Button variant="outline" size="icon" className="h-8 w-8 text-blue-600 hover:text-blue-900 border-blue-200 hover:border-blue-400">
                  <Pencil className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex justify-between items-center mt-6 px-4 py-3 bg-gray-50 rounded-b-lg">
        <Button variant="outline" disabled className="text-gray-500 border-gray-300">
          <ArrowLeft className="h-4 w-4 mr-2" /> Previous
        </Button>
        <Button variant="outline" className="text-blue-600 border-blue-200 hover:border-blue-400">
          Next <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};