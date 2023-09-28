(function () {
	"use strict";

	const INTERVAL_TIME = 0.05 * 1000;
	const STEP = 5;
	const CANVAS_WIDTH = 500;
	const CANVAS_HEIGHT = 500;
	const RECTANGLE_SIZE = 50;

	let x = 0;
	let y = 0;
	let dx = STEP;
	let dy = STEP;
	let prevCorner = "top-left";
	let color = "blue";

	x = Math.random() * (CANVAS_WIDTH - 2 * RECTANGLE_SIZE) + RECTANGLE_SIZE;
	y = Math.random() * (CANVAS_HEIGHT - 2 * RECTANGLE_SIZE) + RECTANGLE_SIZE;

	const moveDiagonally = () => {
		// Adjust coordinates
		x += dx;
		y += dy;

		// Check boundaries and bounce
		if (x > CANVAS_WIDTH - RECTANGLE_SIZE || x < 0) {
			dx = -dx;
			color = getRandomColor();
		}
		if (y > CANVAS_HEIGHT - RECTANGLE_SIZE || y < 0) {
			dy = -dy;
			checkCorner();
			color = getRandomColor();
		}

		drawRectangle(x, y, color);
		setTimeout(moveDiagonally, INTERVAL_TIME);
	};

	const checkCorner = () => {
		const corners = {
			"top-left": { x: 0, y: 0 },
			"top-right": { x: CANVAS_WIDTH - RECTANGLE_SIZE, y: 0 },
			"bottom-left": {
				x: 0,
				y: CANVAS_HEIGHT - RECTANGLE_SIZE,
			},
			"bottom-right": {
				x: CANVAS_WIDTH - RECTANGLE_SIZE,
				y: CANVAS_HEIGHT - RECTANGLE_SIZE,
			},
		};

		for (const [corner, pos] of Object.entries(corners)) {
			if (
				Math.abs(x - pos.x) <= STEP &&
				Math.abs(y - pos.y) <= STEP &&
				prevCorner !== corner
			) {
				prevCorner = corner;
			}
		}
	};

	const drawRectangle = (x, y, color) => {
		var rectangle = new Rectangle(
			new Point(x, y),
			new Size(RECTANGLE_SIZE, RECTANGLE_SIZE)
		);
		var shape = new Shape.Rectangle(rectangle);
		shape.strokeColor = color;
		shape.fillColor = color;
		paper.view.draw();
		paper.project.activeLayer.removeChildren();
	};

	paper.install(window);
	paper.setup(document.getElementById("mainCanvas"));

	moveDiagonally();

	function getRandomColor() {
		return "#" + Math.floor(Math.random() * 16777215).toString(16);
	}
})();
