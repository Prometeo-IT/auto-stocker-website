import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog";

type ScreenshotPreviewDialogProps = {
  src: string;
  alt: string;
  caption: string;
  isPhone?: boolean;
  dialogMaxWidthClass?: string;
};

export function ScreenshotPreviewDialog({
  src,
  alt,
  caption,
  isPhone = false,
  dialogMaxWidthClass,
}: ScreenshotPreviewDialogProps) {
  return (
    <Dialog>
      <DialogTrigger className="block w-full text-left">
        {isPhone ? (
          <div className="mx-auto w-full max-w-[200px]">
            <div className="relative rounded-[2rem] border border-border/70 bg-card shadow-sm">
              <div
                className="pointer-events-none absolute top-1.5 left-1/2 h-1 w-10 -translate-x-1/2 rounded-full bg-foreground/20"
                aria-hidden
              />
              <img
                src={src}
                width={1170}
                height={1992}
                alt={alt}
                loading="lazy"
                className="mx-auto aspect-[9/18] w-[100%] rounded-[1.5rem] object-contain"
              />
            </div>
          </div>
        ) : (
          <div className="overflow-hidden rounded-xl ring-1 ring-foreground/10 transition-transform hover:-translate-y-0.5">
            <img
              src={src}
              width={1920}
              height={1080}
              alt={alt}
              loading="lazy"
              className="aspect-[16/9] w-full object-cover"
            />
          </div>
        )}
        <p className="text-muted-foreground mt-2 text-center text-xs font-medium">{caption}</p>
      </DialogTrigger>
      <DialogContent className={dialogMaxWidthClass}>
        <DialogHeader className="sr-only">
          <DialogTitle>{caption}</DialogTitle>
          <DialogDescription>{alt}</DialogDescription>
        </DialogHeader>
        <img
          src={src}
          width={isPhone ? 1170 : 1920}
          height={isPhone ? 1992 : 1080}
          alt={alt}
          className="max-h-[80vh] w-full rounded-md object-contain"
        />
      </DialogContent>
    </Dialog>
  );
}
