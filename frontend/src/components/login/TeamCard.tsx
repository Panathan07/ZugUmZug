import React from "react";
import PropTypes, { InferProps } from "prop-types";
import { TeamMember } from "./TeamMember";

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

      <div className="current-members">
        Aktuelle Mitglieder({members.length}):
        <section className="members-list">
          <div className="members-list--content">
            {members.map((member) => (
              <TeamMember name={"member.name"} userID={"members.userID"} />
            ))}
          </div>
        </section>
      </div>
      <button className="team-join">Team beitreten</button>
    </section>
  );
}

TeamCard.propTypes = {
  color: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  members: PropTypes.arrayOf(PropTypes.string).isRequired,
};
