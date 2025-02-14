import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Icons } from "@/components/icons";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { getCookie } from "react-use-cookie";

export default function CreateBlog() {
  const formData = new FormData();
  const nav = useNavigate();
  const token = getCookie("my_token");
  const { toast } = useToast();
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState<{
    photo: File | null;
    title: string;
    content: string;
    author: string;
  }>({
    photo: null,
    title: "",
    content: "",
    author: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setData((prev) => ({ ...prev, photo: file }));
      setFile(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!file) {
      toast({
        title: "Please select a file",
      });
      setLoading(false);
      return;
    }

    formData.append("file", file);
    formData.append("upload_preset", "blogs-photo"); // Replace with your Cloudinary upload preset

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/doa84txts/image/upload`, // Replace with your Cloudinary cloud name
        formData
      );
      const url = response.data.secure_url;

      if (url) {
        try {
          const blogData = {
            title: data.title,
            content: data.content,
            author: data.author,
            url,
          };

          const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/upload`, {
            method: "POST",
            body: JSON.stringify({ ...blogData }),
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          });

          if (res.status == 400) {
            console.log(res.json());
            setLoading(false);
          }

          const json = await res.json();
          if (json) {
            setLoading(false);
            nav("/posts");
            toast({
              title: "Blog created",
            });
          }

          // Reset form after submission
          setData({
            photo: null,
            title: "",
            content: "",
            author: "",
          });
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : "An error occurred";
          toast({
            title: errorMessage,
          });
        }
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      const errorMessage = error instanceof Error ? error.message : "An error occurred";
      toast({
        title: errorMessage,
      });
    }
  };

  return (
    <div className="sm:py-10 md:py-10 lg:py-20">
      <form
        onSubmit={handleSubmit}
        className="space-y-6 max-w-2xl mx-auto p-6 bg-card rounded-lg shadow-lg"
      >
        <h2 className="text-2xl font-bold text-center mb-6">
          Create New Blog Post
        </h2>

        <div>
          <Label htmlFor="photo">Photo</Label>
          <Input
            id="photo"
            type="file"
            onChange={handlePhotoChange}
            accept="image/*"
          />
        </div>

        <div>
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            name="title"
            value={data.title}
            onChange={handleInputChange}
            placeholder="Enter blog post title"
            required
          />
        </div>

        <div>
          <Label htmlFor="author">Author</Label>
          <Input
            id="author"
            name="author"
            value={data.author}
            onChange={handleInputChange}
            placeholder="Enter author name"
            required
          />
        </div>

        <div>
          <Label htmlFor="content">Content</Label>
          <Textarea
            id="content"
            name="content"
            value={data.content}
            onChange={handleInputChange}
            placeholder="Write your blog post content here"
            required
            className="min-h-[200px]"
          />
        </div>

        <Button
          disabled={loading}
          variant="outline"
          type="submit"
          className="w-full"
        >
          Create Blog Post{" "}
          {loading && <Icons.spinner className="ms-5 h-4 w-4 animate-spin" />}
        </Button>
      </form>
    </div>
  );
}
