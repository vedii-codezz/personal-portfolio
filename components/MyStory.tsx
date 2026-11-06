import { education } from "@/data/education";
import { LotusJourney } from "./LotusJourney";

export function MyStory() {
  return (
    <section className="story section-pad" id="story" aria-labelledby="story-title">
      <div className="section-eyebrow mono" data-reveal><span><i /> 01 / MY STORY</span><span>ALWAYS A WORK IN PROGRESS</span></div>
      <div className="story-journey">
      <LotusJourney />
      <div className="story-chapters">
      <div className="story-heading" data-reveal><h2 id="story-title">My Story<span className="gold">.</span></h2><p>The Journey<br /><em>So Far.</em></p></div>
      <ol className="education-timeline">
        {education.map((entry) => <li className="education-entry" key={entry.id}>
          <div className="education-date mono"><span className="timeline-dot" aria-hidden="true" /><p>{entry.dates}</p><span className="ongoing"><i /> {entry.status}</span></div>
          <div className="education-content"><span className="mono small-label">EDUCATION / CHAPTER 01</span><h3>{entry.university}</h3><p>{entry.degree}</p><span className="education-footnote mono">A FOUNDATION IN INTELLIGENCE.<br />A FUTURE OPEN TO POSSIBILITY.</span></div>
          <div className="education-score"><span className="mono">CGPA</span><strong>{entry.cgpa}</strong><span className="mono">CURRENT ACADEMIC STANDING</span></div>
        </li>)}
      </ol>
      </div>
      </div>
      <div className="story-bottom mono"><span>LEARNING THE SCIENCE. EXPLORING THE ART.</span><span aria-hidden="true">CONTINUED →</span></div>
    </section>
  );
}
