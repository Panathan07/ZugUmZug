import React from "react";
import PropTypes from "prop-types";
import { TeamMember } from "./TeamMember";
import { User, useUserContext } from "@hooks/useUserContext";
import {
  InvalidateQueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { LoadingPage } from "@pages/state-pages/LoadingPage";

declare global {
  type TeamCardProps = {
    color: string;
    name: string;
    id: number;
    members: User[];
  };
}
TeamCard.propTypes = {
  color: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  members: PropTypes.shape({
    name: PropTypes.string.isRequired,
    userID: PropTypes.string.isRequired,
  }),
};

async function addUsertoTeam({
  teamName,
  teamID,
  user,
}: {
  teamName: string;
  teamID: number;
  user: User;
}): Promise<Response> {
  const data = { teamID, teamName, user };
  return fetch("http://localhost:3000/teams/members/add", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function TeamCard({ color, name, id, members }: TeamCardProps) {
  const user = useUserContext();
  const queryClient = useQueryClient();
  const { mutateAsync: mutateTeams, isPending } = useMutation<
    Response,
    Error,
    { teamName: string; teamID: number; user: User }
  >({
    mutationFn: addUsertoTeam,
    onSuccess: (data) => {
      console.log(data);
      const message = "succes";
      alert(message);
    },
    onError: () => {
      alert("An Error occured. Please try again");
    },
    onSettled: () => {
      void queryClient.invalidateQueries("teams" as InvalidateQueryFilters);
    },
  });

  if (user == null || isPending) {
    return <LoadingPage />;
  }

  function joinTeam(name: string, id: number, user: User) {
    void mutateTeams({ teamName: name, teamID: id, user: user });
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
              <TeamMember name={member.username} userID={member.userID} />
            ))}
          </div>
        </section>
      </div>
      <button className="team-join" onClick={() => joinTeam(name, id, user)}>
        Team beitreten
      </button>
    </section>
  );
}
