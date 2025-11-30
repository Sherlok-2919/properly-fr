'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Upload } from 'lucide-react';

interface ExtractedData {
  id: number;
  fileName: string;
  uploadDate: string;
  documentType: string;
  extractedFields: {
    [key: string]: string;
  };
  confidence: number;
  status: 'processing' | 'completed' | 'failed';
}

export default function OCRPage({ onBackClick }: { onBackClick: () => void }) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [extractedData, setExtractedData] = useState<ExtractedData[]>(
    []
  );

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setIsUploading(true);
    // Simulate OCR processing
    setTimeout(() => {
      const newData: ExtractedData = {
        id: extractedData.length + 1,
        fileName: selectedFile.name,
        uploadDate: new Date().toISOString().split('T')[0],
        documentType: 'Document',
        extractedFields: {
          status: 'Processing...',
        },
        confidence: 0,
        status: 'processing',
      };
      setExtractedData([newData, ...extractedData]);
      setSelectedFile(null);
      setIsUploading(false);
    }, 2000);
  };

  return (
    <div className="w-full px-6 py-6">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="icon" onClick={onBackClick}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Record Expense</h1>
          
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Left side - File Upload */}
        <Card className="shadow-xl rounded-2xl border border-gray-100 overflow-hidden">
          <CardContent className="p-8 bg-white">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-16 text-center hover:border-blue-500 transition-colors cursor-pointer bg-gray-50 flex flex-col items-center justify-center h-full">
              <Upload className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <p className="text-gray-600 font-medium">Click or drag file to this area to upload (.jpg, .jpeg, .png, .pdf)</p>
            </div>
          </CardContent>
        </Card>

        {/* Right side - Form */}
        <Card className="shadow-xl rounded-2xl border border-gray-100 overflow-hidden">
          <CardContent className="p-8 bg-white">
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="expense-date" className="text-sm font-semibold text-gray-700">Expense Date*</Label>
                  <Input id="expense-date" type="date" defaultValue="2025-11-18" className="mt-2 p-3 border-gray-300 rounded-md focus:border-blue-500 focus:ring-blue-500" />
                </div>
                
                <div>
                  <Label htmlFor="select-property" className="text-sm font-semibold text-gray-700">Select Property*</Label>
                  <Select>
                    <SelectTrigger id="select-property" className="mt-2 p-3 border-gray-300 rounded-md focus:border-blue-500 focus:ring-blue-500">
                      <SelectValue placeholder="Select Property" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="prop1">Property 1</SelectItem>
                      <SelectItem value="prop2">Property 2</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="select-category" className="text-sm font-semibold text-gray-700">Select Category*</Label>
                  <Select>
                    <SelectTrigger id="select-category" className="mt-2 p-3 border-gray-300 rounded-md focus:border-blue-500 focus:ring-blue-500">
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent className="max-h-[300px]">
                      <div className="px-2 py-1.5 text-sm font-semibold text-gray-600">Income</div>
                      <SelectItem value="rental-income">Rental Income</SelectItem>
                      <SelectItem value="other-rental-income">Other rental related income</SelectItem>
                      
                      <div className="px-2 py-1.5 text-sm font-semibold text-gray-600 mt-2">Expense</div>
                      <SelectItem value="council-rates">Council rates</SelectItem>
                      <SelectItem value="water-rates">Water Rates</SelectItem>
                      <SelectItem value="gardening">Gardening</SelectItem>
                      <SelectItem value="insurance">Insurance</SelectItem>
                      <SelectItem value="repairs">Repairs & Maintenance</SelectItem>
                      <SelectItem value="cleaning">Cleaning</SelectItem>
                      <SelectItem value="pest-control">Pest Control</SelectItem>
                      <SelectItem value="property-management">Property Management Fees</SelectItem>
                      <SelectItem value="strata">Strata Fees</SelectItem>
                      <SelectItem value="interest">Interest on Loan</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="amount-inclusive-gst" className="text-sm font-semibold text-gray-700">Amount Inclusive GST*</Label>
                  <Input id="amount-inclusive-gst" placeholder="Amount" type="number" className="mt-2 p-3 border-gray-300 rounded-md focus:border-blue-500 focus:ring-blue-500" />
                </div>
              </div>

              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg text-lg font-semibold transition-colors mt-8 shadow-md hover:shadow-lg">Save</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}