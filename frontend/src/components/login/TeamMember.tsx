import PropTypes, { InferProps } from "prop-types";

export function TeamMember({
  name,
  ID,
}: InferProps<typeof TeamMember.propTypes>) {
  return (
    <div className="member">
      <div className="member-name">{name}</div>
      <div className="member-ID">{ID}</div>
    </div>
  );
}

TeamMember.propTypes = {
  name: PropTypes.string,
  ID: PropTypes.string,
};
