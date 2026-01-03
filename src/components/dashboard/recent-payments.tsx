import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function RecentPayments() {
  const payments = [
    { name: "Olivia Martin", email: "olivia.martin@email.com", amount: "+$1,999.00", avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d" },
    { name: "Jackson Lee", email: "jackson.lee@email.com", amount: "+$39.00", avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704e" },
    { name: "Isabella Nguyen", email: "isabella.nguyen@email.com", amount: "+$299.00", avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704f" },
    { name: "William Kim", email: "will@email.com", amount: "+$99.00", avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704a" },
    { name: "Sofia Davis", email: "sofia.davis@email.com", amount: "+$39.00", avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704b" },
  ];

  return (
    <div className="space-y-8">
      {payments.map((payment, index) => (
        <div className="flex items-center" key={index}>
          <Avatar className="h-9 w-9">
            <AvatarImage src={payment.avatar} alt="Avatar" />
            <AvatarFallback>{payment.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{payment.name}</p>
            <p className="text-sm text-muted-foreground">{payment.email}</p>
          </div>
          <div className="ml-auto font-medium">{payment.amount}</div>
        </div>
      ))}
    </div>
  );
}
