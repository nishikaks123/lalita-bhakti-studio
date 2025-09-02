'use client';
import type { SVGProps } from "react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

const defaultLogo = "https://i.imgur.com/U8hMAh2.png";

export function Logo(props: SVGProps<SVGSVGElement> & { className?: string }) {
  const [logoUrl, setLogoUrl] = useState(defaultLogo);

  useEffect(() => {
    const fetchLogo = async () => {
      try {
        const docRef = doc(db, "settings", "logo");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists() && docSnap.data().url) {
          setLogoUrl(docSnap.data().url);
        } else {
          setLogoUrl(defaultLogo);
        }
      } catch (error) {
        console.error("Error fetching logo, using default.", error);
        setLogoUrl(defaultLogo);
      }
    };

    fetchLogo();
  }, []);

  return (
    <Image
      src={logoUrl}
      alt="Khatu Shyam Ji"
      width={100}
      height={100}
      data-ai-hint="khatu shyam"
      className={props.className}
      style={{
        width: "auto",
        height: "auto",
      }}
      unoptimized // Required for Firebase Storage URLs
    />
  );
}
