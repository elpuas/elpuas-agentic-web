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

const stackRotation = [-3, 2, -1, 1];

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
						>
							<h3>{activeItem.title}</h3>
							{activeItem.caption ? <p>{activeItem.caption}</p> : null}
						</motion.figcaption>
					</AnimatePresence>

					<div className="story-gallery__stack" role="list" aria-label="Select another photo">
						{stackItems.map(({ item, itemIndex }, stackIndex) => {
							const offset = stackIndex * 44;
							const rotation = stackRotation[stackIndex % stackRotation.length] ?? 0;

							return (
								<motion.button
									key={item.id}
									type="button"
									className="story-gallery__stack-card"
									onClick={() => promoteToActive(itemIndex)}
									layout
									initial={{ opacity: 0, x: 24 }}
									animate={{
										x: offset,
										y: stackIndex * 10,
										rotate: rotation,
										opacity: 1,
										scale: 1 - stackIndex * 0.05,
									}}
									whileHover={{ y: stackIndex * 10 - 8, scale: 1.02, zIndex: 30 }}
									whileFocus={{ y: stackIndex * 10 - 8, scale: 1.02, zIndex: 30 }}
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
		</section>
	);
}
