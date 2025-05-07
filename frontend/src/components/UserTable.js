import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
function UserTable() {
  return (
    <>
      <div className="max-w-4xl mx-auto">
        <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <div className="max-w-4xl mx-auto">
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Invoice</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Method</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
          </div>
          <div className="max-w-4xl mx-auto">
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">INV001</TableCell>
                <TableCell>Paid</TableCell>
                <TableCell>Credit Card</TableCell>
              </TableRow>
            </TableBody>
          </div>
        </Table>
      </div>
    </>
  );
}
export default UserTable;
