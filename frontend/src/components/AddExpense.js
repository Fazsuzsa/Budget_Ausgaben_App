import React, { useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { FormItem, FormLabel, FormControl } from "./ui/form";
import { Select, SelectItem } from "./ui/select";

import { API_URL } from "../lib/utils";

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
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?.id;

    const payload = {
      user_id: userId,
      ...values,
      category_id: parseInt(values.category_id),
      amount: parseFloat(values.amount),
    };

    if (type === "monthly") {
      payload.date_start = values.date_start + "-01"; // hier die Monatskorrektur
      delete payload.date;
    } else {
      delete payload.date_start;
    }

    const url =
      type === "monthly"
        ? `${API_URL}/monthly_expenses`
        : `${API_URL}/expenses`;

    const token = localStorage.getItem("token");

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        alert("Gespeichert!");
        reset();
        setShowForm(false);
        window.location.reload();
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
                  <Input type="month" {...register("date_start")} required />
                </FormControl>
              </FormItem>
            </>
          )}

          <Button type="submit" className="w-full">
            Speichern
          </Button>
        </form>
      )}
    </div>
  );
};

export default AddExpenseForm;
