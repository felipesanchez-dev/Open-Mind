import { type Editor } from "@tiptap/react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Toggle } from "../ui/toggle";
import {
  AlignCenterIcon,
  AlignLeftIcon,
  AlignRightIcon,
  Bold,
  Heading1Icon,
  Heading2Icon,
  Heading3Icon,
  Italic,
  ListIcon,
  ListOrderedIcon,
  Redo,
  Strikethrough,
  Undo,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

interface iAppProps {
  editor: Editor | null;
}

export function MenuBar({ editor }: iAppProps) {
  if (!editor) {
    return null;
  }

  return (
    <div className="border border-input border-t-0 border-x-0 rounded-lg p-2 bg-card flex flex-wrap gap-1 items-center">
      <TooltipProvider>
        <div className="flex flex-wrap gap-1">
          <Tooltip>
            <TooltipTrigger asChild className="cursor-pointer">
              <Toggle
                size="sm"
                pressed={editor.isActive("bold")}
                onPressedChange={() =>
                  editor.chain().focus().toggleBold().run()
                }
                className={cn(
                  "h-8 w-8 p-0",
                  editor.isActive("bold") &&
                    "bg-primary text-primary-foreground"
                )}
              >
                <Bold className="h-4 w-4" />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>Negrita</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild className="cursor-pointer">
              <Toggle
                size="sm"
                pressed={editor.isActive("italic")}
                onPressedChange={() =>
                  editor.chain().focus().toggleItalic().run()
                }
                className={cn(
                  "h-8 w-8 p-0",
                  editor.isActive("italic") &&
                    "bg-primary text-primary-foreground"
                )}
              >
                <Italic className="h-4 w-4" />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>Cursiva</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild className="cursor-pointer">
              <Toggle
                size="sm"
                pressed={editor.isActive("strike")}
                onPressedChange={() =>
                  editor.chain().focus().toggleStrike().run()
                }
                className={cn(
                  "h-8 w-8 p-0",
                  editor.isActive("strike") &&
                    "bg-primary text-primary-foreground"
                )}
              >
                <Strikethrough className="h-4 w-4" />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>Tachado</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild className="cursor-pointer">
              <Button
                size="sm"
                variant={
                  editor.isActive("heading", { level: 1 }) ? "default" : "ghost"
                }
                onClick={() => {
                  if (editor.isActive("heading", { level: 1 })) {
                    editor.chain().focus().setParagraph().run();
                  } else {
                    editor.chain().focus().setHeading({ level: 1 }).run();
                  }
                }}
                className={cn(
                  "h-8 w-8 p-0",
                  editor.isActive("heading", { level: 1 }) &&
                    "bg-primary text-primary-foreground"
                )}
              >
                <Heading1Icon className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Título (H1)</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild className="cursor-pointer">
              <Button
                size="sm"
                variant={
                  editor.isActive("heading", { level: 2 }) ? "default" : "ghost"
                }
                onClick={() => {
                  if (editor.isActive("heading", { level: 2 })) {
                    editor.chain().focus().setParagraph().run();
                  } else {
                    editor.chain().focus().setHeading({ level: 2 }).run();
                  }
                }}
                className={cn(
                  "h-8 w-8 p-0",
                  editor.isActive("heading", { level: 2 }) &&
                    "bg-primary text-primary-foreground"
                )}
              >
                <Heading2Icon className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Subtítulo (H2)</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild className="cursor-pointer">
              <Button
                size="sm"
                variant={
                  editor.isActive("heading", { level: 3 }) ? "default" : "ghost"
                }
                onClick={() => {
                  if (editor.isActive("heading", { level: 3 })) {
                    editor.chain().focus().setParagraph().run();
                  } else {
                    editor.chain().focus().setHeading({ level: 3 }).run();
                  }
                }}
                className={cn(
                  "h-8 w-8 p-0",
                  editor.isActive("heading", { level: 3 }) &&
                    "bg-primary text-primary-foreground"
                )}
              >
                <Heading3Icon className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Subtítulo 2 (H3)</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild className="cursor-pointer">
              <Toggle
                size="sm"
                pressed={editor.isActive("bulletList")}
                onPressedChange={() =>
                  editor.chain().focus().toggleBulletList().run()
                }
                className={cn(
                  "h-8 w-8 p-0",
                  editor.isActive("bulletList") &&
                    "bg-primary text-primary-foreground"
                )}
              >
                <ListIcon className="h-4 w-4" />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>Lista con viñetas</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild className="cursor-pointer">
              <Toggle
                size="sm"
                pressed={editor.isActive("orderedList")}
                onPressedChange={() =>
                  editor.chain().focus().toggleOrderedList().run()
                }
                className={cn(
                  "h-8 w-8 p-0",
                  editor.isActive("orderedList") &&
                    "bg-primary text-primary-foreground"
                )}
              >
                <ListOrderedIcon className="h-4 w-4" />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>Lista ordenada</TooltipContent>
          </Tooltip>
        </div>

        <div className="w-px h-6 bg-border mx-2"></div>
        <div className="flex flex-wrap gap-1">
          <Tooltip>
            <TooltipTrigger asChild className="cursor-pointer">
              <Button
                size="sm"
                variant={
                  editor.isActive({ textAlign: "left" }) ? "default" : "ghost"
                }
                onClick={() =>
                  editor.chain().focus().setTextAlign("left").run()
                }
                className={cn(
                  "h-8 w-8 p-0",
                  editor.isActive({ textAlign: "left" }) &&
                    "bg-primary text-primary-foreground"
                )}
              >
                <AlignLeftIcon className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Alinear a la izquierda</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild className="cursor-pointer">
              <Button
                size="sm"
                variant={
                  editor.isActive({ textAlign: "center" }) ? "default" : "ghost"
                }
                onClick={() =>
                  editor.chain().focus().setTextAlign("center").run()
                }
                className={cn(
                  "h-8 w-8 p-0",
                  editor.isActive({ textAlign: "center" }) &&
                    "bg-primary text-primary-foreground"
                )}
              >
                <AlignCenterIcon className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Centrar</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild className="cursor-pointer">
              <Button
                size="sm"
                variant={
                  editor.isActive({ textAlign: "right" }) ? "default" : "ghost"
                }
                onClick={() =>
                  editor.chain().focus().setTextAlign("right").run()
                }
                className={cn(
                  "h-8 w-8 p-0",
                  editor.isActive({ textAlign: "right" }) &&
                    "bg-primary text-primary-foreground"
                )}
              >
                <AlignRightIcon className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Alinear a la derecha</TooltipContent>
          </Tooltip>
        </div>
        <div className="w-px h-6 bg-border mx-2"></div>
        <div className="flex flex-wrap gap-1">
          <Tooltip>
            <TooltipTrigger asChild className="cursor-pointer">
              <Button
                size="sm"
                variant="ghost"
                type="button"
                onClick={() => editor.chain().focus().undo().run()}
                disabled={!editor.can().undo()}
                className="h-8 w-8 p-0"
              >
                <Undo className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Deshacer</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild className="cursor-pointer">
              <Button
                size="sm"
                variant="ghost"
                type="button"
                onClick={() => editor.chain().focus().redo().run()}
                disabled={!editor.can().redo()}
                className="h-8 w-8 p-0"
              >
                <Redo className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Rehacer</TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>
    </div>
  );
}
