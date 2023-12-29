import React from "react";
import PropTypes, { InferProps } from "prop-types";

export function TeamCard({
  color,
  name,
  members,
}: InferProps<typeof TeamCard.propTypes>) {
  return (
    <section
      className="team-card"
      style={{ "--_color": color } as React.CSSProperties}
    >
      <div className="team-name">{name}</div>
      <button className="team-join">Team beitreten</button>
      <div className="current-members">
        Aktuelle Mitglieder({members.length}):
      </div>
    </section>
  );
}

TeamCard.propTypes = {
  color: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  members: PropTypes.arrayOf(PropTypes.string).isRequired,
};
