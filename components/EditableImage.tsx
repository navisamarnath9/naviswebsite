"use client";

import Image, { type ImageProps } from "next/image";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

let imageOverridesRequest: Promise<Record<string, string>> | null = null;

function loadImageOverrides() {
  if (!imageOverridesRequest) {
    imageOverridesRequest = getDoc(doc(db, "settings", "site-content"))
      .then((snapshot) => snapshot.exists() ? (snapshot.data().imageOverrides || {}) as Record<string, string> : {})
      .catch(() => ({}));
  }
  return imageOverridesRequest;
}

type EditableImageProps = Omit<ImageProps, "src"> & { defaultSrc: string };

export default function EditableImage({ defaultSrc, ...props }: EditableImageProps) {
  const [src, setSrc] = useState(defaultSrc);

  useEffect(() => {
    let mounted = true;
    loadImageOverrides().then((overrides) => {
      if (mounted) setSrc(overrides[defaultSrc] || defaultSrc);
    });
    return () => { mounted = false; };
  }, [defaultSrc]);

  return <Image {...props} src={src} />;
}