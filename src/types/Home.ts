import { ReactNode } from "react";

export interface PerksCardProps {
    svg: ReactNode;
    title: string;
    desc: string;
  }

export interface RoomCardProps {
  index: string;
  Room: string;
  Images: string;
}

export interface DiscoverImageProp {
  image: string;
}