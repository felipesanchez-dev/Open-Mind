import { CloudUploadIcon, ImageIcon, XIcon } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";

export function RenderEmptyState({ isDragging }: { isDragging: boolean }) {
  return (
    <div className="text-center">
      <div className="flex items-center mx-auto justify-center size-12 rounded-full bg-muted mb-4">
        <CloudUploadIcon
          className={cn(
            "size-6 text-muted-foreground",
            isDragging && "text-primary"
          )}
        />
      </div>
      <p className="text-base font-semibold text-zinc-600">
        Arrastre y suelte su{" "}
        <span className="font-bold cursor-pointer text-white">
          Archivo aqui
        </span>
      </p>
      <Button type="button" className="cursor-pointer mt-4" variant="outline">
        Seleccionar archivo
      </Button>
    </div>
  );
}

export function RenderErrorState() {
  return (
    <div className="text-center">
      <div className="flex items-center mx-auto justify-center size-12 rounded-full bg-muted mb-4">
        <ImageIcon className={cn("size-6 text-muted-foreground")} />
      </div>
      <p className="text-primary font-semibold">Actualizar imagen</p>
      <p className="text-sm text-muted-foreground">
        Por favor, intente nuevamente.
      </p>
      <Button type="button" className="cursor-pointer mt-4" variant="outline">
        Seleccionar archivo
      </Button>
    </div>
  );
}

export function RenderUploadedState({ 
  previewUrl, 
  onDelete, 
  isDeleting 
}: { 
  previewUrl: string; 
  onDelete?: () => void; 
  isDeleting?: boolean; 
}) {
  return (
    <div className="relative w-full h-full">
      <Image
        src={previewUrl}
        alt="Uploaded Image"
        fill
        className="object-contain p-2"
      />
      {onDelete && (
        <Button
          variant="destructive"
          size="icon"
          className="absolute top-2 right-2 h-8 w-8"
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          disabled={isDeleting}
        >
          {isDeleting ? (
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent" />
          ) : (
            <XIcon className="h-4 w-4" />
          )}
        </Button>
      )}
    </div>
  );
}
