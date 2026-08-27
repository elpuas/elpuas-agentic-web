import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import './StoryGallery.css';

export type StoryGalleryItem = {
	id: string;
	src: string;
	alt: string;
	title: string;
	caption?: string;
};

type StoryGalleryProps = {
	items: StoryGalleryItem[];
	className?: string;
};

const springTransition = {
	type: 'spring',
	stiffness: 320,
	damping: 30,
	mass: 0.8,
} as const;

const thumbnailRotation = [-2.2, 1.4, -1.1, 2, 1.2, -1.8, 2.1, -0.9];
const thumbnailOffset = [0, 6, -3, 3, 4, -2, 5, 0];

export default function StoryGallery({ items, className = '' }: StoryGalleryProps) {
	const [order, setOrder] = useState<number[]>(() => items.map((_, index) => index));

	const hasEnoughItems = items.length >= 2;
	const activeIndex = order[0] ?? 0;
	const activeItem = items[activeIndex];

	const stackItems = useMemo(
		() => order.slice(1).map((itemIndex) => ({ itemIndex, item: items[itemIndex] })),
		[items, order],
	);

	const promoteToActive = (itemIndex: number) => {
		setOrder((currentOrder) => {
			if (currentOrder[0] === itemIndex) {
				return currentOrder;
			}

			return [itemIndex, ...currentOrder.filter((entry) => entry !== itemIndex)];
		});
	};

	if (!activeItem) {
		return null;
	}

	if (!hasEnoughItems) {
		return (
			<section className={`story-gallery ${className}`.trim()} aria-label="Story gallery">
				<figure className="story-gallery__single">
					<img src={activeItem.src} alt={activeItem.alt} loading="lazy" decoding="async" />
					<figcaption>
						<strong>{activeItem.title}</strong>
						{activeItem.caption ? <span>{activeItem.caption}</span> : null}
					</figcaption>
				</figure>
			</section>
		);
	}

	return (
		<section className={`story-gallery ${className}`.trim()} aria-label="Story gallery">
			<motion.div
				className="story-gallery__desktop"
				initial={{ opacity: 0, y: 18 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true, amount: 0.35 }}
				transition={{ duration: 0.45, ease: 'easeOut' }}
			>
				<div className="story-gallery__feature-wrap">
					<AnimatePresence mode="wait" initial={false}>
						<motion.figure
							key={activeItem.id}
							className="story-gallery__feature"
							initial={{ opacity: 0, scale: 0.96 }}
							animate={{ opacity: 1, scale: 1 }}
							exit={{ opacity: 0, scale: 0.98 }}
							transition={{ duration: 0.34, ease: 'easeOut' }}
							aria-label={`Selected photo: ${activeItem.title}`}
						>
							<img src={activeItem.src} alt={activeItem.alt} loading="lazy" decoding="async" />
						</motion.figure>
					</AnimatePresence>
				</div>

				<div className="story-gallery__meta-panel">
					<AnimatePresence mode="wait" initial={false}>
						<motion.figcaption
							key={`caption-${activeItem.id}`}
							className="story-gallery__caption"
							initial={{ opacity: 0, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -8 }}
							transition={{ duration: 0.25, ease: 'easeOut' }}
							aria-live="polite"
						>
							<h3>{activeItem.title}</h3>
							{activeItem.caption ? <p>{activeItem.caption}</p> : null}
						</motion.figcaption>
					</AnimatePresence>

					<div
						className="story-gallery__stack"
						role="group"
						aria-label={`Select another photo. Current photo: ${activeItem.title}`}
					>
						{stackItems.map(({ item, itemIndex }, thumbnailIndex) => {
							const rotation = thumbnailRotation[thumbnailIndex] ?? 0;
							const offset = thumbnailOffset[thumbnailIndex] ?? 0;

							return (
								<motion.button
									key={item.id}
									type="button"
									className="story-gallery__stack-card"
									onClick={() => promoteToActive(itemIndex)}
									layout="position"
									initial={{ opacity: 0, y: offset + 10, rotate: rotation }}
									animate={{ opacity: 1, y: offset, rotate: rotation }}
									whileHover={{ y: offset - 5, rotate: 0, scale: 1.03, zIndex: 20 }}
									whileFocus={{ y: offset - 5, rotate: 0, scale: 1.03, zIndex: 20 }}
									transition={springTransition}
									aria-label={`Show image: ${item.title}`}
								>
									<img src={item.src} alt={item.alt} loading="lazy" decoding="async" />
								</motion.button>
							);
						})}
					</div>
				</div>
			</motion.div>

			<div className="story-gallery__mobile" aria-label="Story gallery mobile">
				<AnimatePresence mode="wait" initial={false}>
					<motion.figure
						key={`mobile-${activeItem.id}`}
						className="story-gallery__feature"
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -8 }}
						transition={{ duration: 0.28, ease: 'easeOut' }}
					>
						<img src={activeItem.src} alt={activeItem.alt} loading="lazy" decoding="async" />
					</motion.figure>
				</AnimatePresence>

				<AnimatePresence mode="wait" initial={false}>
					<motion.figcaption
						key={`mobile-caption-${activeItem.id}`}
						className="story-gallery__caption"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.2 }}
					>
						<h3>{activeItem.title}</h3>
						{activeItem.caption ? <p>{activeItem.caption}</p> : null}
					</motion.figcaption>
				</AnimatePresence>

				<div className="story-gallery__mobile-stack" role="list" aria-label="Select another photo">
					<div className="story-gallery__mobile-track">
						{stackItems.map(({ item, itemIndex }) => (
							<motion.button
								key={`mobile-${item.id}`}
								type="button"
								className="story-gallery__mobile-thumb"
								onClick={() => promoteToActive(itemIndex)}
								whileHover={{ y: -3, scale: 1.01 }}
								whileTap={{ scale: 0.98 }}
								transition={springTransition}
								aria-label={`Show image: ${item.title}`}
							>
								<img src={item.src} alt={item.alt} loading="lazy" decoding="async" />
							</motion.button>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
