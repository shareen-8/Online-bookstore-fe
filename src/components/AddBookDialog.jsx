



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
import { addBook } from "@/services/bookService";
import { toast } from "sonner";

const AddBookDialog = ({ onRefresh }) => {
  const [book, setBook] = useState({
    title: "",
    author: "",
    price: "",
    stock: "",
    description: "",
  });

  const [images, setImages] = useState([]);

  const handleSubmit = async () => {
    try {
      const formData = new FormData();

      formData.append("title", book.title);
      formData.append("author", book.author);
      formData.append("price", Number(book.price));
      formData.append("stock", Number(book.stock));
      formData.append("description", book.description);

      Array.from(images).forEach((img) =>
        formData.append("images", img)
      );

      await addBook(formData);

      toast.success("Book added successfully");

      onRefresh();
    } catch (error) {
      toast.error("Failed to add book");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add Book</Button>
      </DialogTrigger>

      <DialogContent className="max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Book</DialogTitle>
        </DialogHeader>

        <div className="space-y-3">
          <Input
            placeholder="Title"
            onChange={(e) =>
              setBook({ ...book, title: e.target.value })
            }
          />

          <Input
            placeholder="Author"
            onChange={(e) =>
              setBook({ ...book, author: e.target.value })
            }
          />

          <Input
            placeholder="Price"
            type="number"
            onChange={(e) =>
              setBook({ ...book, price: e.target.value })
            }
          />

          <Input
            placeholder="Stock"
            type="number"
            onChange={(e) =>
              setBook({ ...book, stock: e.target.value })
            }
          />

          {/* ✅ DESCRIPTION */}
          <textarea
            placeholder="Book Description"
            className="w-full border rounded-md p-2 text-sm"
            rows={4}
            onChange={(e) =>
              setBook({ ...book, description: e.target.value })
            }
          />

          {/* ✅ IMAGE UPLOAD */}
          <Input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => setImages(e.target.files)}
          />

          <Button onClick={handleSubmit} className="w-full">
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddBookDialog;
