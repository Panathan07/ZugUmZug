import React from "react";
import PropTypes from "prop-types";
import { TeamMember } from "./TeamMember";
import { useUserContext } from "@hooks/useUserContext";
import {
  InvalidateQueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { LoadingPage } from "@pages/state-pages/LoadingPage";
import { User } from "@customtypes/user";
import { TeamPostUser } from "@customtypes/team";
import { useLocalStorage } from "../../hooks/useLocalStorage"

export type TeamCardProps = {
  color: string;
  name: string;
  id: number;
  members: User[];
};

TeamCard.propTypes = {
  color: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  members: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      ID: PropTypes.string.isRequired,
      inTeam: PropTypes.bool.isRequired,
    })
  ).isRequired,
};

export function TeamCard({ color, name, id, members }: TeamCardProps) {
    const [localcolor, setLocalcolor] = useLocalStorage<string | null>("team-color", null);
  const user = useUserContext();
  const queryClient = useQueryClient();
  const teamsMutation = useMutation<Response, Error, TeamPostUser>({
    mutationFn: addUserToTeam,
    onSuccess: (data) => {
       console.log(data);
      const message = "Team beigetreten.";
      alert(message);
    },
    onError: () => {
      alert("An Error occurred. Please try again");
    },
    onSettled: () => {
      void queryClient.invalidateQueries("teams" as InvalidateQueryFilters);
    },
  });

  if (user == null) {
    return <LoadingPage />;
  }

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
              <TeamMember
                key={members.indexOf(member)}
                name={member.name}
                ID={member.ID}
              />
            ))}
          </div>
        </section>
      </div>
          <button
              className="team-join"
              onClick={() => {
                  teamsMutation.mutate({
                      teamName: name,
                      teamID: id,
                      user: user,
                  } as TeamPostUser)
                  setLocalcolor(color)
              }
                  
        }
      >
        {teamsMutation.isPending
          ? "Loading"
          : teamsMutation.isSuccess
            ? "Erfolgreich"
            : "Team beitreten"}
      </button>
    </section>
  );
}

async function addUserToTeam(TeamPostUserParams: TeamPostUser) {
  return await fetch("http://localhost:3000/teams/members/add", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(TeamPostUserParams),
  });
}
