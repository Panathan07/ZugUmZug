import React from "react";
import PropTypes from "prop-types";
import { TeamMember } from "./TeamMember";

declare global {
  type TeamCardProps = {
    color: string;
    name: string;
    members: User[];
  };
}
TeamCard.propTypes = {
  color: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  members: PropTypes.shape({
    name: PropTypes.string.isRequired,
    userID: PropTypes.string.isRequired,
  }),
};

export function TeamCard({ color, name, members }: TeamCardProps) {
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
              <TeamMember name={member.name} userID={member.userID} />
            ))}
          </div>
        </section>
      </div>
      <button className="team-join">Team beitreten</button>
    </section>
  );
}
