import tkinter as tk
import json

PRIMARYCOLOR = "red"
SECONDARYCOLOR = "green"


class ImageClicker:
    def __init__(self, root, image_path, output_file):
        self.root = root
        self.root.title("Image Clicker")

        self.image = tk.PhotoImage(file=image_path)

        self.canvas = tk.Canvas(
            root, width=self.image.width(), height=self.image.height())
        self.canvas.pack()

        self.canvas.create_image(0, 0, anchor=tk.NW, image=self.image)

        self.canvas.bind("<Button-1>", self.on_canvas_click)

        self.output_file = output_file

        try:
            with open(self.output_file, 'r') as json_file:
                self.data = json.load(json_file)
        except FileNotFoundError:
            self.data = {}

        self.draw_existing_points()

    def on_canvas_click(self, event):
        x, y = event.x, event.y

        label = 'City1 - City2'

        rotation = 0
        color = "rgb(0,0,255)"

        if label not in self.data:
            self.data[label] = []
        self.data[label].append({
            "rotation": rotation,
            "posx": round(x / self.image.width() * 100, 2),
            "posy": round(y / self.image.height() * 100, 2),
            "color": color
        })

        with open(self.output_file, 'w') as json_file:
            json.dump(self.data, json_file, indent=2)

        self.canvas.create_oval(x - 3, y - 3, x + 3,
                                y + 3, fill=PRIMARYCOLOR, outline=PRIMARYCOLOR)

    def draw_existing_points(self):
        for label, points in self.data.items():
            for point in points:
                x, y = point["posx"], point["posy"]
                scaled_x = int(x / 100 * self.image.width())
                scaled_y = int(y / 100 * self.image.height())

                self.canvas.create_oval(
                    scaled_x - 3, scaled_y - 3, scaled_x + 3, scaled_y + 3, fill=SECONDARYCOLOR, outline=SECONDARYCOLOR)


if __name__ == "__main__":
    image_path = "map-usa.png"
    output_file = 'output.json'
    root = tk.Tk()
    image_clicker = ImageClicker(root, image_path, output_file)

    root.mainloop()
