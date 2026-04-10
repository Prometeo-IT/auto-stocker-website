import { buttonVariants } from "@/components/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog.tsx";
import { cn } from "@/lib/utils";

type LegalDialogLinkProps = {
  label: string;
  title: string;
  description: string;
};

export function LegalDialogLink({ label, title, description }: LegalDialogLinkProps) {
  return (
    <Dialog>
      <DialogTrigger className={cn(buttonVariants({ variant: "link", size: "sm" }), "h-auto p-0")}>
        {label}
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription className="text-foreground/90 pt-2">{description}</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
