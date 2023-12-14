class Team {
    constructor(color) {
        this.color = color;
        this.points = 0;
        this.name = color;
        this.member = [];
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
        this.tasks.splice(index,1)
    }

}
module.exports = Team;