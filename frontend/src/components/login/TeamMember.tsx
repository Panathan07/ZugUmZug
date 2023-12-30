import PropTypes, { InferProps } from "prop-types";

export function TeamMember({
  name,
  userID,
}: InferProps<typeof TeamMember.propTypes>) {
  return (
    <div className="member">
      <div className="member-name">{name}</div>
      <div className="member-ID">{userID}</div>
    </div>
  );
}

TeamMember.propTypes = {
  name: PropTypes.string,
  userID: PropTypes.string,
};
