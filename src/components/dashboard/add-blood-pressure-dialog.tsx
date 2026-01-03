
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X, ChevronUp, ChevronDown, MoreVertical } from "lucide-react";
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const NumberPicker = ({ value, onChange, label }: { value: number, onChange: (value: number) => void, label: string }) => (
    <div className="flex flex-col items-center">
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onChange(value + 1)}>
            <ChevronUp className="h-5 w-5" />
        </Button>
        <span className="text-gray-400 text-sm">{value + 1}</span>
        <Input 
            type="number" 
            className="w-20 text-center text-2xl font-bold border-x-0 border-t-0 rounded-none focus-visible:ring-0 p-0 h-10" 
            value={value} 
            onChange={(e) => onChange(parseInt(e.target.value) || 0)}
            aria-label={label}
        />
        <span className="text-gray-400 text-sm">{value - 1}</span>
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onChange(value - 1)}>
            <ChevronDown className="h-5 w-5" />
        </Button>
    </div>
);


export function AddBloodPressureDialog({ children }: { children: React.ReactNode }) {
  const [systolic, setSystolic] = useState(120);
  const [diastolic, setDiastolic] = useState(80);
  const [bodyPosition, setBodyPosition] = useState("");
  const [armLocation, setArmLocation] = useState("");
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
                    <Label className="font-semibold">Pressão arterial</Label>
                    <span className="text-sm text-muted-foreground">mmHg</span>
                </div>
                <div className="flex items-center justify-center gap-4">
                    <NumberPicker value={systolic} onChange={setSystolic} label="Pressão sistólica" />
                    <span className="text-3xl font-light text-muted-foreground">/</span>
                    <NumberPicker value={diastolic} onChange={setDiastolic} label="Pressão diastólica" />
                </div>
            </div>

            <div className="space-y-4 pt-4 border-t">
                <h3 className="text-sm font-semibold text-muted-foreground">DETALHES DA MEDIÇÃO</h3>
                <div className="flex justify-between items-center">
                    <Label>Posição corporal</Label>
                     <Select onValueChange={setBodyPosition} value={bodyPosition}>
                        <SelectTrigger className="w-[180px] justify-end border-none focus:ring-0">
                            <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="sitting">Sentado</SelectItem>
                            <SelectItem value="standing">Em pé</SelectItem>
                            <SelectItem value="lying_down">Deitado</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                 <div className="flex justify-between items-center">
                    <Label>Local do braço</Label>
                    <Select onValueChange={setArmLocation} value={armLocation}>
                        <SelectTrigger className="w-[180px] justify-end border-none focus:ring-0">
                            <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="left">Braço esquerdo</SelectItem>
                            <SelectItem value="right">Braço direito</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
