"use client";

import { gsap } from "gsap";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { GENDER } from "@/app/constant";
import { FireworksBackground } from "@/components/FireWorks";
import { cn } from "@/lib/utils";
import headerCard from "../public/1.png";
import frontCard from "../public/2.png";
import bodyCard from "../public/layer-bg.png";

export default function Home() {
	const [open, setOpen] = useState(false);
	const [imageOneLoaded, setImageOneLoaded] = useState(false);
	const [imageTwoLoaded, setImageTwoLoaded] = useState(false);

	const flapRef = useRef<HTMLImageElement>(null);

	const isLoadComplete = imageOneLoaded && imageTwoLoaded;

	const [moveCard, setMoveCard] = useState(false);

	useEffect(() => {
		if (flapRef.current && open) {
			gsap.fromTo(
				flapRef.current,
				{ rotateX: 0 },
				{
					rotateX: -150,
					duration: 0.8,
					ease: "power2.inOut",
					transformOrigin: "top center",
				},
			);

			const id = setTimeout(() => {
				setMoveCard(true);
			}, 800);

			return () => clearTimeout(id);
		}
	}, [open]);

	return (
		<div className="relative max-w-4xl h-dvh m-auto flex flex-col justify-center">
			<div
				className={cn(
					"fixed w-[320px] h-[210px] -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 shadow-xl",
					moveCard && "-translate-y-1/5 duration-800",
				)}
			>
				<h1 className="-top-15 absolute -translate-x-1/2 left-1/2 text-center text-[20px] font-bold">
					몰리의 성별은?
				</h1>

				<Image
					className="absolute top-0"
					src={bodyCard}
					alt="card"
					width={320}
					height={210}
					priority
				/>

				<div
					className={cn(
						"absolute w-3/4 h-6/7 rounded-2xl -translate-x-1/2 left-1/2 -translate-y-1/2 -bottom-18 z-20 transition flex flex-col items-center justify-center gap-[3px] shadow p-[3px] text-center",
						!isLoadComplete && "hidden",
						moveCard && "-translate-y-65 duration-800",
						GENDER === "W" ? "bg-[#FCD9D9]" : "bg-[#C3DEFC]",
					)}
				>
          <h1 className="text-[46px]">👦🏻</h1>
          <h3 className="text-[20px] font-semibold">아들이에요!</h3>
          <p className="text-balance break-words break-keep text-[18px]">
            멋진 왕자님을 <br /> 만나게 되실 거예요 💙
          </p>

					{moveCard && (
						<>
							<div className="absolute delay-100 -top-8 mb-4">⬇ 사진 보러가기</div>
							<Link
								href="/photo.jpeg"
								id="touch-item"
								className="absolute size-full hover:cursor-pointer z-[999]"
							/>
						</>
					)}
				</div>

				<Image
					className="absolute z-30 top-0"
					src={frontCard}
					alt="card"
					width={320}
					height={210}
					priority
					onLoad={() => setImageOneLoaded(true)}
				/>

				<Image
					onClick={() => !open && setOpen(!open)}
					className={cn(
						"absolute z-40 top-0",
						moveCard && "z-10",
						!open && "cursor-pointer",
					)}
					ref={flapRef}
					src={headerCard}
					alt="Card"
					width={320}
					height={122}
					onLoad={() => setImageTwoLoaded(true)}
					priority
				/>
			</div>

			{moveCard && (
				<FireworksBackground
					className="z-10 absolute inset-0 flex items-center justify-center rounded-xl pointer-events-none"
					population={1}
				/>
			)}
		</div>
	);
}
