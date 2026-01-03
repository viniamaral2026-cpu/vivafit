
"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Bot, User, Loader, Rocket, ArrowLeft } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "../auth-provider";
import { aiCoach } from "@/ai/flows/ai-coach-flow";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import Link from "next/link";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function AICoachPage() {
  const { user } = useAuth();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Olá! Sou o seu Coach VivaFit. Como posso ajudar você em sua jornada de saúde hoje?",
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await aiCoach(input);
      const assistantMessage: Message = { role: "assistant", content: response };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error calling AI coach:", error);
      const errorMessage: Message = {
        role: "assistant",
        content: "Desculpe, estou com problemas para me conectar. Tente novamente mais tarde.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col p-4 md:p-6">
       <div className="mb-4">
            <Button variant="ghost" asChild>
                <Link href="/journal">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Voltar para o Diário
                </Link>
            </Button>
        </div>
      <div className="w-full max-w-4xl h-full flex flex-col rounded-xl border bg-card shadow-lg mx-auto">
        {/* Header */}
        <header className="bg-primary text-primary-foreground p-4 rounded-t-xl flex items-center gap-4">
            <div className="p-2 bg-primary-foreground/20 rounded-lg">
                <Bot className="h-6 w-6"/>
            </div>
            <div>
                <h1 className="text-lg font-bold font-headline">Coach VivaFit AI</h1>
                <p className="text-sm text-primary-foreground/80">Sempre disponível para motivar você</p>
            </div>
        </header>
        
        {/* Chat Content */}
        <div className="flex-1 overflow-hidden">
            <ScrollArea className="h-full" ref={scrollAreaRef}>
                <div className="p-6 space-y-6">
                 {messages.map((message, index) => (
                    <div
                    key={index}
                    className={cn(
                        "flex items-start gap-4",
                        message.role === "user" ? "justify-end" : ""
                    )}
                    >
                    {message.role === "assistant" && (
                         <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-muted border">
                            <Bot className="h-5 w-5 text-muted-foreground"/>
                         </div>
                    )}
                    <div
                        className={cn("max-w-md rounded-lg p-3 text-sm",
                        message.role === "user"
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted"
                        )}
                    >
                        <p className="whitespace-pre-wrap">{message.content}</p>
                    </div>
                    {message.role === "user" && (
                        <Avatar className="h-9 w-9 border">
                            <AvatarImage src={user?.photoURL || ""} />
                            <AvatarFallback><User /></AvatarFallback>
                        </Avatar>
                    )}
                    </div>
                ))}
                {isLoading && (
                    <div className="flex items-start gap-4">
                        <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-muted border">
                            <Bot className="h-5 w-5 text-muted-foreground"/>
                         </div>
                        <div className="max-w-md rounded-lg p-3 bg-muted flex items-center">
                            <Loader className="h-5 w-5 animate-spin"/>
                        </div>
                    </div>
                )}
                </div>
            </ScrollArea>
        </div>

        {/* Input Area */}
        <footer className="p-4 border-t bg-card rounded-b-xl">
             <form onSubmit={handleSubmit} className="flex items-center gap-4">
                <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Pergunte sobre alimentação, treinos..."
                className="flex-1 bg-muted border-none focus-visible:ring-1 focus-visible:ring-ring"
                rows={1}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSubmit(e);
                    }
                }}
                />
                <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
                    <Rocket className="h-5 w-5" />
                </Button>
            </form>
            <p className="text-xs text-muted-foreground text-center mt-2">
                IA pode cometer erros. Consulte sempre um profissional de saúde.
            </p>
        </footer>
      </div>
    </div>
  );
}
