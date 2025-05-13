import React, { useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { Select, SelectItem } from "./ui/select";

const AddExpenseForm = () => {
  const [showForm, setShowForm] = useState(false);
  const [type, setType] = useState("once");

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      name: "",
      amount: "",
      category_id: "",
      date: "",
      start_date: "",
      end_date: "",
    },
  });

  const onSubmit = async (values) => {
    const payload = {
      user_id: 1,
      ...values,
      category_id: parseInt(values.category_id),
      amount: parseFloat(values.amount),
    };

    if (type === "monthly") {
      delete payload.date;
    } else {
      delete payload.start_date;
      delete payload.end_date;
    }

    const url =
      type === "monthly"
        ? "http://localhost:5005/monthly_expenses"
        : "http://localhost:5005/expenses";

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        alert("Gespeichert!");
        reset();
        setShowForm(false);
      } else {
        const data = await res.json();
        alert("Fehler: " + data.error);
      }
    } catch (err) {
      console.error("Fehler:", err);
      alert("Serverfehler!");
    }
  };

  return (
    <div className="text-center mt-10">
      <Button onClick={() => setShowForm(!showForm)} className="mb-4">
        {showForm ? "Formular schließen" : "Neue Ausgabe hinzufügen"}
      </Button>

      {showForm && (
        <Form>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="max-w-sm mx-auto space-y-4"
          >
            <FormItem>
              <FormLabel>Typ</FormLabel>
              <FormControl>
                <Select value={type} onChange={(e) => setType(e.target.value)}>
                  <SelectItem value="once">Einmalig</SelectItem>
                  <SelectItem value="monthly">Monatlich</SelectItem>
                </Select>
              </FormControl>
            </FormItem>

            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Name der Ausgabe"
                  {...register("name")}
                  required
                />
              </FormControl>
            </FormItem>

            <FormItem>
              <FormLabel>Betrag (€)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step="0.01"
                  {...register("amount")}
                  required
                />
              </FormControl>
            </FormItem>

            <FormItem>
              <FormLabel>Kategorie</FormLabel>
              <FormControl>
                <Select {...register("category_id")} required>
                  <SelectItem value="">-- Kategorie wählen --</SelectItem>
                  <SelectItem value="1">Shopping</SelectItem>
                  <SelectItem value="2">Entertainment</SelectItem>
                  <SelectItem value="3">Transport</SelectItem>
                  <SelectItem value="4">Rent & Energy</SelectItem>
                  <SelectItem value="5">Other</SelectItem>
                </Select>
              </FormControl>
            </FormItem>

            {type === "once" && (
              <FormItem>
                <FormLabel>Datum</FormLabel>
                <FormControl>
                  <Input type="date" {...register("date")} required />
                </FormControl>
              </FormItem>
            )}

            {type === "monthly" && (
              <>
                <FormItem>
                  <FormLabel>Startdatum</FormLabel>
                  <FormControl>
                    <Input type="date" {...register("start_date")} required />
                  </FormControl>
                </FormItem>

                <FormItem>
                  <FormLabel>Enddatum</FormLabel>
                  <FormControl>
                    <Input type="date" {...register("end_date")} />
                  </FormControl>
                </FormItem>
              </>
            )}

            <Button type="submit" className="w-full">
              Speichern
            </Button>
          </form>
        </Form>
      )}
    </div>
  );
};

export default AddExpenseForm;
