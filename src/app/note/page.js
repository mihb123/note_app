'use client'
import { useRouter } from "next/navigation";

export default function Note() {
  const router = useRouter();
  router.push('/note/create')
}