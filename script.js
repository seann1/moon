import p5 from 'p5';

const sketch = (p) => {
	let xLoc = 0;
	let yLoc = 0;
	let masterSpeed = 0.01;
    p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight);
        p.background(220);
		xLoc = p.sin(0) * p.width;
    };
	
	function drawTarget(x, y, size) {
		// p.ellipseMode(p.CENTER);
		// p.fill(255, 0, 0);
		// p.stroke(0);
		// for (let i = 0; i < 3; i++) {
		// 	p.ellipse(x, y, size - (i * (size / 3)), size - (i * (size / 3)));
		// }
		
		// const cx = p.width / 2;
		// const cy = p.height / 2;
		const steps = 120; // higher = smoother
		const ringPhaseStep = 0.8; // phase difference between rings
		const ringOffsetAmt = p.width * 0.03;
		
		for (let ring = 0; ring < 3; ring++) {
			const outerR = (200/3) * (3 - ring);
			const innerR = (150/3) * (3 - ring);
			
			// per-ring horizontal offset (staggered in time using frameCount)
			const phase = ring * ringPhaseStep;
			const ringDx = p.sin(p.frameCount * masterSpeed + phase) * ringOffsetAmt;
			const ringDy = p.cos(p.frameCount * 0.05 + phase) * (ringOffsetAmt/2);
			
			p.beginShape();
			p.fill(255, 0, 0);
			p.noStroke();
			// Outer circle (clockwise)
			for (let s = 0; s < steps; s++) {
				const a = p.map(s, 0, steps, 0, p.TWO_PI);
				p.vertex(
					x + ringDx + p.cos(a) * outerR,
					y + ringDy + p.sin(a) * outerR
				);
			}
			
			// Inner hole (counter-clockwise)
			p.beginContour();
			for (let s = steps; s > 0; s--) {
				const a = p.map(s, 0, steps, 0, p.TWO_PI);
				p.vertex(
					x + ringDx + p.cos(a) * innerR,
					y + ringDy + p.sin(a) * innerR
				);
			}
			p.endContour();
			
			p.endShape(p.CLOSE);
		}
		
	}
    p.draw = () => {
		p.background(220);
		// const speed = 0.05; // radians per frame, adjust for faster/slower
		const amplitude = p.width / 4; // adjust width of travel
		xLoc = p.width / 2 + p.sin(p.frameCount * masterSpeed) * amplitude;
		yLoc = p.height / 2 + p.cos(p.frameCount * 0.2) * 2;
		drawTarget(xLoc, yLoc, p.width/2);
    };

    p.windowResized = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
    };
};

new p5(sketch, document.getElementById('sketch-container'));
