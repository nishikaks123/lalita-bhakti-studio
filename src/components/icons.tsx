import type { SVGProps } from "react";
import Image from "next/image";

export function Logo(props: SVGProps<SVGSVGElement> & { className?: string }) {
  return (
    <Image
      src="https://i.imgur.com/U8hMAh2.png"
      alt="Khatu Shyam Ji"
      width={100}
      height={100}
      data-ai-hint="khatu shyam"
      className={props.className}
      style={{
        width: "auto",
        height: "auto",
      }}
    />
  );
}
