"use client";

import { useState } from "react";
import { Plus, Trash2, Pencil, ChevronUp, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { nanoid } from "nanoid";

interface Item {
  id: string;
  [key: string]: any;
}

interface FieldDef {
  key: string;
  label: string;
  type: "text" | "textarea" | "number";
  placeholder?: string;
}

interface SortableItemListProps {
  items: Item[];
  fields: FieldDef[];
  onChange: (items: Item[]) => void;
  itemLabel?: string;
  renderPreview?: (item: Item) => React.ReactNode;
}

export function SortableItemList({
  items,
  fields,
  onChange,
  itemLabel = "Item",
  renderPreview,
}: SortableItemListProps) {
  const [editingItem, setEditingItem] = useState<Item | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  function handleAdd() {
    const newItem: Item = { id: nanoid(8) };
    fields.forEach((f) => { newItem[f.key] = ""; });
    setEditingItem(newItem);
    setDialogOpen(true);
  }

  function handleEdit(item: Item) {
    setEditingItem({ ...item });
    setDialogOpen(true);
  }

  function handleSaveItem() {
    if (!editingItem) return;
    const exists = items.find((i) => i.id === editingItem.id);
    if (exists) {
      onChange(items.map((i) => (i.id === editingItem.id ? editingItem : i)));
    } else {
      onChange([...items, editingItem]);
    }
    setDialogOpen(false);
    setEditingItem(null);
  }

  function handleDelete(id: string) {
    onChange(items.filter((i) => i.id !== id));
  }

  function handleMove(id: string, direction: "up" | "down") {
    const idx = items.findIndex((i) => i.id === id);
    if (idx < 0) return;
    const swapIdx = direction === "up" ? idx - 1 : idx + 1;
    if (swapIdx < 0 || swapIdx >= items.length) return;
    const newItems = [...items];
    [newItems[idx], newItems[swapIdx]] = [newItems[swapIdx], newItems[idx]];
    onChange(newItems);
  }

  return (
    <div className="space-y-3">
      {items.map((item, idx) => (
        <Card key={item.id} className="border-border bg-card">
          <CardContent className="flex items-center gap-3 p-3">
            <div className="flex flex-col gap-0.5">
              <Button variant="ghost" size="sm" className="h-5 w-5 p-0" disabled={idx === 0} onClick={() => handleMove(item.id, "up")}>
                <ChevronUp className="h-3 w-3" />
              </Button>
              <Button variant="ghost" size="sm" className="h-5 w-5 p-0" disabled={idx === items.length - 1} onClick={() => handleMove(item.id, "down")}>
                <ChevronDown className="h-3 w-3" />
              </Button>
            </div>
            <div className="flex-1 min-w-0">
              {renderPreview ? (
                renderPreview(item)
              ) : (
                <p className="text-sm font-medium truncate">{item[fields[0]?.key] || `${itemLabel} ${idx + 1}`}</p>
              )}
            </div>
            <Button variant="ghost" size="sm" className="h-7 w-7 p-0" onClick={() => handleEdit(item)}>
              <Pencil className="h-3.5 w-3.5" />
            </Button>
            <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-destructive" onClick={() => handleDelete(item.id)}>
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
          </CardContent>
        </Card>
      ))}

      <Button variant="outline" size="sm" onClick={handleAdd} className="gap-2 w-full">
        <Plus className="h-3.5 w-3.5" /> Add {itemLabel}
      </Button>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingItem && items.find((i) => i.id === editingItem.id) ? "Edit" : "Add"} {itemLabel}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            {fields.map((field) => (
              <div key={field.key} className="space-y-2">
                <Label>{field.label}</Label>
                {field.type === "textarea" ? (
                  <Textarea
                    value={editingItem?.[field.key] || ""}
                    onChange={(e) => setEditingItem((prev) => prev ? { ...prev, [field.key]: e.target.value } : null)}
                    placeholder={field.placeholder}
                    className="bg-background"
                    rows={3}
                  />
                ) : (
                  <Input
                    type={field.type}
                    value={editingItem?.[field.key] || ""}
                    onChange={(e) => setEditingItem((prev) => prev ? { ...prev, [field.key]: e.target.value } : null)}
                    placeholder={field.placeholder}
                    className="bg-background"
                  />
                )}
              </div>
            ))}
            <Button onClick={handleSaveItem} className="w-full bg-navy hover:bg-navy-light text-white">
              Save
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
