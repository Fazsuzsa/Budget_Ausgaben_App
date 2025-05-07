import React, { useState } from "react";
import { cn } from "../lib/utils";
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
import { useNavigate } from 'react-router-dom';

export default function MyForm() {
    const [text1, setText1] = useState("");
    const [text2, setText2] = useState("");
    const [number, setNumber] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        // Exemple simple : afficher les données
        setMessage(`Données envoyées : ${text1}, ${text2}, ${number}`);
    };

    return (
        <div className={cn("flex flex-col gap-6")}>
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">Expense Change</CardTitle>
                    <CardDescription>Fill in the fields below</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="text1">ID Expense</Label>
                                <Input
                                    id="text1"
                                    type="text"
                                    value={text1}
                                    onChange={(e) => setText1(e.target.value)}
                                    disabled
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="text2">ID User</Label>
                                <Input
                                    id="text2"
                                    type="text"
                                    value={text2}
                                    onChange={(e) => setText2(e.target.value)}
                                    disabled
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="number">Amount</Label>
                                <Input
                                    id="number"
                                    type="number"
                                    value={number}
                                    onChange={(e) => setNumber(e.target.value)}
                                    required
                                    placeholder="Amount"
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="text2">Name Expense</Label>
                                <Input
                                    id="text2"
                                    type="text"
                                    value={text2}
                                    onChange={(e) => setText2(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="number">Cathegory ID</Label>
                                <Input
                                    id="number"
                                    type="number"
                                    value={number}
                                    onChange={(e) => setNumber(e.target.value)}
                                    required
                                    placeholder="Cathegory"
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="text2">Date</Label>
                                <Input
                                    id="text2"
                                    type="text"
                                    value={text2}
                                    onChange={(e) => setText2(e.target.value)}
                                    required
                                />
                            </div>

                            {message && <div className="text-sm text-green-600">{message}</div>}

                            <Button type="submit" className="w-full">
                                Soumettre
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
