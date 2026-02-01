import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { updateBook } from "@/services/bookService";
import { API_BASE_URL } from "@/services/api";

const EditBookDialog = ({ book, onRefresh }) => {
  const [open, setOpen] = useState(false);

  const [form, setForm] = useState({
    title: book.title,
    author: book.author,
    price: book.price,
    stock: book.stock,
    description: book.description || "",
  });

  const [existingImages, setExistingImages] = useState(book.images || []);
  const [newImages, setNewImages] = useState([]);

  const removeImage = (img) => {
    setExistingImages((prev) => prev.filter((i) => i !== img));
  };

  const handleUpdate = async () => {
    const formData = new FormData();

    Object.entries(form).forEach(([key, value]) => formData.append(key, value));

    existingImages.forEach((img) => formData.append("existingImages", img));

    newImages.forEach((img) => formData.append("images", img));

    await updateBook(book._id, formData);
    onRefresh();
    setOpen(false); // ✅ CLOSE DIALOG
  };

  const getImageUrl = (img) => {
    if (!img) return "/placeholder.png";
    if (img.startsWith("http")) return img;
    return `${API_BASE_URL}${img}`;
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Edit</Button>
      </DialogTrigger>

      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit Book</DialogTitle>
        </DialogHeader>

        <div className="space-y-3">
          <Input
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />

          <Input
            value={form.author}
            onChange={(e) => setForm({ ...form, author: e.target.value })}
          />

          <Input
            type="number"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
          />

          <Input
            type="number"
            value={form.stock}
            onChange={(e) => setForm({ ...form, stock: e.target.value })}
          />

          <Textarea
            placeholder="Book description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />

          {/* Existing Images */}
          <div>
            <p className="text-sm font-semibold mb-2">Existing Images</p>
            <div className="flex gap-2 flex-wrap">
              {existingImages.map((img) => (
                <div key={img} className="relative">
                  <img
                    // src={`${API_BASE_URL}${img}`}
                    src={getImageUrl(img)}
                    alt="Book"
                    className="h-20 w-20 object-cover rounded"
                  />
                  <button
                    onClick={() => removeImage(img)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full px-2 text-xs"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Add New Images */}
          <Input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => setNewImages(Array.from(e.target.files))}
          />

          <Button onClick={handleUpdate} className="w-full">
            Update Book
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditBookDialog;
