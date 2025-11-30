'use client';
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarIcon } from "lucide-react";

export const TopComponents = ({
  onAddIncomeExpenseClick,
  onFilterChange,
}: {
  onAddIncomeExpenseClick: () => void;
  onFilterChange: (filters: { fromDate: string; toDate: string; property: string[]; transactionSource: string[]; category: string[] }) => void;
}) => {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [property, setProperty] = useState<string[]>([]);
  const [transactionSource, setTransactionSource] = useState<string[]>([]);
  const [category, setCategory] = useState<string[]>([]);

  // debounce ref
  const debounceRef = useRef<number | null>(null);

  const handleReset = () => {
    setFromDate("");
    setToDate("");
    setProperty([]);
    setTransactionSource([]);
    setCategory([]);
    // call parent immediately on reset
    onFilterChange({ fromDate: "", toDate: "", property: [], transactionSource: [], category: [] });
  };

  // date validation helper
  const datesValid = (from: string, to: string) => {
    if (!from || !to) return true; // treat empty as valid (unbounded)
    return new Date(to) <= new Date(from);
  };

  // central effect: whenever any filter changes, call onFilterChange (debounced)
  useEffect(() => {
    if (!datesValid(fromDate, toDate)) {
      // Optionally you could surface an error state here instead of calling parent
      console.warn("From date is after To date — not applying filters.");
      return;
    }

    // debounce calls to onFilterChange
    if (debounceRef.current) {
      window.clearTimeout(debounceRef.current);
    }
    debounceRef.current = window.setTimeout(() => {
      onFilterChange({
        fromDate,
        toDate,
        property,
        transactionSource,
        category,
      });
    }, 300);

    // cleanup on unmount
    return () => {
      if (debounceRef.current) {
        window.clearTimeout(debounceRef.current);
      }
    };
  }, [fromDate, toDate, property, transactionSource, category, onFilterChange]);

  // NOTE: *UI multi-select behavior* below is unchanged from your code but you'll likely want to replace it
  // with a true multi-select (checkboxes inside a popover) so selecting multiple items is possible.

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Transactions</h1>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white" onClick={onAddIncomeExpenseClick}>
          + Add Income / Expense
        </Button>
      </div>
      <p className="text-gray-500 mb-4">List of all the transactions</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end px-3 py-2 rounded-lg">
        <div>
          <label className="block text-sm font-medium text-gray-700">From Date</label>
          <div className="relative mt-1">
            <Input
              type="date"
              className="pr-8"
              value={fromDate}
              onChange={(e) => {
                setFromDate(e.target.value);
                onFilterChange({
                  fromDate: e.target.value,
                  toDate,
                  property,
                  transactionSource,
                  category,
                });
                console.log("Filter Change (From Date):", {
                  fromDate: e.target.value,
                  toDate,
                  property,
                  transactionSource,
                  category,
                });
              }}
            />
            <CalendarIcon className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">To Date</label>
          <div className="relative mt-1">
            <Input
              type="date"
              className="pr-8"
              value={toDate}
              onChange={(e) => {
                setToDate(e.target.value);
                onFilterChange({
                  fromDate,
                  toDate: e.target.value,
                  property,
                  transactionSource,
                  category,
                });
                console.log("Filter Change (To Date):", {
                  fromDate,
                  toDate: e.target.value,
                  property,
                  transactionSource,
                  category,
                });
              }}
            />
            <CalendarIcon className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Property</label>
          <Select
            value={property.length === 0 ? "" : property.join(',')}
            onValueChange={(selectedValue) => {
              let newProperty: string[];
              if (selectedValue === "all") {
                newProperty = [];
              } else {
                const isSelected = property.includes(selectedValue);
                newProperty = isSelected
                  ? property.filter((item) => item !== selectedValue)
                  : [...property, selectedValue];
              }
              setProperty(newProperty);
              onFilterChange({
                fromDate,
                toDate,
                property: newProperty,
                transactionSource,
                category,
              });
              console.log("Filter Change (Property):", {
                fromDate,
                toDate,
                property: newProperty,
                transactionSource,
                category,
              });
            }}
          >
            <SelectTrigger className="w-full mt-1">
              <SelectValue>
                {property.length === 0
                  ? "-- All Property --"
                  : property.length === 1
                  ? property[0]
                  : +`${property.length} Properties`}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">-- All Property --</SelectItem>
              <div className="px-2 py-1.5 text-sm font-semibold text-muted-foreground">Properties</div>
              <SelectItem value="53 (LOT 307) Salvatore">53 (LOT 307) Salvatore</SelectItem>
              <SelectItem value="9 Sicilian Avenue">9 Sicilian Avenue</SelectItem>
              <SelectItem value="39 Sicilian Avenue">39 Sicilian Avenue</SelectItem>
              <SelectItem value="78 Kapinka Parade">78 Kapinka Parade</SelectItem>
              <SelectItem value="2/33 Amy Street">2/33 Amy Street</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Transaction Source</label>
          <Select
            value={transactionSource.length === 0 ? "" : transactionSource.join(',')}
            onValueChange={(selectedValue) => {
              let newSource: string[];
              if (selectedValue === "all") {
                newSource = [];
              }
              else {
                const isSelected = transactionSource.includes(selectedValue);
                newSource = isSelected
                  ? transactionSource.filter((item) => item !== selectedValue)
                  : [...transactionSource, selectedValue];
              }
              setTransactionSource(newSource);
              onFilterChange({
                fromDate,
                toDate,
                property,
                transactionSource: newSource,
                category,
              });
              console.log("Filter Change (Transaction Source):", {
                fromDate,
                toDate,
                property,
                transactionSource: newSource,
                category,
              });
            }}
          >
            <SelectTrigger className="w-full mt-1">
              <SelectValue>
                {transactionSource.length === 0
                  ? "-- All Sources --"
                  : transactionSource.length === 1
                  ? transactionSource[0]
                  : +`${transactionSource.length} Sources`}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">-- All Sources --</SelectItem>
              <SelectItem value="Bank Feed">Bank Feed</SelectItem>
              <SelectItem value="Rental Summary">Rental Summary</SelectItem>
              <SelectItem value="Manual Entry">Manual Entry</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex-grow">
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <Select
              value={category.length === 0 ? "" : category.join(',')}
              onValueChange={(selectedValue) => {
                let newCategory: string[];
                if (selectedValue === "all") {
                  newCategory = [];
                } else {
                  const isSelected = category.includes(selectedValue);
                  newCategory = isSelected
                    ? category.filter((item) => item !== selectedValue)
                    : [...category, selectedValue];
                }
                setCategory(newCategory);
                onFilterChange({
                  fromDate,
                  toDate,
                  property,
                  transactionSource,
                  category: newCategory,
                });
                console.log("Filter Change (Category):", {
                  fromDate,
                  toDate,
                  property,
                  transactionSource,
                  category: newCategory,
                });
              }}
            >
              <SelectTrigger className="w-full mt-1">
                <SelectValue>
                  {category.length === 0
                    ? "-- All Categories --"
                    : category.length === 1
                    ? category[0]
                    : +`${category.length} Categories`}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">-- All Categories --</SelectItem>
                <div className="px-2 py-1.5 text-sm font-semibold text-muted-foreground">Income</div>
                <SelectItem value="Rental Income">Rental Income</SelectItem>
                <SelectItem value="Other rental related income">Other rental related income</SelectItem>
                <SelectItem value="Variable Outgoings Received">Variable Outgoings Received</SelectItem>
                
                <div className="px-2 py-1.5 text-sm font-semibold text-muted-foreground mt-2">Expense</div>
                <SelectItem value="Council rates">Council rates</SelectItem>
                <SelectItem value="Water Rates">Water Rates</SelectItem>
                <SelectItem value="Gardening">Gardening</SelectItem>
                <SelectItem value="Insurance">Insurance</SelectItem>
                <SelectItem value="Repairs & Maintenance">Repairs & Maintenance</SelectItem>
                <SelectItem value="Cleaning">Cleaning</SelectItem>
                <SelectItem value="Pest Control">Pest Control</SelectItem>
                <SelectItem value="Property Management Fees">Property Management Fees</SelectItem>
                <SelectItem value="Strata Fees">Strata Fees</SelectItem>
                <SelectItem value="Interest on Loan">Interest on Loan</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="pt-5">
            <Button className="bg-yellow-500 hover:bg-yellow-600 text-white" onClick={handleReset}>
              Reset
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};