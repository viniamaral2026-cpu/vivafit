
"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X, ChevronUp, ChevronDown, MoreVertical } from "lucide-react";
import { format } from 'date-fns';

const NumberPicker = ({ value, onChange, label }: { value: number, onChange: (value: number) => void, label: string }) => {
    const handleIncrement = () => onChange(Math.round((value + 0.1) * 10) / 10);
    const handleDecrement = () => onChange(Math.round((value - 0.1) * 10) / 10);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = parseFloat(e.target.value);
        if (!isNaN(newValue)) {
            onChange(newValue);
        }
    };
    
    return (
        <div className="flex flex-col items-center">
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleIncrement}>
                <ChevronUp className="h-5 w-5" />
            </Button>
            <span className="text-gray-400 text-sm">{(value + 0.1).toFixed(1)}</span>
            <Input 
                type="number" 
                className="w-24 text-center text-2xl font-bold border-x-0 border-t-0 rounded-none focus-visible:ring-0 p-0 h-10" 
                value={value.toFixed(1)} 
                onChange={handleChange}
                step="0.1"
                aria-label={label}
            />
            <span className="text-gray-400 text-sm">{(value - 0.1).toFixed(1)}</span>
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleDecrement}>
                <ChevronDown className="h-5 w-5" />
            </Button>
        </div>
    );
};


export function AddWeightDialog({ children }: { children: React.ReactNode }) {
  const [weight, setWeight] = useState(75.0);
  const [now] = useState(new Date());

  const formattedDate = `Hoje ${format(now, 'HH:mm')}`;


  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md p-0">
        <DialogHeader className="flex-row items-center justify-between border-b p-4">
          <div className="flex items-center gap-4">
             <DialogClose asChild>
                <Button variant="ghost" size="icon"><X className="h-5 w-5" /></Button>
             </DialogClose>
             <DialogTitle className="text-xl font-bold text-left">Adicionar dados</DialogTitle>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="link" className="text-primary text-base font-semibold p-0 h-auto">Salvar</Button>
             <Button variant="ghost" size="icon"><MoreVertical className="h-5 w-5" /></Button>
          </div>
        </DialogHeader>
        <div className="p-6 space-y-6">
            <div className="flex justify-between items-center">
                <p className="font-semibold">Hora</p>
                <p className="text-muted-foreground">{formattedDate}</p>
            </div>

            <div className="space-y-2">
                <div className="flex justify-between items-baseline">
                    <Label className="font-semibold">Peso</Label>
                    <span className="text-sm text-muted-foreground">kg</span>
                </div>
                <div className="flex items-center justify-center gap-4">
                    <NumberPicker value={weight} onChange={setWeight} label="Peso" />
                </div>
            </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

