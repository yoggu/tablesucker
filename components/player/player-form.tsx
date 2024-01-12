"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { useToast } from "@/utils/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { PlayerFormSchema } from "@/utils/schema";
import { createPlayer, uploadPlayerImage } from "@/actions/player";
import FileUpload from "@/components/ui/file-upload";
import { useState } from "react";
import Uppy from "@uppy/core";
import ImageEditor from "@uppy/image-editor";
import Link from "next/link";
import { DialogClose } from "../ui/dialog";
import { Player } from "@/types/types";

type Inputs = z.infer<typeof PlayerFormSchema>;

type PlayerFormProps = {
  player?: Player;
  onClose?: () => void;
};

export default function PlayerForm({ player, onClose }: PlayerFormProps) {
  // IMPORTANT: passing an initializer function to prevent Uppy from being reinstantiated on every render.
  const [uppy] = useState(() =>
    new Uppy({
      restrictions: {
        maxFileSize: 5242880, // 5MB
        maxNumberOfFiles: 1,
        allowedFileTypes: ["image/*"],
      },
    }).use(ImageEditor, {
      actions: {
        revert: true,
        rotate: true,
        granularRotate: false,
        flip: true,
        zoomIn: true,
        zoomOut: true,
        cropSquare: false,
        cropWidescreen: false,
        cropWidescreenVertical: false,
      },
      cropperOptions: {
        aspectRatio: 1,
        croppedCanvasOptions: {},
      },
    }),
  );
  const { toast } = useToast();
  const form = useForm<Inputs>({
    resolver: zodResolver(PlayerFormSchema),
    defaultValues: {
      name: "",
      image_url: "",
    },
  });

  async function onSubmit(data: Inputs) {
    const file = uppy.getFiles()[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file.data, file.name);
      const { data: image, error: imageError } =
        await uploadPlayerImage(formData);
      if (imageError) {
        toast({
          variant: "destructive",
          title: "There was a problem with your request.",
          description:
            (imageError as Error).message || "An unexpected error occurred.",
        });
        return;
      }
      data.image_url = image?.publicUrl || "";
    }
    const { data: player, error } = await createPlayer(data);
    if (error) {
      toast({
        variant: "destructive",
        title: "There was a problem with your request.",
        description:
          (error as Error).message || "An unexpected error occurred.",
      });
      return;
    }

    toast({
      title: "Player created successfully",
      description: (
        <>
          <Link href={`/players/${player!.id}`}>{player!.name}</Link> was
          created successfully.
        </>
      ),
    });
    form.reset();
    uppy.close();
    if (onClose) {
      onClose();
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormItem>
          <FormLabel>Image</FormLabel>
          <FileUpload uppy={uppy} />
        </FormItem>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
