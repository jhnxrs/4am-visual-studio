"use client"

import { useScreenY, useScrollY } from "@/providers/scroll-provider";
import { useEffect } from "react";

type Props = {
    children: React.ReactNode;
}

export const AnimationController = (props: Props) => {
    const scrollY = useScrollY();
    const screenY = useScreenY();

    return props.children;
}