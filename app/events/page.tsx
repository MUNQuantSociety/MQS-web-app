"use client";

import React, { useEffect, useMemo, useState } from "react";
import styles from "./events.module.css";
import Image from 'next/image';
import { generateEventsLayout, simplePastEvents, GridItemData, ArrowDirection } from "./eventsData";
import { useMediaQuery } from "../../hooks/useMediaQuery";

function GridItem({ item, hoveredId, setHoveredId }: { item: GridItemData; hoveredId: string | null; setHoveredId: (id: string | null) => void; }) {
  const { type, event, arrow, row, col } = item;
  const isPrimaryWithImage = type === 'primary' && event.image;

  const baseId = item.id.substring(1);
  const isHovered = hoveredId === baseId;

  const classNames = ['grid-item'];
  if (type === 'primary') {
    classNames.push('primary-item');
    if (arrow) {
      const notchDirectionMap: { [key in ArrowDirection]: string } = {
        left: 'right',
        right: 'left',
        up: 'bottom',
        down: 'top',
      };
      classNames.push(`notch-${notchDirectionMap[arrow]}`);
    }
  }
  if (isHovered) {
    classNames.push('is-hovered');
  }

  return (
    <div
      className={classNames.join(' ')}
      style={{ gridRow: row, gridColumn: col }}
      onMouseEnter={() => setHoveredId(baseId)}
      onMouseLeave={() => setHoveredId(null)}
    >
      {isPrimaryWithImage && (
        <Image
          src={event.image!}
          alt={event.title}
          layout="fill"
          objectFit="cover"
          className="grid-item-image"
        />
      )}

      {type === 'primary' ? (
        <div className="grid-item-content"></div>
      ) : (
        <div className="grid-item-content details-content">
          <h1>{event.title}</h1>
          {event.description && <p>{event.description}</p>}
        </div>
      )}
    </div>
  );
}

export default function EventsPage() {
  const isTwoColumn = useMediaQuery('(max-width: 768px)');
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const eventsLayout = useMemo(() => {
    const layoutType = isTwoColumn ? '2-col' : '3-col';
    return generateEventsLayout(simplePastEvents, layoutType);
  }, [isTwoColumn]);

  useEffect(() => {
    document.body.classList.add('events-page');
    return () => {
      document.body.classList.remove('events-page');
    };
  }, []);

  return (
    <div className={styles.eventsPage}>
      <div className="heroE">
        <div className={styles.heroText}>What we do.</div>
      </div>

      <main className="mainE events-page" style={{ fontSize: "clamp(4rem, 6vw, 6rem)" }}>
        <section className="eventsGrid">
          {eventsLayout.map(item => (
            <GridItem
              key={item.id}
              item={item}
              hoveredId={hoveredId}
              setHoveredId={setHoveredId}
            />
          ))}
        </section>

        <section className="upcomingSection">
          <h2>We do so much more and we’re just getting started! Join us today!</h2>
        </section>
      </main>
    </div>
  );
}
