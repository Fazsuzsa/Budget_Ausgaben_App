import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import Navbar from "../components/Navbar";

export default function EditMonthlyIncome() {
  const { state } = useLocation();
  const income = state?.income;

  const navigate = useNavigate();
  const { userId: paramUserId, incomeId: paramIncomeId } = useParams();

  const [incomeId, setIncomeId] = useState("");
  const [userId, setUserId] = useState("");

  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [dateStart, setDateStart] = useState("");

  const [message, setMessage] = useState("");

  useEffect(() => {
    if (income) {
      setIncomeId(income.id || paramIncomeId);
      setUserId(income.user_id || paramUserId);
      setName(income.name || "");
      setAmount(income.amount || "");
      setDateStart(income.date_start || "");
    }
  }, [income, paramIncomeId, paramUserId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:5005/monthly_incomes/${userId}/${incomeId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount,
            name,
            date_start: dateStart,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Error updating income");
      }

      const updatedIncome = await response.json();
      console.log("Update successful:", updatedIncome);
      setMessage("Income updated successfully!");
      setTimeout(() => navigate("/monthly-incomes"), 1000);
    } catch (err) {
      console.error(err);
      alert("An error occurred while updating the income.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Edit Monthly Income</CardTitle>
            <CardDescription>Update the fields below</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label>Income ID</Label>
                <Input value={incomeId} disabled />
              </div>
              <div>
                <Label>User ID</Label>
                <Input value={userId} disabled />
              </div>
              <div>
                <Label>Amount (€)</Label>
                <Input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label>Name</Label>
                <Input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label>Start Monat</Label>
                <Input
                  type="month"
                  value={dateStart.slice(0, 7)}
                  onChange={(e) => setDateStart(e.target.value + "-01")}
                  required
                />
              </div>

              {message && (
                <div className="text-sm text-green-600">{message}</div>
              )}

              <Button type="submit" className="w-full">
                Speichern
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
