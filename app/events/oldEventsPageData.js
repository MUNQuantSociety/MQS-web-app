//import { Code } from "lucide-react";

export const pastEvents = [//Do not add events with duplicate titles, it messes with the EventCard
    {
            title: "Spring Mixer",
      date: "May 30, 2025",
      description:
        "More laughs and memories as we started the term with a fun evening of networking, games and good food at Toslow Cafe.",
      image: "/MQF photos/springgg.jpg"
    },
    {
      title: "Social Mixer",
      date: "February 27, 2025",
      description:
        "For our first-ever mixer of the year, MQF hosted a cozy evening of community-building in collaboration with the Economics Society and The Fund. Members connected over coffee and insightful conversations and engaged with peers outside the classroom to set the tone for the term ahead.",
      image: "/MQF photos/first.jpg"
    },
    {
      title: "Casual Dinner",
      date: "April 4, 2025",
      description:
        "A low-key evening where we traded stock data for menus and portfolios for shared appetizers. No name tags, no pressure — just quant enthusiasts sharing laughs and stories. Turns out, we bond over more than data.",
      image: "/MQF photos/lemon.jpg"
    },
    {
      title: "Headshots Day",
      date: "April 7, 2025",
      description:
        "Our final gathering of the semester was the ideal send-off before exams and summer internships, where members had the opportunity to capture high-quality professional headshots. Smiles, snacks, and a few bonus group shots made it the perfect celebration for everything we accomplished over the semester.",
      image: "/MQF photos/group.jpg"
    },
  
  ];
  
  export const upcomingEvents = [
    {
      title: "MQS Spring Intro",
      date: "May 15, 2025",
      location: "IIC-2014 Bruneau Center",
      description: "Join us and find out what we do!",
    },

    {
      title: "MQS Formal Mixer",
      date: "May 30, 2025",
      location: "Toslow Cafe",
      description: "A networking opportunity for MQS members to connect over drinks and snacks (6PM)",
    },
    {
      title: "MQS x ANC Networking Event",
      date: "June (TBD)",
      location: "ANC,",
      description: "A networking opportunity for MQS members to connect with local industry professionals.",
    },
  ];

//page.tsx upcoming cards code
  //return (
  //  <>
  //    <div className="heroE">
  //      <div className="heroText">See what we&apos;re up to.
  //      </div>
  //    </div>
  //    <main className="mainE events-page" style={{ fontSize: "clamp(4rem, 6vw, 6rem)" }}>
  //      <section className="upcomingSection">
  //        <h1> UPCOMING EVENTS</h1>
  //        <h2>We&apos;re just getting started! Stay tuned for our regular events featuring guest speakers from leading financial institutions, industry panels, workshops on technical skills, and networking opportunities that will bring the world of quantitative finance straight to you.</h2>
  //        <div className="upcomingGrid">
  //          {upcomingEvents.map((event) => (
  //            <div key={event.title} className="upcomingItem">
  //              <div className="upcomingContent">
  //                <h3>{event.title}</h3>
  //                <h4 style={{ fontWeight: '600' }}>{event.date}<br /> {event.location}</h4>
  //                <h4>{event.description}</h4>
  //              </div>
  //            </div>
  //          ))}
  //        </div>
  //      </section>
  //    </main>
  //  </>
  //);