class Team {
    constructor(color) {
        this.points = 0;
        this.name = color;
        this.color = color;
        this.members = [];
        this.tasks = [];
        this.roads = {
            "yellow": 0,
            "blue": 0,
            "red": 0,
            "black": 0,
            "orange": 0,
            "white": 0,
            "green": 0,
            "rgb": 0
        };
    };
    addpoints(amount_points) {
        this.points += amount_points;
    };
    addroads(road_color, amount_roads) {
        this.roads[road_color] += amount_roads;
    };
    addtask(task) {
        this.tasks.push(task)
    }
    removetask(task) {
        let index = this.tasks.indexOf(task);
        this.tasks.splice(index, 1)
    }
    addMember(memberID) {
        this.members.push(memberID);
    }
    removeMember(memberID) {
        if (!this.hasMember(memberID)) return;
        this.members.splice(this.members.indexOf(memberID), 1)
    }
    hasMember(memberID) {
        return this.members.includes(memberID)
    }

}
module.exports = Team;