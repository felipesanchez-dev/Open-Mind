import { CloudUploadIcon, ImageIcon } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

export function RenderEmptyState({ isDragging }: { isDragging: boolean }) {
  return (
    <div className="text-center">
      <div className="flex items-center mx-auto justify-center size-12 rounded-full bg-muted mb-4">
        <CloudUploadIcon className={cn(
          "size-6 text-muted-foreground",
          isDragging && "text-primary"
        )}/>
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
};

export function RenderErrorState() {
  return (
    <div className="text-center">
      <div className="flex items-center mx-auto justify-center size-12 rounded-full bg-muted mb-4">
        <ImageIcon className={cn(
          "size-6 text-muted-foreground",
        )}/>
      </div>
      <p className="text-primary font-semibold">Actualizar imagen</p>
      <p className="text-sm text-muted-foreground">Por favor, intente nuevamente.</p>
      <Button type="button" className="cursor-pointer mt-4" variant="outline">
        Seleccionar archivo
      </Button>
    </div>
  )
}
