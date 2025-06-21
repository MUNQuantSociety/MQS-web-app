// eventsData.ts

export type ArrowDirection = 'up' | 'down' | 'left' | 'right';

export type GridItemData = {
   id: string;
   row: number;
   col: number;
   type: 'primary' | 'details';
   event: {
      title: string;
      description?: string;
      image?: string;
   };
   arrow?: ArrowDirection;
};
// Define new events here.

// Total number of events needs to be a multiple of 3 for the grid to not have empty blocks at the end.

export const simplePastEvents = [
   {
      title: 'p1',
      description: 'Our very first event setting the stage for the society.',
      image: '/MQF photos/p1.jpg'
   },
   {
      title: 'p2',
      description: 'An introduction to the world of quantitative finance.',
      image: '/MQF photos/p2.jpg'
   },
   {
      title: 'p3',
      description: 'A hands-on workshop on building trading algorithms.',
      image: '/MQF photos/p3.jpg'
   },
   {
      title: 'p4',
      description: 'Insights from a professional quant trader.',
      image: '/MQF photos/p4.jpg'
   },
   {
      title: 'p5',
      description: 'Connect with peers and industry professionals.',
      image: '/MQF photos/p5.jpg'
   },
   {
      title: 'p6',
      description: 'Celebrating a successful year of events.',
      image: '/MQF photos/p6.jpg'
   },
   {
      title: 'p7',
      description: 'Our very first event setting the stage for the society.',
      image: '/MQF photos/p7.jpg'
   },
   {
      title: 'p8',
      description: 'An introduction to the world of quantitative finance.',
      image: '/MQF photos/p8.jpg'
   },
   {
      title: 'p9',
      description: 'A hands-on workshop on building trading algorithms.',
      image: '/MQF photos/p9.jpg'
   },
   {
      title: 'p10',
      description: 'Insights from a professional quant trader.',
      image: '/MQF photos/p10.jpg'
   },
   {
      title: 'p11',
      description: 'Connect with peers and industry professionals.',
      image: '/MQF photos/p11.jpg'
   },
   {
      title: 'p12',
      description: 'Celebrating a successful year of events.',
      image: '/MQF photos/p12.jpg'
   },

];

export function generateEventsLayout(
   events: typeof simplePastEvents,
   layoutType: '3-col' | '2-col'
): GridItemData[] {
   const finalLayout: GridItemData[] = [];
   const basePattern3Col = [
      { p_row: 1, p_col: 1, d_row: 1, d_col: 2, arrow: 'left' as ArrowDirection },
      { p_row: 1, p_col: 3, d_row: 2, d_col: 3, arrow: 'up' as ArrowDirection },
      { p_row: 2, p_col: 2, d_row: 2, d_col: 1, arrow: 'right' as ArrowDirection },
      { p_row: 3, p_col: 1, d_row: 4, d_col: 1, arrow: 'up' as ArrowDirection },
      { p_row: 3, p_col: 3, d_row: 3, d_col: 2, arrow: 'right' as ArrowDirection },
      { p_row: 4, p_col: 2, d_row: 4, d_col: 3, arrow: 'left' as ArrowDirection },
   ];
   const basePattern2Col = [
      { p_row: 1, p_col: 1, d_row: 1, d_col: 2, arrow: 'left' as ArrowDirection },
      { p_row: 2, p_col: 2, d_row: 2, d_col: 1, arrow: 'right' as ArrowDirection },
   ];
   const is3Col = layoutType === '3-col';
   const basePattern = is3Col ? basePattern3Col : basePattern2Col;
   const cycleLength = is3Col ? 6 : 2;
   const rowOffsetMultiplier = is3Col ? 4 : 2;
   events.forEach((eventData, i) => {
      const eventNumber = i + 1;
      const patternIndex = i % cycleLength;
      const template = basePattern[patternIndex];

      const block = Math.floor(i / cycleLength);
      const rowOffset = block * rowOffsetMultiplier;

      const primaryItem: GridItemData = {
         id: `p${eventNumber}`,
         row: template.p_row + rowOffset,
         col: template.p_col,
         type: 'primary',
         arrow: template.arrow,
         event: {
            title: eventData.title,
            image: eventData.image,
         }
      };
      const detailsItem: GridItemData = {
         id: `d${eventNumber}`,
         row: template.d_row + rowOffset,
         col: template.d_col,
         type: 'details',
         arrow: template.arrow,
         event: {
            title: eventData.title,
            description: eventData.description,
         }
      };
      finalLayout.push(primaryItem, detailsItem);
   });
   return finalLayout;
}